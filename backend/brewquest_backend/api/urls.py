
from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('quizInfo/', views.quizInfo, name='quizInfo'),
    path('questionsAndAnswers/', views.questionsAndAnswers,
         name='questionsAndAnswers'),
    path('createQuiz/', views.createQuiz, name='createQuiz'),
    path('createRound/', views.createRound, name='createRound'),
    path('createQuestion/', views.createQuestion, name='createQuestion'),
    path('updateQuestion/', views.updateQuestion, name='updateQuestion'),
    path('deleteQuestion/', views.deleteQuestion, name='deleteQuestion'),
    path('deleteRound/', views.deleteRound, name='deleteRound'),    
    path('updateRoundName/', views.updateRoundName, name='updateRoundName'),
    path('updateQuizName/', views.updateQuizName, name='updateQuizName'),
    path('register/', views.register, name='register'),
    path('deleteQuiz/', views.deleteQuiz, name='deleteQuiz'),
    path('duplicateQuiz/', views.duplicateQuiz, name='duplicateQuiz'),
    path('quizzes/', views.quizzes, name='quizzes'),
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout')
]
