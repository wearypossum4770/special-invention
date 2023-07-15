import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model

from chats.models import Chat, Contact, Message
from chats.views import (get_current_chat, get_last_10_messages,
                         get_user_contact)

User = get_user_model()


def command_switch(command):
    pass


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    def fetch_messages(self, data):
        messages = get_last_10_messages(data['chatId'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    async def receive(self, text_data):
        session = self.scope["session"]
        print(session)
        text_data_json = json.loads(text_data)
        username, message = text_data_json.get("username"), text_data_json.get(
            "message"
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "username": username,
                "type": "chat_message",
                "message": message,
                "is_logged_in": False,
            },
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))