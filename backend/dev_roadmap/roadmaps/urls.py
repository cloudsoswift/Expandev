from . import views

from django.urls import path

urlpatterns = [
    path('track/<int:track_id>', views.get_track),
    path('node/<int:node_id>', views.get_node),
    path('node/<int:node_id>/clear', views.clear_node),
    path('review', views.node_review),
    path('review/<int:review_id>', views.node_review),
    path('review/<int:review_id>/like', views.like_node_review),
    path('roles', views.get_roles),
    path('roles/<int:role_id>',views.get_roles_situation),
]
