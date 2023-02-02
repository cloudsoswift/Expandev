from .models import User, Profile
from .serializers import UserSerializer, UserProfileImage
from blogs.models import Article, Comment
from blogs.serializers import ArticleSerializer, CommentSerializer
from roadmaps.models import Review, Node
from roadmaps.serializer import ReviewSerializer, Nodeserializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
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
def check_duplicate_email(request, email):
    try:
        validate_email(email)
    except ValidationError:
        return Response({"message" : "VALIDATION_ERROR"}, status=status.HTTP_400_BAD_REQUEST)
    if get_user_model().objects.filter(email=email).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def check_duplicate_nickname(request, nickname):
    if nickname.count > 15:
        return Response({'message': 'Invalid nickname'}, status=status.HTTP_400_BAD_REQUEST) 

    if get_user_model().objects.filter(nickname=nickname).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_profile(request, user_id):
    user = get_object_or_404(Profile, user=user_id)
    serializer = UserProfileImage(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_blogs(request, user_id):
    profile_user = get_object_or_404(User, id=user_id)
    articles = ArticleSerializer(instance = Article.objects.filter(user=profile_user), many=True, context={'user': request.user}) #작성한 게시글
    comments = CommentSerializer(instance = Comment.objects.filter(user=profile_user), many=True, context={'user': request.user}) #작성한 댓글
    data = {
        'articles': articles.data,
        'comments': comments.data
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_roadmaps(request, user_id):
    profile_user = get_object_or_404(User, id=user_id)
    reviews = ReviewSerializer(instance = Review.objects.filter(user=profile_user), many=True) #작성한 리뷰
    clear_nodes = Nodeserializer(profile_user.clear_nodes.all(), many=True, context={'user': request.user}) #클리어한 노드
    data = {
        'reviews':reviews.data,
        'clear_nodes':clear_nodes.data
    }
    return Response(data, status=status.HTTP_200_OK)