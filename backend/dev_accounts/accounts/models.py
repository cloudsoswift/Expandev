from .managers import UserManager

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USERNAME_FIELD = 'nickname'
    
    username = None
    last_name = None
    first_name = None
    login_type = models.CharField(max_length=10)
    sns_service_id = models.CharField(max_length=100)
    nickname = models.CharField(max_length=10, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    profile_image = models.ImageField(default='media/default.png')
    introduce = models.TextField(default='아직 자기소개가 없습니다.', blank=True, null=True)

    objects = UserManager()

    def __str__(self):
        return self.email