from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from quizzes.models import QuizSubmission, Quiz
from quizzes.permissions.is_teacher_and_created_the_subject_for_submissions import \
    IsTeacherAndCreatedTheSubjectForSubmissions
from quizzes.serializers.submissions_serializer import SubmissionsSerializer


class SubmissionsViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionsSerializer
    permission_classes = [IsAuthenticated, IsTeacherAndCreatedTheSubjectForSubmissions]
    lookup_field = 'submission_slug'

    def get_queryset(self):
        # Get the quiz slug from the URL parameters
        quiz_slug = self.kwargs['quiz_slug']

        # Get the quiz object
        quiz = get_object_or_404(Quiz, slug=quiz_slug)

        # Filter the queryset by the quiz
        queryset = QuizSubmission.objects.filter(quiz=quiz)

        return queryset

    def get_object(self):
        queryset = self.get_queryset()
        slug = self.kwargs['single_submission']
        obj = get_object_or_404(queryset, submission_slug=slug)
        return obj
