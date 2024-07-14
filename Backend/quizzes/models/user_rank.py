from django.db import models
from django.db.models import Sum
from django.db.models.signals import post_save
from django.dispatch import receiver

from authapi.models import User
from quizzes.models.quiz_submission import QuizSubmission


class UserRank(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey('quizzes.Quiz', on_delete=models.CASCADE)
    rank = models.IntegerField(null=True, blank=True)
    total_score = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.rank}, {self.user.name}, {self.quiz.title}"
