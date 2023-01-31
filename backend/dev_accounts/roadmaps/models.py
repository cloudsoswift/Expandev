from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class Track(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    purpose = models.TextField()


class Node(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE, related_name='nodes')
    depth = models.IntegerField()
    order = models.IntegerField()
    isEssential = models.BooleanField(default=False)
    isComplete = models.BooleanField(default=False)
    title = models.CharField(max_length=255)
    content = models.TextField()
    purpose = models.TextField()
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='childs')
    completion = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='clear_nodes', blank=True)


class RecommendContent(models.Model):
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='recommend_content')
    title = models.CharField(max_length=255)
    url = models.CharField(max_length=1000)
    img_url = models.CharField(max_length=1000, default="")


class Interview(models.Model):
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='interview')
    interviewee = models.CharField(max_length=255)
    content = models.TextField()


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='review')
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='review')
    content = models.CharField(max_length=100)
    importance = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=3)
    difficulty = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=3)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_reviews", blank=True) 


class Role(models.Model):
    content = models.CharField(max_length=255)


class Situation(models.Model):
    role = models.ManyToManyField(Role, related_name='situation')
    content = models.CharField(max_length=255)
