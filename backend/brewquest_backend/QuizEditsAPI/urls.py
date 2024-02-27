from django.urls import path
from . import views


urlpatterns = [
    path('get-questions/', views.get_questions, name='get-questions'),
]