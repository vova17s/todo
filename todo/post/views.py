from django.contrib.auth.mixins import PermissionRequiredMixin
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView, UpdateView

from .forms import CreatePostForm
from .models import Post


class CreatePostView(PermissionRequiredMixin, CreateView):
    model = Post
    form_class = CreatePostForm
    template_name = 'post/create_post.html'
    title_page = 'Создать пост'
    success_url = reverse_lazy('home')
    permission_required = 'todo.add_post'
    
    def form_valid(self, form):
        post = form.save(commit=False)
        post.user_id = self.request.user
        return super().form_valid(form)


class AllPostView(ListView):
    template_name = 'post/all_post.html'
    title_page = 'Все посты'
    context_object_name = 'posts'
    paginate_by = 20

    
    def get_queryset(self):
        return Post.objects.all()


class DetailPostView(DetailView):
    template_name = 'post/detail_post.html'
    context_object_name = 'posts'
    slug_url_kwarg = 'post_id'
    
    
    def get_object(self, queryset = None):
        return get_object_or_404(Post.objects.all(), id=self.kwargs[self.slug_url_kwarg])


class UpdateTaskView(PermissionRequiredMixin, UpdateView):
    template_name = 'post/update_post.html'
    model = Post
    fields = ('title', 'description', 'preview')
    success_url = reverse_lazy('home')
    title_page = 'Редактирование поста'
    permission_required = 'todo.update_post'
    
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
