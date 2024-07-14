from rest_framework import serializers

from quizzes.models import Subject
from quizzes.serializers.custom_profile_serializer import CustomProfileSerializer


class SubjectSerializer(serializers.ModelSerializer):
    teacher = CustomProfileSerializer(required=False)
    students = CustomProfileSerializer(many=True, required=False)
    quizzes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Subject
        fields = '__all__'
