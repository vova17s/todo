from django.urls import path

from . import views

urlpatterns = [
    path('create_task', views.CreateTaskView.as_view(), name='create_task'),
    path('', views.AllTaskView.as_view(), name='all_task'),
    path('all_tasks/<uuid:task_id>', views.DetailTaskView.as_view(), name='detail_task'),
    path('update_task/<uuid:pk>', views.UpdateTaskView.as_view(), name='update_task')
]