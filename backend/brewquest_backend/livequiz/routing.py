from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.urls import re_path
from .consumers import TextRoomConsumer
from channels.auth import AuthMiddlewareStack
websocket_urlpatterns = [
    re_path(r'^ws/(?P<room_name>[^/]+)/$', TextRoomConsumer.as_asgi()),
]
# the websocket will open at 127.0.0.1:8000/ws/<room_name>
application = ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),


})