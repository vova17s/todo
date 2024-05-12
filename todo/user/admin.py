from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


class CustomUserAdmin(UserAdmin):

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'username', 'avatar')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
        'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'create_time', 'update_time')}),
    )
    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('email', 'password', 'password2')}
    #     ),
    # )
    readonly_fields = ['create_time', 'update_time']
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)
