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
    
    class Meta:
        model = Review
        exclude = ('node',)


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
    
    class Meta:
        model = Track
        fields = ('title', 'content', 'purpose', 'nodesData')
        read_only_fields = ('nodes', )

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