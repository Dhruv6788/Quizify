from django.shortcuts import get_object_or_404
from rest_framework import permissions

from profiles.models import Profile
from quizzes.models import Quiz


class IsTeacherAndCreatedTheSubjectForSubmissions(permissions.BasePermission):
    """
    Custom permission to only allow teachers who created the subject to have all the permissions
    and students to retrieve their own submissions.
    """

    def has_permission(self, request, view):
        if view.action == 'list':
            quiz_slug = view.kwargs.get('quiz_slug')
            quiz = get_object_or_404(Quiz, slug=quiz_slug)
            return request.user.profile.role == Profile.TEACHER and quiz.subject in request.user.profile.created_subject.all()
        return True

    def has_object_permission(self, request, view, obj):
        # Allow teachers who created the subject to retrieve any submission
        if request.user.profile.role == Profile.TEACHER and obj.quiz.subject in request.user.profile.created_subject.all():
            return True
        # Allow students to retrieve their own submissions
        elif request.user.profile.role == Profile.STUDENT and obj.profile == request.user.profile:
            return True
        return False