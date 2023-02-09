from .models import User
from roadmaps.models import Review
from .serializers import UserSerializer
from backend.settings import get_secret
from blogs.models import Article, Comment
from .serializers import CustomJWTSerializer
from .serializers import CustomRegisterSerializer
from blogs.serializers import ArticleSimpleSerializer, CommentSimpleSerializer
from .serializers import UserSerializer, ProfileImageSerializer, ProfileSerializer
from roadmaps.serializer import ReviewSimpleSerializer, NodeSimpleserializer, TrackSimpleSerializer

from rest_framework import status
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.shortcuts import get_list_or_404, get_object_or_404, redirect 

import re
import json
import requests                       
from pprint import pprint
from ast import literal_eval


KAKAO_OAUTH = 'https://kauth.kakao.com/oauth'
KAKAO_API = 'https://kapi.kakao.com'
SERVER_DOMAIN = 'http://i8d212.p.ssafy.io:9000'


@api_view(['GET'])
def verify_access_token(request):
    kakao_verify_token = f'{KAKAO_API}/v1/user/access_token_info'
    # access_token = request.HEADERS.get('Authorization')
    
    # headers = {'Authorization': access_token}
    headers = {'Authorization': 'Bearer 68K2QTo8FWfddgj2FTpoRoO0IBdxfILmRdCcBRkXCisNHgAAAYY0Vy2m'}
    response = requests.get(url=kakao_verify_token, headers=headers)
    status_code = response.status_code
    error_code = response.json().get('code')
    if error_code: 
        error_code = int(error_code)
        msg = response.json().get('msg')
    else:
        msg = '성공'
    context = {
        'msg': msg,
    }
    return Response(context, status=status_code)


def OAuth_User(request):
    def wrapper():
        user = request.user
        if user.login_type == 'kakao':
            verify_access_token(request)





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
def set_profile(request):
    user = request.user
    data = request.data
    serializer = ProfileImageSerializer(user, data=data)
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
    profile_user = get_object_or_404(User, nickname=nickname)
    serializer = ProfileSerializer(profile_user)
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

@api_view(['GET'])
def kakao_login(request):
    kakao_api = f'{KAKAO_OAUTH}/authorize?response_type=code'
    redirect_uri = 'http://i8d212.p.ssafy.io:9000/accounts/login/kakao/callback/'
    # redirect_uri = f'{SERVER_DOMAIN}/accounts/login/kakao/callback/'
    client_id = get_secret('client_id')
    return redirect(f'{kakao_api}&client_id={client_id}&redirect_uri={redirect_uri}')


@api_view(['GET'])
def kakao_call_back(request):
    # 로그인 후 응답받은 code 를 통해 카카오 서버로 데이터 요청
    data = {
        'grant_type': 'authorization_code',
        'client_id': get_secret('client_id'),
        'redirect_uri': f'{SERVER_DOMAIN}/accounts/login/kakao/callback/',
        'code': request.GET['code'],
        'client_secret': get_secret('client_secret'),
    }
    kakao_token_api = f'{KAKAO_OAUTH}/token'
    token_api_info = requests.post(kakao_token_api, data=data).json()
    id_token = token_api_info.get('id_token')
    access_token = token_api_info.get('access_token')
    refresh_token = token_api_info.get('refresh_token')

    exists_user_data = {
        'access_token': access_token,
        'refresh_token': refresh_token
    }
    # 회원정보 조회
    kakao_token_info_api = f'{KAKAO_OAUTH}/tokeninfo?id_token={id_token}'
    user_info = requests.post(kakao_token_info_api).json()
    nickname = user_info.get('nickname')
    email = user_info.get('email')
    sns_service_id = user_info.get('sub')

    # 회원가입 유무 판단
    # 0. 카카오 인지 네이버 인지 확인 해야함, 근데 일단 스킵
    login_type = 'kakao' # or 'naver
    # 1. 해당 회원번호가 등록되어있는지 확인
    if get_user_model().objects.filter(sns_service_id=sns_service_id).exists():
        # 0. 존재
        # 1. 토큰 담아서 전달
        user = get_user_model().objects.get(sns_service_id=sns_service_id)
    else:
        # 0. 존재하지 않음
        # 1. 회원가입
        data = {
            'nickname': nickname,
            'email': email,
            'sns_service_id': sns_service_id,
            'login_type': login_type,
        }
        user = get_user_model().objects.create(
                username='user without password',
                nickname=nickname,
                email=email,
                sns_service_id=sns_service_id,
                login_type=login_type,
            )

    serializer = CustomJWTSerializer(data=exists_user_data, context={'user': user})
    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    else:
        print(serializer.errors)
    return redirect('http://i8d212.p.ssafy.io/')


@api_view(['POST'])
def verify_refresh_token_in_cookie(request):
    cookies = request.META.get('HTTP_COOKIE').split()
    for cookie in cookies:
        if 'refresh-token' in cookie:
            refresh_token = cookie.split('=')[1][:-1]

    url = 'http://i8d212.p.ssafy.io:8000/accounts/token/verify/'
    data = {
        'token': refresh_token
    }
    response = requests.post(url=url, data=data)
    if response.status_code == 200:
        return Response(status=status.HTTP_200_OK)   
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)   


@api_view(['POST'])
def include_refresh_token_in_cookie(request):
    url = 'http://i8d212.p.ssafy.io:8000/accounts/login/'
    response = requests.post(url=url, data=request.data).json()
    refresh_token = response['refresh_token']
    response = JsonResponse(response)
    response.set_cookie(key='refresh_token', value=refresh_token)
    return response
