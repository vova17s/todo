from django.urls import path

from . import views

urlpatterns = [
    path('create_post', views.CreatePostView.as_view(), name='create_post'),
    path('', views.AllPostView.as_view(), name='posts'),
    path('all_posts/<uuid:post_id>', views.DetailPostView.as_view(), name='detail_post'),
    path('update_post/<uuid:pk>', views.UpdateTaskView.as_view(), name='update_post')
]
