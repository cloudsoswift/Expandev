from .models import Node, Track,  Review, Role
from .serializer import TrackSerializer, NodeDetailSerializer, ReviewSerializer, RoleSerializer

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
    if user.clear_nodes.filter(id=node_id).exists():
        user.clear_nodes.remove(node)
    else:
        user.clear_nodes.add(node)
    return Response(status=status.HTTP_200_OK)


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


@api_view(['POST'])
def like_node_review(request, review_id):
    comment = Review.objects.get(id=review_id)
    user = request.user
    if comment.like_users.filter(id=user.id).exists():
        comment.like_users.remove(user)
    else:
        comment.like_users.add(user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_roles(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)


from rest_framework.views import APIView

class ExampleView(APIView):
    pass

