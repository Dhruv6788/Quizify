from rest_framework import serializers

from quizzes.models import Choice, Question, Quiz, Subject


class StudentChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']


class StudentQuestionSerializer(serializers.ModelSerializer):
    choices = StudentChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'point', 'choices', 'multiple_answer']


class StudentQuizSerializer(serializers.ModelSerializer):
    subject = serializers.SlugRelatedField(slug_field='subject_code', queryset=Subject.objects.all())
    questions = StudentQuestionSerializer(many=True)
    status = serializers.CharField(read_only=True)
    total_marks = serializers.IntegerField(read_only=True)

    class Meta:
        model = Quiz
        exclude = ['quiz_file', 'created_at', 'updated_at', 'created_by']
