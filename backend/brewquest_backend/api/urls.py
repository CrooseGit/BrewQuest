
from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('quizzes/', views.quizzes, name='quizzes'),
]
