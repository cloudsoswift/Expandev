from .models import Track, Node, RecommendContent, Interview, Completion
from django.contrib import admin

admin.site.register([Track, Node, RecommendContent, Interview, Completion])