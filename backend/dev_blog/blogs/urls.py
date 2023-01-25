from django.urls import path
from . import views

app_name = 'blogs'

urlpatterns = [
    #article
    path('',views.article_list), #전체조회
    path('article', views.article),#게시글 작성
    path('article/<int:article_id>', views.article),#게시글 디테일 조회 수정 삭제
    path('article/<int:article_id>/like',views.like_article), #게시글 좋아요
    
    #comment
    path('article/<int:article_id>/comment', views.comment), # 게시글에 달린 댓글 조회, 게시글에 댓글 작성
    path('article/<int:article_id>/<int:parent_id>/comment', views.comment), #대댓글 작성
    
    path('comment/<int:comment_id>', views.comment), #댓글 수정, 삭제
    path('comment/<int:comment_id>/like',views.like_comment), #댓글 좋아요

    #tag
    path('tag', views.tag_list), #전체 태그 조회
    path('tag/<str:search_tag>', views.tag_list), #태그 목록 조회
    path('tag-articles', views.tag_articles), #태그의 게시글 조회

]