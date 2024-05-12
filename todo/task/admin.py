from django.contrib import admin

from .models import Status, Task


class TaskAdmin(admin.ModelAdmin):
    fields = (
        "id", 'title', 'description',
        'plane_finished_time', 'real_finished_time', 'status_id', 
        'task_id', 'user_id'
    )
    list_display = (
        "id",
    )
    search_fields = (
        "id",
    )
    readonly_fields = (
        "id", 'create_time', 'update_time',
    )

admin.site.register(Task, TaskAdmin)


class StatusAdmin(admin.ModelAdmin):
    fields = (
        "id", 'title', 'icon', 'background', 'color', 'finished'
    )
    list_display = (
        "id",
    )
    search_fields = (
        "id",
    )
    readonly_fields = (
        "id",
    )

admin.site.register(Status, StatusAdmin)
