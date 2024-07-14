from rest_framework import serializers

from quizzes.models import Question
from quizzes.serializers.choice_serializer import ChoiceSerializer


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['text', 'point', 'choices', 'multiple_answer']
