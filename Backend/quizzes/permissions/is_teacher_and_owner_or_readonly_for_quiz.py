from rest_framework import permissions

from profiles.models import Profile
from quizzes.models import Subject


class IsTeacherAndOwnerOrReadOnlyForQuiz(permissions.BasePermission):
    """
    Custom permission to only allow teachers who created the quiz to edit it.
    Students related to the subject and the teacher related to subject who created the quiz can view it.
    """

    def has_permission(self, request, view):
        # Only teachers related to the subject can create a quiz
        if request.method == 'POST':
            subject_code = request.data.get('subject')
            subject = Subject.objects.filter(subject_code=subject_code).first()
            if subject is None:
                return False
            return request.user.profile.role == Profile.TEACHER and request.user.profile == subject.teacher
        return True

    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the teacher who created the quiz and the quiz is not active.
        if request.method in ['PUT', 'PATCH', 'DELETE']:
            return obj.created_by == request.user.profile and request.user.profile.role == Profile.TEACHER and request.user.profile.created_subject.filter(
                id=obj.subject.id).exists() and not obj.is_active

        # Read permissions are allowed to the teacher who created the quiz and students related to the subject.
        return (
                obj.created_by == request.user.profile and request.user.profile.role == Profile.TEACHER and request.user.profile.created_subject.filter(
            id=obj.subject.id).exists()) or (
                request.user.profile.role == Profile.STUDENT and request.user.profile.subjects.filter(
            id=obj.subject.id).exists())
