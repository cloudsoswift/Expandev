from .models import Article, Comment, Tag, ArticleTempImage, ArticleImage

from rest_framework import serializers
from rest_framework.utils import model_meta

import os
from pathlib import Path


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
    user_profile_image = serializers.CharField(source = 'user.profile_image', read_only=True)


    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('username','user', 'like_users', 'tags', 'like_users_count', 'comments_count', 'user_profile_image')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_articles.filter(pk=obj.pk).exists()
        return False

    def create(self, validated_data):
        BASE_DIR = Path(__file__).resolve().parent.parent.parent

        ModelClass = self.Meta.model
        info = model_meta.get_field_info(ModelClass)
        many_to_many = {}
        for field_name, relation_info in info.relations.items():
            if relation_info.to_many and (field_name in validated_data):
                many_to_many[field_name] = validated_data.pop(field_name)

        article = ModelClass._default_manager.create(**validated_data)
        article.thumbnail = "article_default.png"
        if validated_data.get('thumbnail'):
            if os.path.exists(f'{BASE_DIR}/article/{article.thumbnail}'):
                os.remove(f'{BASE_DIR}/article/{article.thumbnail}')
            article.thumbnail = validated_data.get('thumbnail', article.thumbnail)

        if many_to_many:
            for field_name, value in many_to_many.items():
                field = getattr(article, field_name)
                field.set(value)

        images_path = []
        contents = validated_data['content'].split()
        for content in contents:
            if content[0] == '!' and content[1] == '[' and content[-1] == ')' and ('media/temp_images' in content):
                split_content = content.split('/')[-1]
                image = split_content[:-1]
                images_path.append(image)

        for image in images_path:
            image_path = f'temp_images/{image}'
            _ = ArticleImage.objects.create(
                article=article,
                image_path=image_path
            )

        article.save()
        return article
    
    def update(self, instance, validated_data):
        BASE_DIR = Path(__file__).resolve().parent.parent.parent
        instance.thumbnail = "article_default.png"
        if validated_data.get('thumbnail'):
            if os.path.exists(f'{BASE_DIR}/article/{instance.thumbnail}'):
                os.remove(f'{BASE_DIR}/article/{instance.thumbnail}')
            instance.thumbnail = validated_data.get('thumbnail', instance.thumbnail)
        instance.title = validated_data.get('title', instance.thumbnail)
        instance.overview = validated_data.get('overview', instance.thumbnail)

        images_path = []
        contents = validated_data['content'].split()
        for content in contents:
            if content[0] == '!' and content[1] == '[' and content[-1] == ')' and ('media/temp_images' in content):
                split_content = content.split('/')[-1]
                image = split_content[:-1]
                images_path.append(image)

        for image in images_path:
            image_path = f'temp_images/{image}'
            _ = ArticleImage.objects.create(
                article=instance,
                image_path=image_path
            )
        instance.save()
        return instance

class AritcleTempImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArticleTempImage
        fields = ('__all__')


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    user_profile_image = serializers.CharField(source = 'user.profile_image', read_only=True)
    recomments_count = serializers.IntegerField(source = 'recomments.count', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'article','parent_comment','like_users', 'like_users_count', 'user_profile_image', 'recomments_count')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_comments.filter(pk=obj.pk).exists()
        return False


class ArticleSimpleSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    comments_count = serializers.IntegerField(source = 'comments.count', read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    user_profile_image = serializers.CharField(source='user.profile_image', read_only=True)


    class Meta:
        model = Article
        fields = ('id','title', 'overview', 'nickname','tags', 'like_users_count', 'comments_count', 'liked', 'created_at', 'thumbnail','user_profile_image')
        read_only_fields = ('nickname','user', 'like_users', 'tags', 'like_users_count', 'comments_count', 'user_profile_image')
    
    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_articles.filter(pk=obj.pk).exists()
        return False

class CommentSimpleSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    recomments_count = serializers.IntegerField(source = 'recomments.count', read_only=True)
    user_profile_image = serializers.CharField(source = 'user.profile_image', read_only=True)


    class Meta:
        model = Comment
        fields = ('id', 'article','like_users_count', 'content','is_secret','liked','nickname', 'recomments_count',  'created_at','user_profile_image')
        read_only_fields = ('user', 'article','parent_comment', 'like_users_count','user_profile_image')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_comments.filter(pk=obj.pk).exists()
        return False