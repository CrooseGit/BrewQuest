# This is for all the data serializers, it converts database output into json format.

from rest_framework import serializers
from .models import *


class ClientQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['index', 'prompt']


class HostQuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['title', 'id']
