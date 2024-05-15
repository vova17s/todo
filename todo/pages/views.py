from typing import Any

from django.views.generic import TemplateView


class HomepageView(TemplateView):
    template_name = "homepage.html"

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        data = super().get_context_data(**kwargs)
        data["request"] = self.request
        return data