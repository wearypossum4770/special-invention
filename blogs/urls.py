from django.urls import path
from users.views import public_home


urlpatterns = (
    path('', public_home, name="blog-home"),
)
