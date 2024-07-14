from django.shortcuts import get_object_or_404
from rest_framework import permissions

from profiles.models import Profile
from quizzes.models import Quiz


class IsStudentRelatedToSubjectForQuiz(permissions.BasePermission):
    """
    Custom permission to only allow students related to the subject to submit the quiz.
    No one can read, update, or delete the quiz.
    """

    def has_permission(self, request, view):
        # Only students related to the subject can submit a quiz
        if request.method == 'POST':
            quiz_slug = view.kwargs.get('quiz_slug')
            quiz = get_object_or_404(Quiz, slug=quiz_slug)
            return request.user.profile.role == Profile.STUDENT and quiz.subject in request.user.profile.subjects.all()
        return False

    def has_object_permission(self, request, view, obj):
        # No permissions are allowed for read, update, or delete
        return False
