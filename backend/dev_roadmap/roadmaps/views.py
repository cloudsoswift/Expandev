from .models import Node, Track, Completion, Review
from .serializer import TrackSerializer, NodeDetailSerializer, CompletionSerializer, ReviewSerializer

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


@api_view(['POST', 'PUT', 'DELETE'])
def node_review(request, review_id=None):
    user = request.user
    data = request.data
    if review_id:
        review = Review.objects.get(id=review_id)
        if request.method == 'PUT':
            serializer = ReviewSerializer(review, data=data)
            if serializer.is_valid():
                serializer.save(user=user)
        elif request.method == 'DELETE':
            review.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        if request.method == 'POST':
            serializer = ReviewSerializer(data=data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_200_OK)