from django.db.models import (
    Model,
    CharField,
    SlugField,
    UUIDField,
    TextField,
    ForeignKey,
    CASCADE,
)


class Room(Model):
    slug = SlugField(unique=True)
    room_name = CharField(max_length=100, null=True, blank=True)


class Message(Model):
    chat_room = ForeignKey(Room, CASCADE, related_name="messages")
    message = TextField(null=True, blank=True)
