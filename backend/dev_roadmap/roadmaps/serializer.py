from .models import Node, Track, RecommendContent, Interview, Review, Role

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
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Review
        exclude = ('node',)


class NodeDetailSerializer(serializers.ModelSerializer):
    recommend_content = RecommendContentSerializer(many=True)
    interview = InterviewSerializer(many=True)
    review = ReviewSerializer(many=True)
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)
    isComplete = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = ('id', 'isEssential', 'isComplete', 'title', 'content', 'purpose', 'recommend_content', 'interview', 'review', 'completion_count', 'completion', 'user')


    def get_isComplete(self, objects):
        # 1. 유저를 어떻게 구분할지 ~ 
        # 1-1. user 가 익명이면 False 주고
        # 1-2. 유저가 유저면 유저가 클리어한 노드중에 해당 노드가 포함되어있으면 True 를 반환해라~

        # print(self)
        # print(objects)
        return True

    def get_user(self, obj):
        # print(self)
        # print(obj)
        return "test"


class Nodeserializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)

    class Meta:
        model = Node
        exclude = ('parent', )

    def get_childs(self, object):
        serializer = Nodeserializer(object.childs.all(), many=True)
        data = serializer.data  
        return data if data else None


class MainNodeSerializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()
    completion_count = serializers.IntegerField(source='completion.count', read_only=True)


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
        fields = ('title', 'content', 'purpose', 'nodesData')
        read_only_fields = ('nodes', )

    def get_nodesData(self, object):
        temp_node = []
        for node in object.nodes.all():
            if not node.parent:
                temp_node.append(node)
        serializer = MainNodeSerializer(temp_node, many=True)
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