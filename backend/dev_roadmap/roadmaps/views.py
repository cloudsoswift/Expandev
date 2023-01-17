from .models import Node, Track, Completion
from .serializer import TrackSerializer, NodeDetailSerializer, CompletionSerializer

from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_track(request, track_id):
    track = Track.objects.get(id=track_id)
    serializer = TrackSerializer(track)
    return Response(serializer.data)


@api_view(['GET'])
def get_node(request, node_id):
    node = Node.objects.get(id=node_id)
    serializer = NodeDetailSerializer(node)
    return Response(serializer.data)


@api_view(['POST'])
def clear_node(request, node_id):
    node = Node.objects.get(id=node_id)
    user = request.user
    completion = Completion.objects.filter(Q(node=node) & Q(user=user))
    if completion:
        completion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        serializer = CompletionSerializer(data={'node': node_id})
        if serializer.is_valid():
            serializer.save(user=user)
        else:
            print(serializer.errors)
    return Response(status=status.HTTP_201_CREATED)