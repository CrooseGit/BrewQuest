
from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('createQuiz/', views.createQuiz, name='createQuiz'),
    path('deleteQuiz/', views.deleteQuiz, name='deleteQuiz'),
    path('duplicateQuiz/', views.duplicateQuiz, name='duplicateQuiz'),
    path('quizzes/', views.quizzes, name='quizzes'),
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout')
]
