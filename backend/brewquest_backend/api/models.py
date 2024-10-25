from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

# This model may be unnecessary, I guess we will see


class Host(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # nickname = models.CharField(max_length=255)


class Quiz(models.Model):
    # id pk is automatically created by django

    # Name of the quiz
    title = models.CharField(max_length=255)
    # Last time the quiz was edited
    last_changed = models.DateTimeField()
    # user the quiz belongs to
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Title: {self.title}, Last Changed: {self.last_changed}, User: {self.user_id}"

    def save(self, *args, **kwargs):
        self.last_changed = timezone.now()
        return super().save(*args, **kwargs)


class Round(models.Model):
    # id pk is created automatically by django

    # round number
    index = models.IntegerField()
    #
    last_changed = models.DateTimeField()
    # round name
    title = models.CharField(max_length=255)
    # E.g Geography, science, general knowledge etc
    topic = models.CharField(max_length=255)
    # the id of this quiz this round belongs to, round is deleted if quiz is deleted
    quiz_id = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    # Should be sum of question times
    time = models.IntegerField()

    def __str__(self):
        return f"Index: {self.index}, Title: {self.title}, Topic: {self.topic}, Last Changed: {self.last_changed}, Quiz: {self.quiz_id}"

    def save(self, *args, **kwargs):
        self.last_changed = timezone.now()
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        index = self.index
        quiz = self.quiz_id
        return_value = super().delete(*args, **kwargs)
        for r in list(Round.objects.filter(quiz_id=quiz)):
            if r.index > index:
                r.index = r.index - 1
                r.save()
        return return_value


class Question(models.Model):
    # id pk is auto generated by django

    # question number
    index = models.IntegerField()
    #
    last_changed = models.DateTimeField()
    #
    prompt = models.CharField(max_length=255)
    #
    answer = models.CharField(max_length=255)
    #
    round_id = models.ForeignKey(Round, on_delete=models.CASCADE)
    # how many seconds the question should take to answer
    time = models.IntegerField()

    def updateRoundTime(self):
        list_of_questions = list(
            Question.objects.filter(round_id=self.round_id))
        total_time = 0
        for question in list_of_questions:
            total_time += question.time
        self.round_id.time = total_time
        self.round_id.save()

    def save(self, *args, **kwargs):
        return_value = super().save(*args, **kwargs)
        self.updateRoundTime()
        self.last_changed = timezone.now()
        return return_value

    def delete(self, *args, **kwargs):
        index = self.index
        round_id = self.round_id
        return_value = super().delete(*args, **kwargs)
        self.updateRoundTime()
        
        for q in list(Question.objects.filter(round_id=round_id)):
            if q.index > index:
                q.index = q.index - 1
                q.save()

        return return_value

    def __str__(self):
        return f"Index: {self.index}, Prompt: {self.prompt}, Answer: {self.answer}, Last Changed: {self.last_changed}, Round: {self.round_id}"


class Game(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    pin = models.IntegerField()
    # There will be something here for the websocket-y stuff.

    def __str__(self):
        return f"User: {self.user_id}, Pin: {self.pin}"
    


