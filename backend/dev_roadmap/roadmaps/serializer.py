from .models import Node, Track

from rest_framework import serializers


class Test(serializers.ModelSerializer):

    class Meta:
        model = Node
        fields = '__all__'


class NodeSerializer(serializers.ModelSerializer):
    nodes = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = '__all__'

    def get_nodes(self, object):
            temp = []
            if not object.parent:
                print(object)
                temp.append(object)
            serialzier = Test(temp, many=True)
            print(serialzier.data)
            return serialzier.data

class TrackSerializer(serializers.ModelSerializer):
    # nodes = NodeSerializer(many=True)
    # print(nodes)

    nodes = serializers.SerializerMethodField()
    print(nodes)  
    class Meta:
        model = Track
        fields = ('__all__')
        read_only_fields = ('nodes', )

    def get_nodes(self, object):
        print(object.nodes.all())
        temp_node = []
        for node in object.nodes.all():
            if not node.parent:
                temp_node.append(node)
        return None
        # temp = []
        # if not object.parent:
        #     print(object)
        #     temp.append(object)
        # serialzier = Test(temp, many=True)
        # print(serialzier.data)
        # return serialzier.data
