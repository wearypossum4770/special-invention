from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def chat_box(request, chat_box_name):
    context = {"title": "", "chat_box_name": chat_box_name}
    return render(request, "chats/chatbox.html", context)


@login_required
def room(request, room_name):
    context = {"room_name": room_name}
    return render(request, "chats/room.html", context)


def index(request):
    return render(request, "chats/chatbox.html")
