from django.shortcuts import render
from django.contrib.auth import get_user_model

User = get_user_model()


def public_home(request):
    context = {"title": "Home page"}
    return render(request, 'users/home.html', context)
# def registration(request):
#     context = {}
#     user = User.objects.create_user
