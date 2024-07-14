from django.db import models

from quizzes.models.question import Question


class Choice(models.Model):
    question = models.ForeignKey(Question,related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
