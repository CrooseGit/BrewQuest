from django.shortcuts import render
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializer import *
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

# Create your views here.

# TRY NOT TO MAKE ANY CHANGES TO DATA HELD IN API APP TABLES/MODELS IN THIS APPLICATION
# GET REQUESTS ARE FINE THOUGH
''' 
    if len(room_ids)>1:
        for room in room_ids[1:]:
            room.delete()
'''

@api_view(['POST'])
@permission_classes((AllowAny, ))  
def playerLeftLobby(request):
    """
    Removes a player from a lobby.

    This function is an API view that handles a POST request to remove a player from a lobby. It expects a JSON payload in the request body containing the following fields:
    - pin: The pin of the room where the player is located.
    - playername: The name of the player to be removed.

    If the room with the given pin does not exist, it returns a JSON response with the status 'failed' and the message 'Room does not exist'. If the player with the given name does not exist in the room, it returns a JSON response with the status 'failed' and the message 'Player does not exist in room'. Otherwise, it deletes the player from the room and returns a JSON response with the status 'success' and the message 'Player left room'.

    Parameters:
    - request: The HTTP request object.

    Returns:
    - JsonResponse: A JSON response indicating the status and message of the operation.

    Permissions:
    - AllowAny: This view allows any user to access it.

    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    room_id = Room.objects.filter(pin=body['pin'])
    if not room_id.exists():
        return JsonResponse({'status': 'failed', 'message': 'Room does not exist'})
    player_id = Player.objects.filter(playername=body['playername'], room_id=room_id[0])
    if player_id.count() == 0:
        return JsonResponse({'status': 'failed', 'message': 'Player does not exist in room'})
    else:
        player_id.delete()
        return JsonResponse({'status': 'success', 'message': 'Player left room'})


@api_view(['POST'])
@permission_classes((AllowAny, ))    
def getLobbyPlayerStates(request):
    """
    Get the states of players in the lobby based on the given pin in request data.
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    room_id = Room.objects.filter(pin=body['pin'])
    if not room_id.exists():
        return JsonResponse({'status': 'failed', 'message': 'Room does not exist'})
    player_ids = Player.objects.filter(room_id = room_id[0])
    
    # if there are players in the lobby
    if player_ids:
        serializer = PlayerBaseSerializer(player_ids,many=True) # playernames, scores
        data = {'status': 'success','playerScores': serializer.data}
    # if there are no players in the lobby   
    else:
        data={'status': 'failed', 'message': 'Room does not exist or no players in lobby'}
    return JsonResponse(data, safe=False)
    
    

@api_view(['POST'])
@permission_classes((AllowAny, ))
def joinGame(request):
    """
A view for joining a game. It takes a POST request with the pin and playername in the body. 
If the room with the provided pin exists, it adds the player to the room and returns a JSON response with the list of players in the room. 
If the room does not exist, it returns a JSON response with a failure message.

Parameters:
- `request` (HttpRequest): The HTTP request object.

Returns:
- `JsonResponse`: A JSON response with a status key and a message key. If the status is 'success', the message key contains 
a list of players in the room. If the status is 'failed', the message key contains a failure message.

Permissions:
    - AllowAny: This view allows any user to access it.
"""
   
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    pin = body['pin']
    playername = body['playername']


    room_id = Room.objects.filter(pin=pin)
    if not room_id.exists():
        return JsonResponse({'status': 'failed', 'message': 'Room does not exist'})
    
    player = Player.objects.create(playername=playername,score=0,room_id=room_id[0])
    playersInGame = Player.objects.filter(room_id=room_id[0])
    serializer = PlayerBaseSerializer(playersInGame,many=True)
    data = {'status': 'success', 'players': serializer.data}
    return JsonResponse(data, safe=False)
        

