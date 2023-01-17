from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import UserManager




class User(AbstractUser):
    USERNAME_FIELD = 'email'
    username = None
    email = models.EmailField(_('email address'), unique=True)
    nickname = models.CharField(max_length=50)
    login_type = models.CharField(null=True, max_length=10)
    stat = models.CharField(null=True, max_length=50)
    phone_number = models.CharField(max_length=13, null=True)
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

