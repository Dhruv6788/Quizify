from rest_framework import permissions

from profiles.models import Profile


class IsSubjectTeacherOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow teachers of the subject to edit it, and students to read it.
    """

    def has_permission(self, request, view):
        # Allow all authenticated users to view (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # But only allow teachers to modify (POST, PUT, PATCH, DELETE)
        return request.user.profile.role == Profile.TEACHER

    def has_object_permission(self, request, view, obj):
        # Allow all authenticated users to view (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # But only allow teachers who created the subject to modify (POST, PUT, PATCH, DELETE)
        return obj.teacher == request.user.profile
