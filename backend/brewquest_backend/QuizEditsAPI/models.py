from django.db import models

# Create your models here.
class Question(models.Model):
    num = models.IntegerField()
    question = models.CharField(max_length=80)
    answer = models.CharField(max_length=80)