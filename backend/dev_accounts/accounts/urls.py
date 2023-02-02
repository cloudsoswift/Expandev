from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration', include('dj_rest_auth.registration.urls')),
    path('check-email/<str:email>', views.check_duplicate_email),
    path('check-nickname/<str:nickname>', views.check_duplicate_nickname),
    path('userlist', views.userlist),
    path('userchange', views.userchange),
    path('profile/image', views.set_profile_image),
    path('user/<int:user_id>/profile', views.get_user_profile),
    path('user/<int:user_id>/blogs', views.get_user_blogs),
    path('user/<int:user_id>/roadmaps', views.get_user_roadmaps),
]
