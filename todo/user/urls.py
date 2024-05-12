from django.urls import path

from . import views

urlpatterns = [
    path('profile/<int:user_id>', views.ProfileDetailView.as_view(), name='detail_profile'),
]
