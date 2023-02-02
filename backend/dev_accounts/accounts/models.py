from .managers import UserManager

from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    username = None
    email = models.EmailField(_('email address'), unique=True)
    nickname = models.CharField(max_length=50)
    login_type = models.CharField(null=True, max_length=10)
    stat = models.CharField(null=True, max_length=50)
    phone_number = models.CharField(null=True, max_length=13)
    svc_use_pcy_agmt_yn = models.BooleanField(default=False, null=True)
    ps_info_proc_agmt_yn = models.BooleanField(default=False, null=True)
    mkt_info_recv_agmt_yn = models.BooleanField(default=False, null=True)
    news_feed_push_yn = models.BooleanField(default=False, null=True)
    noti_push_yn = models.BooleanField(default=False, null=True)
    position = models.CharField(null=True, max_length=50)
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    introduce = models.TextField(default='아직 자기소개가 없습니다.', blank=True, null=True)
    profile_image = models.ImageField(default='media/default.png')