from .models import User, Profile
from .serializers import UserSerializer, UserProfileImage

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_list_or_404, get_object_or_404

from blogs.serializers import ArticleSerializer, CommentSerializer
from blogs.models import Article, Comment

from roadmaps.models import Review, Node
from roadmaps.serializer import ReviewSerializer, Nodeserializer


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


@api_view(['GET'])
def get_user_profile(request, user_id):
    user = get_object_or_404(Profile, user=user_id)
    serializer = UserProfileImage(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_blogs(request, user_id):
    profile_user = get_object_or_404(User, id=user_id)
    post_articles = ArticleSerializer(instance=Article.objects.filter(
        user=profile_user), many=True, context={'user': request.user})
    like_articles = ArticleSerializer(instance=profile_user.like_articles, many=True, context={'user': request.user})
    comments = CommentSerializer(instance=Comment.objects.filter(
        user=profile_user), many=True, context={'user': request.user})
    data = {
        'post_articles': post_articles.data,
        'like_articles': like_articles.data,
        'comments': comments.data
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_roadmaps(request, user_id):
    profile_user = get_object_or_404(User, id=user_id)
    reviews = ReviewSerializer(instance=Review.objects.filter(
        user=profile_user), many=True)
    clear_nodes = Nodeserializer(profile_user.clear_nodes.all(
    ), many=True, context={'user': request.user})
    data = {
        'reviews': reviews.data,
        'clear_nodes': clear_nodes.data
    }
    return Response(data, status=status.HTTP_200_OK)
