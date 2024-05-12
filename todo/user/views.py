from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import DetailView, UpdateView

from .models import User


class ProfileDetailView(DetailView):
    template_name = 'user/profile_detail.html'
    context_object_name = 'user'
    slug_url_kwarg = 'user_id'
    
    
    def get_object(self, queryset = None):
        return get_object_or_404(User.objects.all(), id=self.kwargs[self.slug_url_kwarg])


class ProfileUpdateView(UpdateView):
    template_name = 'user/update_user.html'
    model = User
    fields = (
        'username', 'first_name', 'last_name', 'avatar'
        )
    success_url = reverse_lazy('detail_profile')