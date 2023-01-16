from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class User(AbstractUser):
    USERNAME_FIELD = 'email'
    username = None
    email = models.EmailField(_('email address'), unique=True)
    #user_id = models.CharField(max_length=100),
    #nickname = models.CharField(max_length=50),
    #login_type = models.IntegerField(default=0),
    #stat = models.IntegerField(default=0),

    


    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email