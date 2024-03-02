import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializer import *
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

# This is a temporary function, just a place holder.


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def questions(request):
    quiz = Quiz.objects.get(user_id=User.objects.last())
    round_ = Round.objects.get(quiz_id=quiz)
    time = round_.time
    questions = Question.objects.filter(round_id=round_)
    serializer = ClientQuestionSerializer(questions, many=True)
    data = {'questions': serializer.data, 'time': time, 'round': round_.index}
    return JsonResponse(data, safe=False)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def quizzes(request):
    quizzes = Quiz.objects.filter(user_id=request.user)
    serializer = HostQuizListSerializer(quizzes, many=True)
    data = {'quizzes': serializer.data}
    return JsonResponse(data, safe=False)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def createQuiz(request):
    new_quiz = Quiz(title="New Quiz", user_id=request.user)
    new_quiz.save()
    return Response({'Status': 'Success'})


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def deleteQuiz(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    quiz_id = body['id']
    quiz = Quiz.objects.get(id=quiz_id)
    quiz.delete()
    return Response({'Status': 'Success'})


class HomeView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {
            'message': 'Success'}
        return Response(content)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
