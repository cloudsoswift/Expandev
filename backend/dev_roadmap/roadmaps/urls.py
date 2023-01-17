from . import views

from django.urls import path

urlpatterns = [
    path('<int:track_id>', views.get_track),
    path('<int:node_id>/node', views.get_node),
    path('<int:node_id>/node/clear', views.clear_node),
]
