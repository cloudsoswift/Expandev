from .models import User

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer

from django.conf import settings
from django.core.exceptions import ValidationError as DjangoValidationError

import os
from pathlib import Path

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email


class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(max_length=10)
    password1 = None
    password2 = None
    nickname = serializers.CharField(max_length=10)
    login_type = serializers.CharField(max_length=10)
    sns_service_id = serializers.CharField(max_length=100)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['nickname'] = self.validated_data.get('nickname','Ghost')
        data['email'] = self.validated_data.get('email')
        data['sns_service_id'] = self.validated_data.get('sns_service_id')
        data['login_type'] = self.validated_data.get('login_type')
        return data

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)
        user.sns_service_id = self.validated_data.get('sns_service_id')
        user.save()
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user

    def validate(self, data):
        return data


# 유저 디테일 시리얼라이저
class CustomUserDetailSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ('id','email', 'nickname', 'login_type', 'is_active','stat', 'phone_number', 'svc_use_pcy_agmt_yn', 'ps_info_proc_agmt_yn', 'mkt_info_recv_agmt_yn', 'news_feed_push_yn', 'noti_push_yn', 'position')
        read_only_fields = ('email', 'password',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','nickname', 'login_type', 'stat', 'phone_number', 'svc_use_pcy_agmt_yn', 'ps_info_proc_agmt_yn', 'mkt_info_recv_agmt_yn', 'news_feed_push_yn', 'noti_push_yn', 'position')


class ProfileImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('profile_image','introduce')

    def update(self, instance, validated_data):
        BASE_DIR = Path(__file__).resolve().parent.parent
        if os.path.exists(f'{BASE_DIR}/media/{instance.profile_image}'):
            os.remove(f'{BASE_DIR}/media/{instance.profile_image}')

        instance.introduce = validated_data.get('introduce', instance.introduce)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.save()
        return instance

class ProfileSerializer(serializers.ModelSerializer):
    clear_nodes_count = serializers.IntegerField(source='clear_nodes.count', read_only=True)
    like_articles_count = serializers.IntegerField(source='like_articles.count', read_only=True)
    post_articles_count= serializers.IntegerField(source='articles.count', read_only=True)
    post_reviews_count= serializers.IntegerField(source='review.count', read_only=True)

    class Meta:
        model = User
        fields = ('id','nickname','position','introduce', 'clear_nodes_count','like_articles_count','post_articles_count','post_reviews_count', 'profile_image', )
