from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', required=False, read_only=True)
    email = serializers.EmailField(source='user.email', required=False, read_only=True)
    created_quizzes = serializers.StringRelatedField(many=True)
    quiz_history = serializers.StringRelatedField(many=True)
    role = serializers.CharField(source='get_role_display')

    class Meta:
        model = Profile
        fields = ['name', 'email', 'role', 'bio', 'profile_img', 'gender', 'created_quizzes', 'enrollment_no', 'quiz_history']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')

        if instance.role == Profile.STUDENT:
            representation.pop('created_quizzes', None)  # None as default value
        elif instance.role == Profile.TEACHER:
            representation.pop('quiz_history', None)  # None as default value
            representation.pop('enrollment_no', None)  # None as default value
        return representation
