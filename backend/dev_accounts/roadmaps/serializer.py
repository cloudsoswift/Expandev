from .models import Node, Track, RecommendContent, Interview, Review, Role, Situation

from django.contrib.auth import get_user_model

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username')


class RecommendContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecommendContent
        exclude = ('node',)


class InterviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Interview
        exclude = ('node',)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.nickname', read_only=True)
    user_profile_image = serializers.CharField(source='user.profile.profile_image.url', read_only=True)
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Review
        exclude = ('node',)
    
    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_reviews.filter(pk=obj.pk).exists()
        return False


class NodeDetailSerializer(serializers.ModelSerializer):
    recommend_content = RecommendContentSerializer(many=True)
    interview = InterviewSerializer(many=True)
    review = ReviewSerializer(many=True)
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)
    isComplete = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = ('id', 'isEssential', 'isComplete', 'title', 'content', 'purpose', 'recommend_content', 'interview', 'review', 'completion_count', 'completion',)

    def get_isComplete(self, data):
        user = self.context['user']
        if user.is_authenticated:
            node_id = data.id
            is_clear_node = user.clear_nodes.all().filter(id=node_id).exists()
            return True if is_clear_node else False
        else:
            return False


class Nodeserializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)
    isComplete = serializers.SerializerMethodField()

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        serializer = Nodeserializer(object.childs.all(), many=True)
        data = serializer.data  
        return data if data else None

    def get_isComplete(self, data):
        user = self.context['user']
        if user.is_authenticated:
            node_id = data.id
            is_clear_node = user.clear_nodes.all().filter(id=node_id).exists()
            return True if is_clear_node else False
        else:
            return False


class MainNodeSerializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)
    isComplete = serializers.SerializerMethodField()

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        user = self.context['user']
        serializer = Nodeserializer(object.childs.all(), many=True, context={'user': user})
        return serializer.data

    def get_isComplete(self, data):
        user = self.context['user']
        if user.is_authenticated:
            node_id = data.id
            is_clear_node = user.clear_nodes.all().filter(id=node_id).exists()
            return True if is_clear_node else False
        else:
            return False
            

class TrackSerializer(serializers.ModelSerializer):
    nodesData = serializers.SerializerMethodField()
    favorites_count = serializers.IntegerField(source = 'favorites.count', read_only=True)

    class Meta:
        model = Track
        fields = ('title', 'content', 'purpose', 'nodesData', 'favorites_count', 'favorites')


        read_only_fields = ('nodes',  'favorites_count')

    def get_nodesData(self, object):
        user = self.context['user']
        temp_node = []
        for node in object.nodes.all():
            if not node.parent:
                temp_node.append(node)
        serializer = MainNodeSerializer(temp_node, many=True, context={'user': user})
        return serializer.data


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user',)


class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = '__all__'


class SituationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Situation
        fields = ('id', 'content')


class ReviewSimpleSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.username', read_only=True)
    like_users_count = serializers.IntegerField(source = 'like_users.count', read_only=True)
    node_id = serializers.IntegerField(source = 'node.id', read_only=True)
    node_title = serializers.CharField(source = 'node.title', read_only=True)
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Review
        exclude = ('like_users','user','node',)
    
    def get_liked(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.like_reviews.filter(pk=obj.pk).exists()
        return False


class NodeSimpleserializer(serializers.ModelSerializer):
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)
    isComplete = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = ('id', 'title', 'content', 'completion_count','isEssential', 'isComplete',)


    def get_isComplete(self, data):
        user = self.context['user']
        if user.is_authenticated:
            node_id = data.id
            is_clear_node = user.clear_nodes.all().filter(id=node_id).exists()
            return True if is_clear_node else False
        else:
            return False


class TrackSimpleSerializer(serializers.ModelSerializer):
    favorites_count = serializers.IntegerField(source = 'favorites.count', read_only=True)
    favorite =  serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ('id', 'title', 'content', 'favorites_count', 'favorite')


    def get_favorite(self, obj):
        user = self.context['user']
        if user.is_authenticated:
            return user.favorite_roadmaps.filter(pk=obj.pk).exists()
        return False