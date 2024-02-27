from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question

@api_view(['GET'])
def get_questions(request):
   
    serialized_questions = [{"num": q.num, "question": q.question, "answer": q.answer} for q in Question.objects.all()]
    return Response({'message': serialized_questions})

def delete_all_questions(request):
    Question.objects.all().delete()
@api_view(['POST'])
def add_all_questions(request):
    Question.objects.create(num=request.data['num'], question=request.data['question'], answer=request.data['answer'])



