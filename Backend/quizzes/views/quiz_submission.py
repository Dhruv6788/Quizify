from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from quizzes.models import QuizSubmission, Quiz
from quizzes.permissions.is_student_related_to_subject_for_quiz import IsStudentRelatedToSubjectForQuiz
from quizzes.serializers.quiz_submission_serializer import QuizSubmissionSerializer


class QuizSubmissionViewSet(viewsets.ModelViewSet):
    queryset = QuizSubmission.objects.all()
    serializer_class = QuizSubmissionSerializer
    permission_classes = [IsAuthenticated, IsStudentRelatedToSubjectForQuiz]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
