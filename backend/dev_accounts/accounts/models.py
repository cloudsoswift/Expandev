from .managers import UserManager

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USERNAME_FIELD = 'nickname'
    username = models.CharField(max_length=10, blank=True, null=True)
    password = None
    nickname = models.CharField(max_length=10, unique=True)
    login_type = models.CharField(max_length=10)
    email = models.EmailField(_('email address'), unique=True)
    profile_image = models.ImageField(default='media/default.png')
    sns_service_id = models.CharField(max_length=100, unique=True)
    introduce = models.TextField(default='아직 자기소개가 없습니다.', blank=True, null=True)
    objects = UserManager()
