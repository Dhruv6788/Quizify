from django.db import models


class Question(models.Model):
    quiz = models.ForeignKey('quizzes.Quiz', related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    point = models.IntegerField(default=1)
    multiple_answer = models.BooleanField(default=False)

    def __str__(self):
        return self.text[:50]
