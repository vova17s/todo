from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    path("api/v1/crud/", include("crud_task.urls")),
    path("accounts/", include("allauth.urls")),
    path("post/", include("post.urls")),
    path("task/", include("task.urls")),
    path("user/", include("user.urls")),
    path("", include("pages.urls")),
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.MEDIA_ROOT,
        },
    ),
]

urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


