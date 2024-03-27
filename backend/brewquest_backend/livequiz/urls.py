from django.urls import path
from . import views

urlpatterns = [
    path('getLobbyPlayerStates/', views.getLobbyPlayerStates, name='getLobbyPlayerStates'),
    path('joinGame/', views.joinGame, name='joinGame'),
    path('playerLeftLobby/', views.playerLeftLobby, name='playerLeftLobby'),
]