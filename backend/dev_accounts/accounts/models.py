from .managers import UserManager

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    username = None
    nickname = models.CharField(max_length=50)
    email = models.EmailField(_('email address'), unique=True)    
    login_type = models.CharField(null=True, max_length=10)
    profile_image = models.ImageField(default='media/default.png')
    introduce = models.TextField(default='아직 자기소개가 없습니다.', blank=True, null=True)

    REQUIRED_FIELDS = []
    def __str__(self):
        return self.email
