from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer
from .models import Article, Comment, Tag
from django.shortcuts import get_object_or_404, get_list_or_404

############ 태그

@api_view(['GET']) #태그 검색
def tag_list(request, search_tag=None): 
    if search_tag: #태그 검색 조회
        tags = Tag.objects.filter(tag__contains=search_tag)
    else: #태그 전체 조회
        tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def tag_articles(request): #태그 게시글 조회
    select_tags = request.GET.getlist('tags')
    temp_articles=[]
    for search_tag in select_tags: 
        try: #태그 없으면 넘어가도록 함
            tag = Tag.objects.get(tag=search_tag)
        except:
            continue
        tag_articles = Article.objects.filter(tags=tag)
        if tag_articles :
            for article in tag_articles:
                temp_articles.append(article)
    if not temp_articles :
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        sort_article=[]
        for article in temp_articles:
            serializer = ArticleSerializer(article)
            sort_article.append(serializer.data)
        sort_article=sorted(sort_article , key= lambda x: -x['hit'])
        return Response(sort_article)



############### 게시글

@api_view(['GET'])
def article_list(request): #전체게시판 조회
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data) 

    #좋아요, 조회수, 최신


@api_view(['POST','GET','PUT','DELETE'])
def article(request, article_id=None): #게시글 디테일
    if article_id:
        article = get_object_or_404(Article, pk=article_id)
        
    if request.method == 'GET': #조회
        article.hit+=1
        article.save()
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    elif request.method == 'DELETE': #삭제
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT' or 'POST': #수정, 작성
        entered_tags = request.POST.getlist('tags')
        data = {
            'title' : request.data['title'],
            'content' : request.data['content'],
        }
        tags = []
        if entered_tags:
            for tag in entered_tags :
                temp, _ = Tag.objects.get_or_create(tag=tag)
                tags.append(temp)
        if request.method == 'POST':
            serializer = ArticleSerializer(data=data)
        elif request.method == 'PUT':
            serializer = ArticleSerializer(article,data=data)
        if serializer.is_valid():
            serializer.save(tags=tags, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    
############## 댓글

@api_view(['GET','POST'])
def comment(request, article_id, parent_id=None): #댓글 조회, 작성
    article = get_object_or_404(Article, pk=article_id)
    parent_comment=None
    if parent_id :
        parent_comment = Comment.objects.get(pk=parent_id)
        
    if request.method == 'GET': #게시글에 달린 댓글 전체 조회
        comments = Comment.objects.filter(article = article)
        if comments :
            comments = comments.order_by('-created_at')
        serializer = CommentSerializer(comments, many= True)
        return Response(serializer.data)
    
    elif request.method == 'POST': #댓글 작성
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, article=article,
                            parent_comment=parent_comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_id):
    comment = get_object_or_404(Comment,pk=comment_id)
    if request.method == 'GET': #댓글 상세 조회
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE': #댓글 삭제
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT': #댓글 수정
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        
@api_view(['POST'])
def like_article(request, article_id):  # 게시글 좋아요
    article = Article.objects.get(pk=article_id)
    if article.like_users.filter(pk=request.user.pk).exists():
        article.like_users.remove(request.user)
        liked = False
    else:
        article.like_users.add(request.user)
        liked = True
    context = {
        'liked': liked,
        'like_count': article.like_users.count()
    }
    return Response(context)


@api_view(['POST'])
def like_comment(request, comment_id):  # 댓글 좋아요
    comment = Comment.objects.get(pk=comment_id)
    if comment.like_users.filter(pk=request.user.pk).exists():
        comment.like_users.remove(request.user)
        liked = False
    else:
        comment.like_users.add(request.user)
        liked = True
    context = {
        'liked': liked,
        'like_count': comment.like_users.count()
    }
    return Response(context)

