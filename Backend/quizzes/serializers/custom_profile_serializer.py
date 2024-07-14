from rest_framework import serializers

from profiles.models import Profile


class CustomProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['email']

    def get_email(self, obj):
        return obj.user.email
