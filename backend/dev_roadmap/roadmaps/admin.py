from .models import Track, Node, RecommendContent, Interview, Review
from django.contrib import admin

admin.site.register([Track, Node, RecommendContent, Interview, Review])