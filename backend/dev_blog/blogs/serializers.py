from rest_framework import serializers
from .models import Article, Comment, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('username','user', 'like_users', 'tags')


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'article','parent_comment','lke_users')

