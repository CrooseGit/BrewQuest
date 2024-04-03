

from rest_framework import serializers
from .models import *

class PlayerBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['playername', 'score']

class RoundIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = ['id']

class HostQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['prompt', 'answer','id','index','time']
        
class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = ['id', 'index', 'title', 'topic', 'time']