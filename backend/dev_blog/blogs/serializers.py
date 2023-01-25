from rest_framework import serializers
from .models import Article, Comment, Tag

class TagSerializer(serializers.ModelSerializer):
    articles_count = serializers.IntegerField(source = 'articles.count', read_only=True)
    
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    comments_count = serializers.IntegerField(source = 'comments.count', read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('username','user', 'like_users', 'tags', 'like_users_count', 'comments_count')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_articles.filter(pk=obj.pk).exists()
        return False
       



class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'article','parent_comment','like_users', 'like_users_count')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_comments.filter(pk=obj.pk).exists()
        return False



