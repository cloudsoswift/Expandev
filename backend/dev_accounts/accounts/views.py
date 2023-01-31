from .models import User, Profile
from .serializers import UserSerializer, UserProfileImage

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_list_or_404, get_object_or_404


@api_view(['GET'])
def userlist(request):
    user_list = get_list_or_404(User)
    serializer = UserSerializer(user_list, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def userchange(request):
    serializer = UserSerializer(instance=User, data=request)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['GET'])
def get_user_profile(request, user_id):
    user = get_object_or_404(Profile, user=user_id)
    serializer = UserProfileImage(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def set_profile_image(request):
    user = request.user
    data = request.data

    profile = Profile.objects.get_or_create(user=user)[0]
    serializer = UserProfileImage(profile, data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)