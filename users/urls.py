from django.urls import path
from users.views import public_home
from django.contrib.auth.views import LoginView


urlpatterns = (
    path('login/',LoginView.as_view(template_name="users/login.html"), name='login'),
    path('', public_home, name="user-home"),
)
