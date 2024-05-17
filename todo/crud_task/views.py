from datetime import date

from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from task.models import Task

from .serializer import TaskModelSerializer


@extend_schema(tags=["List_Task"])
class TaskListAPIView(ListAPIView):
    queryset = Task.objects.all()
    serializer_class=TaskModelSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ["id", "title", "plane_finished_time"]
    filterset_fields = ["id", "user_id", "plane_finished_time"]

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")
        plane_finished_date_str = self.request.query_params.get("plane_finished_time")

        if not user_id or not plane_finished_date_str:
            return Task.objects.all()

        plane_finished_date = date(
            year=int(plane_finished_date_str[:4]),
            month=int(plane_finished_date_str[5:7]),
            day=int(plane_finished_date_str[8:10])
        )

        print(plane_finished_date)

        return Task.objects.filter(
            user_id=user_id,
            plane_finished_time__day=plane_finished_date.day,
            plane_finished_time__month=plane_finished_date.month,
            plane_finished_time__year=plane_finished_date.year
        ).order_by("plane_finished_time")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'tasks': serializer.data,
        })
    
@extend_schema(tags=["Task"])
class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class  = TaskModelSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ["id", "title", "plane_finished_time"]
    filterset_fields = ["id", "user_id", "plane_finished_time"]
    