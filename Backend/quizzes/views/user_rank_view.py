from rest_framework import viewsets

from quizzes.models import UserRank
from quizzes.serializers.user_rank_serializer import UserRankSerializer


class UserRankViewSet(viewsets.ModelViewSet):
    queryset = UserRank.objects.all()
    serializer_class = UserRankSerializer
