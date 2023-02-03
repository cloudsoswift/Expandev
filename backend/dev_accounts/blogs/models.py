from django.db import models
from django.conf import settings

class Tag(models.Model):
    tag = models.CharField(max_length=100)


class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    hit = models.IntegerField(default=1)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_articles", blank=True)
    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)
    overview = models.TextField()
    thumnail_image = models.ImageField(default='article/thumnail_default.png', upload_to='article/', blank=True, null=True)


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comments")
    user =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='recomments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_secret = models.BooleanField(default=False)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_comments", blank=True)


class ArticleTempImage(models.Model):
    image = models.ImageField(upload_to='article/temp_images/')


class ArticleImage(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    image_path = models.CharField(max_length=255)
