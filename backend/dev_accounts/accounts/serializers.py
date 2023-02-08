from .models import User

from django.conf import settings
from rest_framework import serializers
from allauth.account.adapter import get_adapter
from dj_rest_auth.serializers import JWTSerializer
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.core.exceptions import ValidationError as DjangoValidationError

import os
from pathlib import Path


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    nickname = serializers.CharField(max_length=10)
    login_type = serializers.CharField(max_length=10)
    sns_service_id = serializers.CharField(max_length=100)
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['nickname'] = self.validated_data.get('nickname')
        data['email'] = self.validated_data.get('email')
        data['sns_service_id'] = self.validated_data.get('sns_service_id')
        data['login_type'] = self.validated_data.get('login_type')
        return data

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['login_type'] == 'kakao':
            pass
        else:
            if data['password1'] != data['password2']:
                raise serializers.ValidationError(_("The two password fields didn't match."))
        return data

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)
        user.nickname = self.validated_data.get('nickname')
        user.sns_service_id = self.validated_data.get('sns_service_id')
        if "password1" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data['password1'], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
            )
        user.save()
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user


# 유저 디테일 시리얼라이저
class CustomUserDetailSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ('id','email', 'nickname', 'login_type', 'is_active', 'sns_service_id')
        read_only_fields = ('email', 'password',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','email', 'nickname', 'login_type', 'is_active', 'sns_service_id')


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
    favorite_roadmaps_count = serializers.IntegerField(source='favorite_roadmaps.count', read_only=True)

    class Meta:
        model = User
        fields = ('id','nickname','position','introduce', 'profile_image', 'clear_nodes_count','like_articles_count','post_articles_count','post_reviews_count', 'favorite_roadmaps_count', )


class CustomJWTSerializer(JWTSerializer):

    def get_user(self, _):
        serializer = CustomUserDetailSerializer(instance=self.context['user'])
        user_data = serializer.data
        return user_data
