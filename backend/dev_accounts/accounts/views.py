from django.views import View
from .models import User, Profile
from .serializers import UserSerializer, UserProfileSerializer
from blogs.models import Article, Comment
from blogs.serializers import ArticleSimpleSerializer, CommentSimpleSerializer
from roadmaps.models import Review, Node
from roadmaps.serializer import ReviewSimpleSerializer, NodeSimpleserializer, TrackSimpleSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.shortcuts import get_list_or_404, get_object_or_404

import re


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
    serializer = UserProfileSerializer(profile, data=data)
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
        return Response({"message": "VALIDATION_ERROR"}, status=status.HTTP_400_BAD_REQUEST)
    if get_user_model().objects.filter(email=email).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def check_duplicate_nickname(request, nickname):

    regx_nickname = re.compile('[a-zA-Z가-힣]{3,15}')
    if not regx_nickname.match(nickname):
        return Response({'message': '닉네임은 최소 3글자 최대 15글자, 특수문자, 공백 제외'}, status=status.HTTP_400_BAD_REQUEST)

    if get_user_model().objects.filter(nickname=nickname).exists():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_profile(request, nickname):
    user = get_object_or_404(User, nickname=nickname)
    profile_user = get_object_or_404(Profile, user=user)
    serializer = UserProfileSerializer(profile_user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_blogs(request, nickname):
    profile_user = get_object_or_404(User, nickname=nickname)
    post_articles = ArticleSimpleSerializer(instance=Article.objects.filter(
        user=profile_user), many=True, context={'user': request.user})
    like_articles = ArticleSimpleSerializer(
        instance=profile_user.like_articles, many=True, context={'user': request.user})
    comments = CommentSimpleSerializer(instance=Comment.objects.filter(
        user=profile_user), many=True, context={'user': request.user})
    data = {
        'post_articles': post_articles.data,
        'like_articles': like_articles.data,
        'post_comments': comments.data
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_roadmaps(request, nickname):
    profile_user = get_object_or_404(User, nickname=nickname)
    post_reviews = ReviewSimpleSerializer(instance=Review.objects.filter(
        user=profile_user), many=True)
    clear_nodes = NodeSimpleserializer(profile_user.clear_nodes.all(
    ), many=True, context={'user': request.user})
    favorite_roadmpas = TrackSimpleSerializer(
        profile_user.favorite_roadmaps.all(), many=True, context={'user': request.user})
    data = {
        'post_reviews': post_reviews.data,
        'clear_nodes': clear_nodes.data,
        'favorite_roadmpas': favorite_roadmpas.data
    }
    return Response(data, status=status.HTTP_200_OK)


from django.shortcuts import redirect 
import urllib 

# code 요청
def kakao_login(request):
    app_rest_api_key = '9dc0cc4073c88973eefa99bb2f1f9bcc'
    redirect_uri = "http://127.0.0.1:8000/accounts/login/kakao/callback/"
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={app_rest_api_key}&redirect_uri={redirect_uri}&response_type=code"
    )
    
    
# access token 요청
def kakao_callback(request):                          
    print('옴?')                                        
    params = urllib.parse.urlencode(request.GET)      
    print(params)                                
    return redirect(f'http://127.0.0.1:8000/accounts/login/kakao/callback?{params}')   


import requests                       


class KakaoView(View):
    def get(self, request):
        kakao_api = 'https://kauth.kakao.com/oauth/authorize?response_type=code'
        redirect_uri = 'http://127.0.0.1:8000/accounts/kakao/callback/'
        client_id = '9dc0cc4073c88973eefa99bb2f1f9bcc'

        return redirect(f'{kakao_api}&client_id={client_id}&redirect_uri={redirect_uri}')


class KakaoCallBackView(View):
    def get(self, request):
        data = {
            'grant_type': 'authorization_code',
            'client_id': '9dc0cc4073c88973eefa99bb2f1f9bcc',
            'redirect_uri': 'http://127.0.0.1:8000/accounts/kakao/callback/',
            'code': request.GET['code'],
            'client_secret': 'LjHYtkcMbEVnEUcjeHh2aXjwkD2IvKK0',
        }
        kakao_token_api = 'https://kauth.kakao.com/oauth/token'
        access_token = requests.post(kakao_token_api, data=data).json()
        return redirect('http://i8d212.p.ssafy.io/')