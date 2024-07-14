from django.contrib import admin
from authapi.models import User
from django.contrib.auth.admin import UserAdmin


# Register your models here.
class UserModelAdmin(UserAdmin):
    list_display = ('id', 'email', 'name', 'is_active', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_admin', 'is_active')
        }),
    )
    search_fields = ["email"]
    ordering = ["email", "id"]
    filter_horizontal = []


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)
