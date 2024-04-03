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

# ---------------------------------------

# Player Views -------------------
@api_view(['POST'])
@permission_classes((AllowAny, ))
def clientGetRound(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    
    round_id = body['round_id']
    pin = body['pin']
    

    r = Round.objects.get(id=round_id)
    room = Room.objects.get(pin=pin)


    
    questions = Question.objects.filter(round_id=round_id)
    q_serializer = HostQuestionSerializer(questions, many=True)
    r_serializer = RoundSerializer(r);
    
    data = {'round' :r_serializer.data, 'questions':q_serializer.data, 'end_time':room.round_end_time}
    return JsonResponse(data, safe=False)

@api_view(['POST'])
@permission_classes((AllowAny, ))  
def playerLeftLobby(request):
    """
    Removes a player from a lobby.

    This function is an API view that handles a POST request to remove a player from a lobby. 
    It expects a JSON payload in the request body containing the following fields:
    - pin: The pin of the room where the player is located.
    - playername: The name of the player to be removed.

    If the room with the given pin does not exist, it returns a JSON response with the status 'failed'
      and the message 'Room does not exist'. If the player with the given name does not exist in the room, 
      it returns a JSON response with the status 'failed' and the message 'Player does not exist in room'. 
      Otherwise, it deletes the player from the room and returns a JSON response with the status 'success' and the message 'Player left room'.

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
    #if player_ids:
    serializer = PlayerBaseSerializer(player_ids,many=True) # playernames, scores
    data = {'status': 'success','playerScores': serializer.data}
    # if there are no players in the lobby   
    # else:
    #     data={'status': 'failed', 'message': 'Room does not exist or no players in lobby'}
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

@api_view(['POST'])
@permission_classes((AllowAny, ))
def getQuizInfo(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    pin = body['pin']
    playername = body['playername']
    room_id = Room.objects.filter(pin=pin)

    if not room_id.exists():
        return JsonResponse({'status': 'failed', 'message': 'Room does not exist'})
    
    quiz = Room.objects.filter(pin=pin)[0].quiz_id
    
    print("QUIZ_ID "+str(quiz.id))
    round_ids = Round.objects.filter(quiz_id=quiz)
    r_serializer = RoundIDSerializer(round_ids, many=True)
    r_array = list(map(lambda x : x['id'],r_serializer.data))
    data = {'status': 'success', 'id': quiz.id, 'round_ids':r_array}
    return JsonResponse(data, safe=False)

# ---------------------------------------

# Host Views -------------------

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createRoom(request):
    # request.body = {"quiz_id": 1, "room_name": "test", pin: <quiz_id>+"_"+<round_id>}
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print("Request user")
    print(request.user)
    # checks if quiz exists
    if not Quiz.objects.filter(id=body["quiz_id"]).exists():
        return JsonResponse({'status': 'failed', 'message': 'Quiz does not exist', 'data': "NoQuizFound"})
    quiz_id = Quiz.objects.get(id=body["quiz_id"])
    round_id = Round.objects.filter(quiz_id=quiz_id,index = 0)[0]
    questions = Question.objects.filter(round_id=round_id)
    # checks if there are questions to answer
    # TODO: make sure that if there are more than one round, then these extra rounds only 
    #       play if there are questions in the next round others skip to next round until end of game reached
    if questions.count() == 0:
        return JsonResponse({'status': 'failed', 'message': 'Round does not exist', 'data': "NoQuestionsFound"})
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        quiz_id = Quiz.objects.get(id=body["quiz_id"])
        round_id = Round.objects.filter(quiz_id=quiz_id,index = 0)
        if Host.objects.filter(user_id=request.user.id).count()==0:
            Host.objects.create(user_id=request.user.id)
        host_id = Host.objects.get(user_id=request.user.id)
        # Delete rooms if rooms by same name exists
        if (Room.objects.filter(pin=body["pin"]).count()!=0):
            Room.objects.delete(pin=body["pin"])
        Room.objects.create(pin=body["pin"], host_id=host_id, 
                            quiz_id = quiz_id, round_id= round_id[0], round_end_time=timezone.now())
        return JsonResponse({'status': 'success', 'message': 'Room created'})
    except Exception as e:
        return JsonResponse({'status': 'failed', 'message': str(e), "issue_where":"creatingRoom"})


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def deleteRoom(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    room_id = Room.objects.filter(pin=body['pin'])
    if room_id.count() == 0:
        return JsonResponse({'status': 'failed', 'message': 'Room does not exist'})
    host_id = Host.objects.filter(user_id=request.user.id)
    if host_id.count() == 0:
        return JsonResponse({'status': 'failed', 'message': 'Host does not exist'})
    else:
        host_id = host_id[0]
        host_id.delete()
    room_id.delete()
    return JsonResponse({'status': 'success', 'message': 'Room deleted'})

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def updateRoundData(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    room = Room.objects.get(pin= body["pin"])
    quiz = room.quiz_id
    r = Round.objects.filter(quiz_id=quiz)[body["roundIndex"]]
    room.round_end_time = timezone.now()  + timezone.timedelta(seconds=r.time)
    print("round end time")
    print(room.round_end_time)
    room.round_id = r
    room.save()
    
    return JsonResponse({'status': 'success'})


