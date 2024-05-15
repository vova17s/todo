from typing import Any

from django.contrib.auth.mixins import PermissionRequiredMixin
from django.db.models.base import Model as Model
from django.db.models.query import QuerySet
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView, UpdateView

from .forms import CreateTaskForm
from .models import Task


class CreateTaskView(CreateView):
    model = Task
    form_class = CreateTaskForm
    template_name = 'task/create_task.html'
    title_page = 'Создать задачу'
    success_url = reverse_lazy('home')
    permission_required = 'todo.add_task'

    
    def form_valid(self, form):
        task = form.save(commit=False)
        task.user_id = self.request.user
        return super().form_valid(form)


class AllTaskView(ListView):
    template_name = 'tasks.html'
    title_page = 'Все задачи'
    context_object_name = 'tasks'
    paginate_by = 20
    
    def get_queryset(self) -> QuerySet[Any]:
        return Task.objects.all()


class DetailTaskView(DetailView):
    template_name = 'task/detail_task.html'
    context_object_name = 'task'
    slug_url_kwarg = 'task_id'
    
    
    def get_object(self, queryset = None) -> Model:
        return get_object_or_404(Task.objects.all(), id=self.kwargs[self.slug_url_kwarg])


class UpdateTaskView(PermissionRequiredMixin, UpdateView):
    template_name = 'task/update_task.html'
    model = Task
    fields = ('title', 'description', 'plane_finished_time')
    success_url = reverse_lazy('home')
    title_page = 'Редактирование задачи'
    permission_required = 'todo.update_task'
    def user_passes_test(self, request):
        if request.user.is_authenticated:
            self.object = self.get_object()
            return self.object.created_by == request.user
        return False
    
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return super(UpdateTaskView, self).dispatch(request, *args, **kwargs)
        elif not self.user_passes_test(request):
            return redirect("home")
        return super(UpdateTaskView, self).dispatch(request, *args, **kwargs)
    # def get_queryset(self) -> QuerySet[Any]:
    #     return get_object_or_404(Task.objects.all(), user_id=self.kwargs[self.])