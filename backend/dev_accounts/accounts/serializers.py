from .models import User, Profile

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


class CustomRegisterSerializer(RegisterSerializer):
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
    id = serializers.IntegerField()
    

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['id']=self.validated_data.get('id')
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
    class Meta(UserDetailsSerializer.Meta):
        fields = ('id','email', 'nickname', 'login_type', 'is_active','stat', 'phone_number', 'svc_use_pcy_agmt_yn', 'ps_info_proc_agmt_yn', 'mkt_info_recv_agmt_yn', 'news_feed_push_yn', 'noti_push_yn', 'position')
        read_only_fields = ('email', 'password',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email','nickname', 'login_type', 'stat', 'phone_number', 'svc_use_pcy_agmt_yn', 'ps_info_proc_agmt_yn', 'mkt_info_recv_agmt_yn', 'news_feed_push_yn', 'noti_push_yn', 'position')


class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True)
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    clear_nodes_count = serializers.IntegerField(source='user.clear_nodes.count', read_only=True)
    like_articles_count = serializers.IntegerField(source='user.like_articles.count', read_only=True)
    post_articles_count= serializers.IntegerField(source='user.articles.count', read_only=True)
    post_reviews_count= serializers.IntegerField(source='user.review.count', read_only=True)


    class Meta:
        model = Profile
        exclude = ('user','id')
        read_only_fields = ('user',)

    def update(self, instance, validated_data):
        BASE_DIR = Path(__file__).resolve().parent.parent
        if os.path.exists(f'{BASE_DIR}/media/{instance.profile_image}'):
            os.remove(f'{BASE_DIR}/media/{instance.profile_image}')

        instance.introduce = validated_data.get('introduce', instance.introduce)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.save()
        return instance