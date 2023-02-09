from rest_framework.response import Response
from rest_framework.decorators import api_view

import requests                       

KAKAO_OAUTH = 'https://kauth.kakao.com/oauth'
KAKAO_API = 'https://kapi.kakao.com'
SERVER_DOMAIN = 'http://127.0.0.1:8000'


# @api_view(['GET'])
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


def OAuth_User(func):
    def wrapper():
        user = func.user
        if user.login_type == 'kakao':
            verify_access_token(func)
        else:
            pass 