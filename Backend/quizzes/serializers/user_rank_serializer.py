from rest_framework import serializers

from quizzes.models import UserRank


class UserRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRank
        fields = '__all__'
