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

@api_view(['GET']) #태그 검색
def tag_list(request, search_tag): 
    tags = Tag.objects.filter(tag__contains=search_tag)
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

@api_view(['GET']) #태그 연결된 게시글 조회
def tag_articles(request, search_tag): #태그 게시글 조회
    try: #해당 태그 없을 때 
        tag = Tag.objects.get(tag=search_tag)
    except:
        return Response(None)
    # 해당 태그 있을 때 게시글 찾기
    tag_articles = Article.objects.filter(tags=tag)
    if tag_articles :
        tag_articles = tag_articles.order_by('-created_at')
        serializer = ArticleSerializer(tag_articles, many = True)
        return Response(serializer.data)
    else:
        return Response(None)

@api_view(['GET'])
def article_list(request): #전체게시판 조회
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many = True)
    return Response(serializer.data)


@api_view(['POST'])
def article_create(request): #글작성
    entered_tags = request.POST.getlist("tags")
    data = {
        'title' : request.data['title'],
        'content' : request.data['content'],
    }
    if not entered_tags:
        serializer = ArticleSerializer(data=data)
        if serializer.is_valid():
            # serializer.save(user = request.user)  
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    tags = []
    for tag in entered_tags :
        temp, already_tag = Tag.objects.get_or_create(tag=tag)
        tags.append(temp)
    serializer = ArticleSerializer(data=data)
    if serializer.is_valid():
        # serializer.save(user = request.user)  
        serializer.save(tags = tags)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
