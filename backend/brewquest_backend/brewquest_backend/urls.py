"""
URL configuration for brewquest_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.core.paginator import Paginator
from django.http import JsonResponse
from . import Quiz
from . import QuizSerializer

def paginated_quiz_list(request):
    all_quizzes = Quiz.objects.all()
    paginator = Paginator(all_quizzes, 10)  # Show 10 quizzes per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    serializer = QuizSerializer(page_obj, many=True)
    
    return JsonResponse(serializer.data, safe=False)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('quizzes/', paginated_quiz_list, name='paginated_quiz_list')
]
