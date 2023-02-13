from .models import User
from roadmaps.models import Review
from .serializers import UserSerializer
from backend.settings import get_secret
from blogs.models import Article, Comment
from .tokens import get_tokens_for_user
from blogs.serializers import ArticleSimpleSerializer, CommentSimpleSerializer
from roadmaps.serializer import ReviewSimpleSerializer, NodeSimpleserializer, TrackSimpleSerializer
from .serializers import UserSerializer, ProfileImageSerializer, ProfileSerializer, CustomJWTSerializer

from rest_framework import status
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.shortcuts import get_list_or_404, get_object_or_404, redirect 
from django.http import HttpResponse
from django.http import JsonResponse

import re
import requests          
from http import cookies



KAKAO_OAUTH = 'https://kauth.kakao.com/oauth'
KAKAO_API = 'https://kapi.kakao.com'
SERVER_DOMAIN = 'http://i8d212.p.ssafy.io:8000'


@api_view(['GET'])
def userlist(request):
    user_list = get_list_or_404(User)
    serializer = UserSerializer(user_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def logout(request):
    if 'refresh_token' in request.COOKIES:
        response = HttpResponse(status=status.HTTP_200_OK)
        response.delete_cookie('refresh_token')
        return response
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

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
    post_comments = CommentSimpleSerializer(instance=Comment.objects.filter(
        user=profile_user), many=True, context={'user': request.user})
    like_comments = CommentSimpleSerializer(instance=profile_user.like_comments, many=True, context={'user': request.user})
    data = {
        'post_articles': post_articles.data,
        'like_articles': like_articles.data,
        'post_comments': post_comments.data,
        'like_comments': like_comments.data,
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_roadmaps(request, nickname):
    profile_user = get_object_or_404(User, nickname=nickname)
    post_reviews = ReviewSimpleSerializer(instance=Review.objects.filter(
        user=profile_user), many=True, context={'user': request.user})
    like_reviews = ReviewSimpleSerializer(
        instance=profile_user.like_reviews, many=True, context={'user': request.user})
    clear_nodes = NodeSimpleserializer(profile_user.clear_nodes.all(
    ), many=True, context={'user': request.user})
    favorite_roadmpas = TrackSimpleSerializer(
        profile_user.favorite_roadmaps.all(), many=True, context={'user': request.user})
    data = {
        'post_reviews': post_reviews.data,
        'like_reviews':like_reviews.data,
        'clear_nodes': clear_nodes.data,
        'favorite_roadmpas': favorite_roadmpas.data
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def kakao_login(request):
    kakao_api = f'{KAKAO_OAUTH}/authorize?response_type=code'
    # redirect_uri = f'{SERVER_DOMAIN}/accounts/login/kakao/callback/'
    redirect_uri = 'http://localhost:5173/done'
    client_id = get_secret('client_id')
    return redirect(f'{kakao_api}&client_id={client_id}&redirect_uri={redirect_uri}')



@api_view(['GET'])
def kakao_call_back(request):
    print('call back')
    # 로그인 후 응답받은 code 를 통해 카카오 서버로 데이터 요청
    data = {
        'code': request.GET['code'],
        'grant_type': 'authorization_code',
        'client_id': get_secret('client_id'),
        'client_secret': get_secret('client_secret'),
        'redirect_uri': f'{SERVER_DOMAIN}/accounts/login/kakao/callback/',
    }
    context = {'code': request.GET['code']}
    return Response(status=status.HTTP_302_FOUND)
    # kakao_token_api = f'{KAKAO_OAUTH}/token'
    # token_api_info = requests.post(kakao_token_api, data=data).json()
    # id_token = token_api_info.get('id_token')
    # # 회원정보 조회
    # kakao_token_info_api = f'{KAKAO_OAUTH}/tokeninfo?id_token={id_token}'
    # user_info = requests.post(kakao_token_info_api).json()
    # nickname = user_info.get('nickname')
    # email = user_info.get('email')
    # sns_service_id = user_info.get('sub')
    # login_type = 'kakao'
    # # 회원가입 유무 조회
    # if get_user_model().objects.filter(sns_service_id=sns_service_id).exists():
    #     user = get_user_model().objects.get(sns_service_id=sns_service_id)
    #     status = 200
    # else:
    #     user = get_user_model().objects.create(
    #         username='user without password',
    #         nickname=nickname,
    #         email=email,
    #         sns_service_id=sns_service_id,
    #         login_type=login_type,
    #     )
    #     status = 201
    # # JWT 발행
    # JWT = get_tokens_for_user(user)
    # access_token = JWT['access']
    # refresh_token = JWT['refresh']
    # context = {
    #     'access_token': access_token,
    #     'refresh_token': refresh_token,
    # }
    # # return Response(context, status=status)
    # return redirect('http://localhost:5017/')


@api_view(['GET'])
def get_kakao_token(request, code):
    data = {
        'code': code,
        'grant_type': 'authorization_code',
        'client_id': get_secret('client_id'),
        'client_secret': get_secret('client_secret'),
        'redirect_uri': f'http://localhost:5173/done',
    }
    kakao_token_api = f'{KAKAO_OAUTH}/token'
    token_api_info = requests.post(kakao_token_api, data=data).json()
    print('token!')
    print(token_api_info)
    id_token = token_api_info.get('id_token')
    # 회원정보 조회
    kakao_token_info_api = f'{KAKAO_OAUTH}/tokeninfo?id_token={id_token}'
    user_info = requests.post(kakao_token_info_api).json()
    print(user_info)
    nickname = user_info.get('nickname')
    email = user_info.get('email')
    sns_service_id = user_info.get('sub')
    login_type = 'kakao'
    # 회원가입 유무 조회
    if get_user_model().objects.filter(sns_service_id=sns_service_id).exists():
        user = get_user_model().objects.get(sns_service_id=sns_service_id)
        status = 200
    else:
        user = get_user_model().objects.create(
            username='user without password',
            nickname=nickname,
            email=email,
            sns_service_id = 1,
            login_type = 1
            # sns_service_id=sns_service_id,
            # login_type=login_type,
        )
        status = 201
    # JWT 발행
    JWT = get_tokens_for_user(user)
    access_token = JWT['access']
    refresh_token = JWT['refresh']
    context = {
        'access_token': access_token,
        # 'refresh_token': refresh_token,
    }
    COOKIE = cookies.SimpleCookie()
    COOKIE['refresh_token'] = refresh_token
    # return Response(context, status=status)
    # return redirect('http://localhost:5017/')
    # return HttpResponse.set_cookie(key='refresh_token', value=refresh_token, max_age=None, expires=None, path='/', domain=None, secure=False, httponly=False, samesite=None)
    response = JsonResponse(context)
    response.set_cookie('refresh_token', refresh_token)
    return response



@api_view(['POST'])
def verify_refresh_token_in_cookie(request):
    cookies = request.META.get('HTTP_COOKIE').split()
    for cookie in cookies:
        if 'refresh_token' in cookie:
            refresh_token = cookie.split('=')[1][:-1]

    url = f'{SERVER_DOMAIN}/accounts/token/verify/'
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
    url = f'{SERVER_DOMAIN}/accounts/login/'
    response = requests.post(url=url, data=request.data).json()
    refresh_token = response['refresh_token']
    response = JsonResponse(response)
    response.set_cookie(key='refresh_token', value=refresh_token)
    return response
