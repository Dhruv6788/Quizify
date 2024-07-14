from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Profile
from .permissions import IsOwner
from .serializers import ProfileSerializer


# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

    @action(detail=False, methods=['get', 'patch'], url_path='me')
    def current_user_profile(self, request):
        profile_instance = request.user.profile
        if request.method == 'PATCH':
            profile_serializer = self.get_serializer(profile_instance, data=request.data, partial=True)
            if profile_serializer.is_valid():
                profile_serializer.save()
                name = request.data.get('name')
                if name:
                    request.user.name = name
                    request.user.save()
                return Response(profile_serializer.data)
            else:
                return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'GET':
            profile_serializer = self.get_serializer(profile_instance)
            return Response(profile_serializer.data)

    def retrieve(self, request, *args, **kwargs):
        raise NotFound("Not found.")

    def update(self, request, *args, **kwargs):
        raise NotFound("Not found.")

    def partial_update(self, request, *args, **kwargs):
        raise NotFound("Not found.")

    def destroy(self, request, *args, **kwargs):
        raise NotFound("Not found.")
