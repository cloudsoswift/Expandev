from rest_framework import serializers
from .models import Article, Comment, Tag



class ArticleSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    comments_count = serializers.IntegerField(source = 'comments.count', read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('username','user', 'like_users', 'tags', 'like_users_count', 'comments_count')


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'article','parent_comment','like_users', 'like_users_count')

class TagSerializer(serializers.ModelSerializer):
    articles_count = serializers.IntegerField(source = 'articles.count', read_only=True)
    
    class Meta:
        model = Tag
        fields = '__all__'


