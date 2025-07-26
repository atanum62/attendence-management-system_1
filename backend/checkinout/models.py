from django.utils import timezone
from django.db import models
import random


def generate_unique_id():
    """Generates a unique 6-digit number for an employee."""
    while True:
        unique_id = str(random.randint(100000, 999999))
        if not Employee.objects.filter(unique_id=unique_id).exists():
            return unique_id


class Employee(models.Model):
    name = models.CharField(max_length=100)
    unique_id = models.CharField(max_length=6, unique=True, default=generate_unique_id)

    def __str__(self):
        return f"{self.name} ({self.unique_id})"


class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    time_in = models.TimeField(null=True, blank=True)
    time_out = models.TimeField(null=True, blank=True)
    date = models.DateField(default=timezone.now)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["employee", "date"],
                name="unique_attendance_per_employee_per_day",
            )
        ]

    def __str__(self):
        return f"{self.employee.name} - {self.date} - In: {self.time_in}, Out: {self.time_out}"


class LeaveApplication(models.Model):
    LEAVE_TYPE_CHOICES = (
        ("casual", "Casual Leave"),
        ("sick", "Sick Leave"),
        ("earned", "Earned Leave"),
        ("maternity", "Maternity Leave"),
        ("paternity", "Paternity Leave"),
    )
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    employee = models.ForeignKey("Employee", on_delete=models.CASCADE)  # FK to Employee
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()
    application_text = models.TextField()  # Leave reason
    applied_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.employee.name} - {self.leave_type} from {self.start_date} to {self.end_date}"
