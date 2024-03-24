
from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('createQuiz/', views.createQuiz, name='createQuiz'),
    path('deleteQuiz/', views.deleteQuiz, name='deleteQuiz'),
    path('quizzes/', views.quizzes, name='quizzes'),
    path('home/', views.HomeView.as_view(), name='home'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('change_username/<int:pk>', views.changeName, name='change_username'),
    path('change_email/<int:pk>', views.changeEmail, name='change_email'),
    path('check_password/<int:pk>', views.checkPassword, name='check_password'),
    path('change_password/<int:pk>', views.changePassword, name='change_password'),
]
