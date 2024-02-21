from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
# Create your views here.


@api_view(['GET'])
def questions(request):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    return Response({'questions': [
        'What is the capital of Switzerland?',
        'Who is the reigning monarch of the U.K?',
        'Why did the chicken cross the road?',
        'Who was the 44th president of the U.S?',
        "Who directed the movie 'The Hangover'?", "time of response "+current_time]})
