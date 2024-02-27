from django.urls import path
from . import views

urlpatterns = [
    path('get-questions/', views.get_questions, name='get-questions'),
    path("delete-all-questions/", views.delete_all_questions, name="delete-all-questions"),
    path("add-all-questions/", views.add_all_questions, name="add-all-questions"),
]