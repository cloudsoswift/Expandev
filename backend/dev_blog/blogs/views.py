from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer
from .models import Article, Comment, Tag


@api_view(['GET']) #전체 태그 조회
def tag_all(request):
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)
