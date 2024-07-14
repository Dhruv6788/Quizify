from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from profiles.models import Profile
from quizzes.models import QuizSubmission, Quiz


class QuizSubmissionSerializer(serializers.ModelSerializer):
    answers = serializers.JSONField()

    class Meta:
        model = QuizSubmission
        fields = ['quiz', 'profile', 'submission_time', 'answers']
        read_only_fields = ['quiz', 'profile', 'submission_time']

    def create(self, validated_data):
        request = self.context.get('request')
        quiz_slug = self.context.get('view').kwargs.get('quiz_slug')
        quiz = get_object_or_404(Quiz, slug=quiz_slug)

        # Check if the quiz is active
        if not quiz.is_active:
            raise serializers.ValidationError("This quiz is no longer active and does not accept answers.")

        # Retrieve the profile associated with the authenticated user
        profile = request.user.profile

        # Check if the user is a student and if they have an enrollment_no
        if profile.role == Profile.STUDENT and not profile.enrollment_no:
            raise serializers.ValidationError("You must have an enrollment number to submit the quiz.")

        # Create the QuizSubmission instance without committing to the database
        instance = QuizSubmission.objects.create(profile=profile, quiz=quiz, answers=validated_data.get('answers'))

        try:
            instance.calculate_score()
        except ValidationError as e:
            raise serializers.ValidationError({"error": str(e)})

        return instance
