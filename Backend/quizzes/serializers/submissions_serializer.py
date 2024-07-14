from rest_framework import serializers

from quizzes.models import QuizSubmission


class SubmissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = "__all__"
