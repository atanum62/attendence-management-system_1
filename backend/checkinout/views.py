from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Employee, Attendance, LeaveApplication
from .serializers import (
    EmployeeSerializer,
    AttendanceSerializer,
    LeaveApplicationSerializer,
)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()  # <-- Required for automatic basename
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        queryset = Employee.objects.all()
        employee_id = self.request.query_params.get("employee_id")
        if employee_id:
            queryset = queryset.filter(id=employee_id)
        return queryset


from rest_framework.response import Response
from rest_framework import status
from .models import Attendance
from .serializers import AttendanceSerializer
from datetime import date, datetime


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def create(self, request, *args, **kwargs):
        employee_id = request.data.get("employee_id")
        action = request.data.get("action")

        try:
            attendance = Attendance.objects.get(
                employee_id=employee_id, date=date.today()
            )
        except Attendance.DoesNotExist:
            attendance = None

        if action == "time_in":
            if attendance:
                return Response({"error": "Already checked in today."}, status=400)
            attendance = Attendance.objects.create(
                employee_id=employee_id,
                date=date.today(),
                time_in=datetime.now().time(),
            )
        elif action == "time_out":
            if not attendance:
                return Response({"error": "No check-in found for today."}, status=400)
            if attendance.time_out:
                return Response({"error": "Already checked out."}, status=400)
            attendance.time_out = datetime.now().time()
            attendance.save()
        else:
            return Response({"error": "Invalid action."}, status=400)

        serializer = self.get_serializer(attendance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LeaveApplicationViewSet(viewsets.ModelViewSet):
    queryset = LeaveApplication.objects.all()
    serializer_class = LeaveApplicationSerializer
