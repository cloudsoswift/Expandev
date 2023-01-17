from django.contrib.auth import get_user_model
from .models import Node, Track, RecommendContent, Interview, Review, Completion

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username')


class CompletionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Completion
        fields = ('user', )


class RecommendContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecommendContent
        exclude = ('node',)
        

class InterviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Interview
        exclude = ('node',)


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Review
        exclude = ('node',)


class NodeDetailSerializer(serializers.ModelSerializer):
    recommend_content = RecommendContentSerializer(many=True)
    interview = InterviewSerializer(many=True)
    review = ReviewSerializer(many=True)
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)
    completion_users = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = ('id', 'isEssential', 'isComplete', 'title', 'content', 'purpose', 'recommend_content', 'interview', 'review', 'completion_count', 'completion_users')

    def get_completion_users(request, objects):
        user_list = []
        for completion in objects.completion.all():
            user = completion.user
            user_list.append(user)
        serializer = UserSerializer(user_list, many=True)
        return serializer.data



class Nodeserializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        serializer = Nodeserializer(object.childs.all(), many=True)
        data = serializer.data
        return data if data else None


class MainNodeSerializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        serializer = Nodeserializer(object.childs.all(), many=True)
        return serializer.data


class TrackSerializer(serializers.ModelSerializer):
    nodesData = serializers.SerializerMethodField()
    
    class Meta:
        model = Track
        fields = ('__all__')
        read_only_fields = ('nodes', )

    def get_nodesData(self, object):
        temp_node = []
        for node in object.nodes.all():
            if not node.parent:
                temp_node.append(node)
        serializer = MainNodeSerializer(temp_node, many=True)
        return serializer.data
