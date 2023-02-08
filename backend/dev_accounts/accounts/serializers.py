from .models import User

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from dj_rest_auth.serializers import JWTSerializer
from dj_rest_auth.serializers import UserDetailsSerializer

from django.conf import settings
from django.core.exceptions import ValidationError as DjangoValidationError

import os
from pathlib import Path


class CustomRegisterSerializer(RegisterSerializer):
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    nickname = serializers.CharField(min_length = 1, required= True)
    login_type = serializers.CharField(required = False)    

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['nickname'] = self.validated_data.get('nickname','Ghost')
        data['login_type'] = self.validated_data.get('login_type')
        return data


# 유저 디테일 시리얼라이저
class CustomUserDetailSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ('id','email', 'nickname', 'login_type', 'is_active')
        read_only_fields = ('email', 'password',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'nickname', 'login_type', 'is_active')


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


class CustomJWTSerializer(JWTSerializer):

    def get_user(self, _):
        serializer = CustomUserDetailSerializer(instance=self.context['user'])
        user_data = serializer.data
        return user_data

