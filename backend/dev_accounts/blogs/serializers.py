from .models import Article, Comment, Tag, ArticleTempImage, ArticleImage

from rest_framework import serializers
from rest_framework.utils import model_meta



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
    profile_image = serializers.CharField(source = 'user.profile.profile_image.url', read_only=True)


    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('username','user', 'like_users', 'tags', 'like_users_count', 'comments_count', 'profile_image')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_articles.filter(pk=obj.pk).exists()
        return False

    def create(self, validated_data):
        ModelClass = self.Meta.model
        info = model_meta.get_field_info(ModelClass)
        many_to_many = {}
        for field_name, relation_info in info.relations.items():
            if relation_info.to_many and (field_name in validated_data):
                many_to_many[field_name] = validated_data.pop(field_name)

        article = ModelClass._default_manager.create(**validated_data)
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

        return article


class AritcleTempImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArticleTempImage
        fields = ('__all__')


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.nickname', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    liked = serializers.SerializerMethodField(read_only=True)
    profile_image = serializers.CharField(source = 'user.profile.profile_image.url', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'article','parent_comment','like_users', 'like_users_count', 'profile_image')

    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_comments.filter(pk=obj.pk).exists()
        return False