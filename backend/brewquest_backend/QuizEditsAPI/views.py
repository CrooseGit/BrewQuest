from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello fucking world!!!! api established'})

@api_view(['GET'])
def get_questions(request):
    return Response({'message': [{"num":1, "question":"what is the capital of greece?", "answer":"athens"}, {"num":2, "question":"what is the capital of spain?", "answer":"madrid"}]})


@api_view(['POST'])
def add_question(request):
    return Response({'message': 'Hello fucking world!!!! api established'})