from .managers import UserManager

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # username = models.CharField(max_length=30, unique=True)
    password = None
    # platform = models.CharField(max_length=30)
    # nickname = models.CharField(max_length=50)
    login_type = models.CharField(max_length=10)
    email = models.EmailField(_('email address'), unique=True)
    profile_image = models.ImageField(default='media/default.png')
    sns_service_id = models.CharField(max_length=100, unique=True)
    # position = models.CharField(null=True, blank=True, max_length=50)
    introduce = models.TextField(default='아직 자기소개가 없습니다.', blank=True, null=True)
    objects = UserManager()