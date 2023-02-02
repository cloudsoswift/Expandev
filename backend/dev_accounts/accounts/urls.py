from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration', include('dj_rest_auth.registration.urls')),
    path('userlist', views.userlist),
    path('userchange', views.userchange),
    path('profile/image', views.set_profile_image),
    path('user/<str:nickname>/profile', views.get_user_profile),
    path('user/<str:nickname>/blogs', views.get_user_blogs),
    path('user/<str:nickname>/roadmaps', views.get_user_roadmaps),
]
