from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import TaskListAPIView, TaskViewSet

router = SimpleRouter()

router.register("task",TaskViewSet)

urlpatterns = [
    path("list/", TaskListAPIView.as_view(), name="task_list")
]

urlpatterns += router.urls