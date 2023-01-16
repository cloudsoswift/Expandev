from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer
from .models import Article, Comment, Tag

############ 태그

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


############### 게시글

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


@api_view(['GET','PUT','DELETE'])
def article(request, article_id): #게시글 디테일
    article = Article.objects.get(pk=article_id)
    if request.method == 'GET': #조회
        article.hit+=1
        article.save()
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    elif request.method == 'DELETE': #삭제
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT': #수정
        entered_tags = request.POST.getlist('tags')
        data = {
            'title' : request.data['title'],
            'content' : request.data['content'],
        }
        if not entered_tags:
            serializer = ArticleSerializer(article, data=data)
            if serializer.is_valid(raise_exception=True):
                # serializer.save(user = request.user)  
                serializer.save(tags=[])  
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            tags = []
            for tag in entered_tags :
                temp, already_tag = Tag.objects.get_or_create(tag=tag)
                tags.append(temp)
            serializer = ArticleSerializer(article,data=data)
            if serializer.is_valid():
                # serializer.save(user = request.user)  
                serializer.save(tags = tags)  
                return Response(serializer.data, status=status.HTTP_201_CREATED)

############## 댓글
@api_view(['GET','POST'])
def comment(request,article_id): #게시글의 모든 댓글 조회, 게시글에 댓글 작성
    article = Article.objects.get(pk = article_id)
    
    if request.method == 'GET': #게시글에 달린 댓글 전체 조회
        comments = Comment.objects.filter(article = article)
        if comments :
            comments = comments.order_by('-created_at')
        serializer = CommentSerializer(comments, many= True)
        return Response(serializer.data)
    
    elif request.method == 'POST': #댓글 작성
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # serializer.save(article=article, user=request.user)
            serializer.save(article=article)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

            