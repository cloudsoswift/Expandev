from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer, JWTSerializer
from django.utils.translation import gettext_lazy as _
# 회원가입 시리얼라이저
from django.conf import settings

from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from dj_rest_auth.utils import import_callable
from dj_rest_auth.serializers import UserDetailsSerializer as DefaultUserDetailsSerializer

from allauth.account.adapter import get_adapter
from django.core.exceptions import ValidationError as DjangoValidationError
from allauth.account.utils import setup_user_email
from django.utils.module_loading import import_string

from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from .models import User
class CustomRegisterSerializer(RegisterSerializer):
    # 기본 설정 필드: username, password, email
    # 추가 설정 필드: phone_number, profile_image, naver_email, kakao_email, google_email
    # 비밀번호 해제
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    phone_number = serializers.CharField(max_length=13, required=False)
    nickname = serializers.CharField(min_length = 1, required= True)
    login_type = serializers.CharField(required = False)
    stat = serializers.CharField(required = False)
    svc_use_pcy_agmt_yn = serializers.BooleanField(required = False)
    ps_info_proc_agmt_yn = serializers.BooleanField(required = False)
    mkt_info_recv_agmt_yn = serializers.BooleanField(required = False)
    news_feed_push_yn = serializers.BooleanField(required = False)
    noti_push_yn = serializers.BooleanField(required = False)
    position = serializers.CharField(required = True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['phone_number'] = self.validated_data.get('phone_number','')
        data['nickname'] = self.validated_data.get('nickname','Ghost')
        data['login_type'] = self.validated_data.get('login_type')
        data['stat'] = self.validated_data.get('stat')
        data['svc_use_pcy_agmt_yn'] = self.validated_data.get('svc_use_pcy_agmt_yn')
        data['ps_info_proc_agmt_yn'] = self.validated_data.get('ps_info_proc_agmt_yn')
        data['mkt_info_recv_agmt_yn'] = self.validated_data.get('mkt_info_recv_agmt_yn')
        data['news_feed_push_yn'] = self.validated_data.get('news_feed_push_yn')
        data['noti_push_yn'] = self.validated_data.get('noti_push_yn')
        data['position'] = self.validated_data.get('position')
        return data
        
# 유저 디테일 시리얼라이저
class CustomUserDetailSerializer(UserDetailsSerializer):
    pw = serializers.CharField(source="password")
    class Meta(UserDetailsSerializer.Meta):
        fields = ('email', 'pw', 'nickname', 'login_type', 'stat', 'phone_number', 'svc_use_pcy_agmt_yn', 'ps_info_proc_agmt_yn', 'mkt_info_recv_agmt_yn', 'news_feed_push_yn', 'noti_push_yn', 'position')
        read_only_fields = ('email', 'password',)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email','nickname', 'login_type', 'stat', 'phone_number', 'svc_use_pcy_agmt_yn', 'ps_info_proc_agmt_yn', 'mkt_info_recv_agmt_yn', 'news_feed_push_yn', 'noti_push_yn', 'position')
