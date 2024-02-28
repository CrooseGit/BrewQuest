from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from .models import *
from django.http import JsonResponse
from .serializer import *
# Create your views here.

# This is a temporary function, just a place holder.


@api_view(['GET'])
def questions(request):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    quiz = Quiz.objects.get(user_id=User.objects.last())
    round_ = Round.objects.get(quiz_id=quiz)
    time = round_.time
    questions = Question.objects.filter(round_id=round_)
    print(questions)
    serializer = ClientQuestionSerializer(questions, many=True)
    data = {'questions': serializer.data, 'time': time}
    return JsonResponse(data, safe=False)