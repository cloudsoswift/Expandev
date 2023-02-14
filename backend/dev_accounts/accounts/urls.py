from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration', include('dj_rest_auth.registration.urls')),
    path('check-email/<str:email>', views.check_duplicate_email),
    path('check-nickname/<str:nickname>', views.check_duplicate_nickname),
    path('userlist', views.userlist),
    path('userchange', views.userchange),
    path('profile', views.set_profile),
    path('user/<str:nickname>/profile', views.get_user_profile),
    path('user/<str:nickname>/blogs', views.get_user_blogs),
    path('user/<str:nickname>/roadmaps', views.get_user_roadmaps),
    path('login/kakao/', views.kakao_login),
    path('login/kakao/callback/', views.kakao_call_back),
    path('login/kakao/token/<str:login_type>/<str:code>', views.get_kakao_token),
    path('verify/token/refresh/cookie', views.verify_refresh_token_in_cookie),
    path('cookie/login', views.include_refresh_token_in_cookie),
    path('cookie/logout/', views.logout),
    path('test/<access_token>/<refresh_token>', views.test),
    path('login/naver/', views.naver_login),
    path('login/naver/token/<str:code>', views.naver_callback),
    path('naver/info/<str:access_token>', views.naver_info),
]
