from rest_framework import serializers
from .models import Employee, Attendance, LeaveApplication
from django.utils import timezone
from datetime import date


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "name", "unique_id"]


class AttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(), source="employee", write_only=True
    )

    class Meta:
        model = Attendance
        fields = "__all__"
        read_only_fields = ["time_in", "time_out", "date"]

    def create(self, validated_data):
        employee = validated_data["employee"]
        today = timezone.now().date()
        now_time = timezone.now().time()

        # Get or create today's attendance for the employee
        attendance, created = Attendance.objects.get_or_create(
            employee=employee, date=today
        )

        if not attendance.time_in:
            attendance.time_in = now_time
        elif not attendance.time_out:
            attendance.time_out = now_time
        else:
            raise serializers.ValidationError(
                f"Already checked in and out for {employee.name} on {today}."
            )

        attendance.save()
        return attendance


class LeaveApplicationSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.SlugRelatedField(
        queryset=Employee.objects.all(),
        slug_field="unique_id",
        source="employee",
        write_only=True,
    )

    class Meta:
        model = LeaveApplication
        fields = [
            "id",
            "employee",
            "employee_id",
            "leave_type",
            "start_date",
            "end_date",
            "application_text",
            "applied_on",
            "status",  # Optional: Show status in response
        ]
        read_only_fields = ["status"]

    def validate_start_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Start date cannot be in the past.")
        return value

    def validate_end_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("End date cannot be in the past.")
        return value

    def validate(self, data):
        start = data.get("start_date")
        end = data.get("end_date")
        employee = data.get("employee")

        # Date range validation
        if start and end:
            if end < start:
                raise serializers.ValidationError(
                    "End date cannot be earlier than start date."
                )

            duration = (end - start).days + 1
            if duration > 15:
                raise serializers.ValidationError("Leave cannot exceed 15 days.")

        # Check for pending leave
        if LeaveApplication.objects.filter(
            employee=employee, status="pending"
        ).exists():
            raise serializers.ValidationError(
                "You already have a pending leave request."
            )

        return data
