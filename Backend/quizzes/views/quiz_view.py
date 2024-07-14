from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from profiles.models import Profile
from quizzes.models import Quiz
from quizzes.permissions.is_teacher_and_owner_or_readonly_for_quiz import IsTeacherAndOwnerOrReadOnlyForQuiz
from quizzes.serializers.quiz_create_serializer import QuizSerializer
from quizzes.serializers.quiz_retrieval_serializer import StudentQuizSerializer


class QuizViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsTeacherAndOwnerOrReadOnlyForQuiz]
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        subject_code = self.kwargs.get('subject_code', None)

        if user.profile.role == Profile.TEACHER:
            if subject_code:
                # Return quizzes of the specified subject created by the teacher
                return Quiz.objects.filter(created_by=user.profile, subject__subject_code=subject_code)
            else:
                # Return all quizzes created by the teacher
                return Quiz.objects.filter(created_by=user.profile)

        elif user.profile.role == Profile.STUDENT:
            if subject_code:
                # Return quizzes of the specified subject related to the student
                return Quiz.objects.filter(subject__in=user.profile.subjects.all(), subject__subject_code=subject_code)
            else:
                # Return all quizzes related to the student
                return Quiz.objects.filter(subject__in=user.profile.subjects.all())

    def get_serializer_class(self):
        if self.request.user.profile.role == Profile.TEACHER:
            return QuizSerializer
        else:
            return StudentQuizSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
