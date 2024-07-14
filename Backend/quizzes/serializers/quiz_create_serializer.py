from datetime import timedelta

from rest_framework import serializers

from quizzes.models import Subject, Quiz
from quizzes.serializers.question_serializer import QuestionSerializer


class DurationField(serializers.Field):
    def to_representation(self, value):
        return int(value.total_seconds() // 60)

    def to_internal_value(self, data):
        if not data.isdigit():
            raise serializers.ValidationError("Duration must be a positive integer.")
        minutes = int(data)
        if 0 >= minutes >= 1440:
            raise serializers.ValidationError("Enter Valid duration")
        return timedelta(minutes=minutes)


class QuizSerializer(serializers.ModelSerializer):
    subject = serializers.SlugRelatedField(slug_field='subject_code', queryset=Subject.objects.all())
    questions = QuestionSerializer(many=True, read_only=True)
    duration = DurationField()
    status = serializers.CharField(read_only=True)
    total_marks = serializers.IntegerField(read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'slug', 'description', 'subject', 'quiz_file', 'starting_time', 'duration', 'created_at',
                  'updated_at', 'questions', 'status', 'total_marks']

    def create(self, validated_data):
        # Get the authenticated user from the request
        user = self.context['request'].user
        # Add the authenticated user as the creator of the quiz
        validated_data['created_by'] = user.profile
        # Create the quiz with the updated data
        return Quiz.objects.create(**validated_data)
