from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render

from chats.models import Chat, Contact

User = get_user_model()


def chat_box(request, chat_box_name):
    context = {"title": "", "chat_box_name": chat_box_name}
    return render(request, "chats/chatbox.html", context)


# @login_required
def room(request, room_name):
    context = {"room_name": room_name}
    return render(request, "chats/room.html", context)


def index(request):
    return render(request, "chats/chatbox.html")




def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)