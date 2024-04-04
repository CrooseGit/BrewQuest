from django.urls import path
from . import views

urlpatterns = [
    path('getLobbyPlayerStates/', views.getLobbyPlayerStates, name='getLobbyPlayerStates'),
    path('joinGame/', views.joinGame, name='joinGame'),
    path('playerLeftLobby/', views.playerLeftLobby, name='playerLeftLobby'),
    path('createRoom/', views.createRoom, name='createRoom'),
    path('deleteRoom/', views.deleteRoom, name='deleteRoom'),
    path('getQuizInfo/', views.getQuizInfo, name='getQuizInfo'),
    path('updateRoundData/', views.updateRoundData, name='updateRoundData'),
    path('clientGetRound/', views.clientGetRound, name='clientGetRound'),
    path('getLeaderboard/', views.getLeaderboard, name='getLeaderboard'),
]