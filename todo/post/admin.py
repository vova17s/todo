from django.contrib import admin

from .models import Post


class PostAdmin(admin.ModelAdmin):
    fields = (
        "id", 'title', 'description', 'preview', 'user_id'
    )
    list_display = (
        "id",
    )
    search_fields = (
        "id",
    )
    readonly_fields = (
        "id", 'create_time', 'update_time'
    )

admin.site.register(Post, PostAdmin)
