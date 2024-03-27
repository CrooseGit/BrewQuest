

from rest_framework import serializers
from .models import *

class PlayerBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['playername', 'score']