from backend.settings import get_secret

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model

import requests                       


class OAuth():
    KAKAO_OAUTH = 'https://kauth.kakao.com/oauth'
    KAKAO_API = 'https://kapi.kakao.com'
    SERVER_DOMAIN = 'http://i8d212.p.ssafy.io:8000'
    NAVER_API = 'https://openapi.naver.com/v1/nid/me'
    NAVER_TOKEN_API = 'https://nid.naver.com/oauth2.0/token'	
    REDIRECT_URI = 'http://i8d212.p.ssafy.io/done'
    STATE = 'test'

    def __init__(self):
        pass


    def get_kakao_token(self, code):
        data = {
            'code': code,
            'grant_type': 'authorization_code',
            'client_id': get_secret('KAKAO_CLIENT_ID'),
            'client_secret': get_secret('KAKAO_CLIENT_SECRET'),
            'redirect_uri': self.REDIRECT_URI,
        }
        kakao_token_api = f'{self.KAKAO_OAUTH}/token'
        token_api_info = requests.post(kakao_token_api, data=data).json()
        id_token = token_api_info.get('id_token')
        return id_token


    def get_naver_token(self, code):
        data = {
            'grant_type': 'authorization_code',
            'client_id': get_secret('NAVER_CLIENT_ID'),
            'client_secret': get_secret('NAVER_CLIENT_SECRET'),
            'code': code,
            'state': 'test',
        }
        naver_token_api = self.NAVER_TOKEN_API
        response = requests.post(url=naver_token_api, data=data).json()
        access_token = response.get('access_token')
        return access_token


    def get_kakao_user_info(self, id_token):
        kakao_token_info_api = f'{self.KAKAO_OAUTH}/tokeninfo?id_token={id_token}'
        user_info = requests.post(kakao_token_info_api).json()
        nickname = user_info.get('nickname')
        email = user_info.get('email')
        sns_service_id = user_info.get('sub')
        login_type = 'kakao'
        user_info = (nickname, email, sns_service_id, login_type)
        return user_info


    def get_naver_user_info(self, access_token):
        naver_api = f'{self.NAVER_API}'
        headers = { 
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.post(url=naver_api, headers=headers).json()
        user_info = response.get('response')
        nickname = user_info.get('nickname')
        email = user_info.get('email')
        sns_service_id = user_info.get('id')
        login_type = 'naver'
        info = (nickname, email, sns_service_id, login_type)
        return info


    def is_signed(self, sns_service_id, recived_email):
        user = get_user_model().objects.get(email=recived_email)
        if user.email == recived_email:
            return True
        return True if get_user_model().objects.filter(sns_service_id=sns_service_id).exists() else False


    def sign_up(self, data):
        nickname, email, sns_service_id, login_type = data
        user = get_user_model().objects.create(
            username='user without password',
            nickname=nickname,
            email=email,
            sns_service_id=sns_service_id,
            login_type=login_type,
        )   
        return user