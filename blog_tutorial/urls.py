from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, register_converter


class FourDigitYearConverter:
    regex = "[0-9]{4}"

    def to_python(self, value):
        return int(value)

    def to_url(value):
        return f"{value:04d}"


register_converter(FourDigitYearConverter, "yyyy")

# path("articles/<yyyy:year>/", views.year_archive),

urlpatterns = (
    path("chat/", include("chats.urls")),
    path("admin/", admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', include('blogs.urls')),
    path('', include('users.urls')),
)


if settings.DEBUG:
    urlpatterns += tuple(static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))

