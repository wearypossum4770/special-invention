# chats/consumers.py
import json
from django.contrib.auth import get_user_model
from channels.generic.websocket import AsyncWebsocketConsumer

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        session = self.scope["session"]
        print(session)
        session.save()
        text_data_json = json.loads(text_data)
        username, message = text_data_json.get("username"), text_data_json.get("message")
        
        await self.channel_layer.group_send(
            self.room_group_name, {
                "username":username,
                "type": "chat_message",
                "message": message,
                "is_logged_in": False,
                }
        )

    async def chat_message(self, event):
        message = event["message"]

        await self.send(text_data=json.dumps({"message": message}))
