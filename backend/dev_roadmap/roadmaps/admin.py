from .models import Track, Node, RecommendContent, Interview, Completion, Review
from django.contrib import admin

admin.site.register([Track, Node, RecommendContent, Interview, Completion, Review])