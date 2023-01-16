from django.db import models


class Tag(models.Model):
    tag = models.CharField(max_length=100)

class Article(models.Model):
    # user = models.ForeignKey(User, on_delete=models.) #on_delete값 어떻게하지?
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    hit = models.IntegerField(default=1)
    # like_users = models.ManyToManyField(User, related_name="like_articles")
    tags = models.ManyToManyField(Tag,related_name="articles")

class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    # user =  models.ForeignKey(User, on_delete=models.CASCADE) #on_delete값 어떻게하지?
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='recomments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_secret = models.BooleanField(default=False)
    # like_users = models.ManyToManyField(User, related_name="like_articles")


