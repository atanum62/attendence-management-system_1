from django.contrib import admin
from .models import Employee, Attendance, LeaveApplication


admin.site.site_header = "Attendance Management Admin"
admin.site.site_title = "Attendance Admin Portal"
admin.site.index_title = "Welcome to Attendance Dashboard"


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("name", "unique_id")
    search_fields = ("name", "unique_id")


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("employee", "time_in", "time_out", "date")

    search_fields = ("employee__name",)


@admin.register(LeaveApplication)
class LeaveApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "employee",
        "leave_type",
        "start_date",
        "end_date",
        "applied_on",
        "status",
    )
    list_filter = ("leave_type", "start_date", "end_date")
    search_fields = ("employee__name",)
