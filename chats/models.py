from django.contrib.auth import get_user_model
from django.db.models import (CASCADE, CharField, DateTimeField, ForeignKey,
                              ManyToManyField, Model, SlugField, TextField,
                              UUIDField)

User = get_user_model()
fields = {
  'blank': True,
  'null':True,
}
class Room(Model):
    slug = SlugField(unique=True)
    room_name = CharField(max_length=100, **fields)

class Contact(Model):
    user = ForeignKey(User, related_name='friends', on_delete=CASCADE)
    friends = ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username


class Message(Model):
    contact = ForeignKey(Contact, related_name='messages', on_delete=CASCADE, **fields)
    content = TextField(**fields)
    timestamp = DateTimeField(auto_now_add=True)
    chat_room = ForeignKey(Room, CASCADE, related_name="messages", **fields)

    def __str__(self):
        return self.contact.user.username


class Chat(Model):
    participants = ManyToManyField(Contact, related_name='chats', blank=True)
    messages = ManyToManyField( Message, blank=True)

    def __str__(self):
        return f"{self.pk}"