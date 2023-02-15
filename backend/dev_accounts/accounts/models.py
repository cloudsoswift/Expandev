from .managers import UserManager

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    
    username = models.CharField(max_length=150)
    last_name = None
    first_name = None
    login_type = models.CharField(max_length=10, default='expandev')
    sns_service_id = models.CharField(max_length=100, blank=True, null=True)
    nickname = models.CharField(max_length=10)
    email = models.EmailField(_('email address'), unique=True)
    profile_image = models.ImageField(default='media/profile_default.png', upload_to='profile/')
    introduce = models.TextField(default='아직 자기소개가 없습니다.', blank=True, null=True)

    objects = UserManager()
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.email
