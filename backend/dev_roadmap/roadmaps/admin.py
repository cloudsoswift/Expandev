from .models import Track, Node, RecommendContent, Interview, Review, Role
from django.contrib import admin

admin.site.register([Track, Node, RecommendContent, Interview, Review, Role])