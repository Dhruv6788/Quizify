from django.db import models

from profiles.models import Profile


class Subject(models.Model):
    name = models.CharField(max_length=200)
    subject_code = models.CharField(max_length=50, unique=True)
    teacher = models.ForeignKey('profiles.Profile', related_name='created_subject', limit_choices_to={'role': Profile.TEACHER}, on_delete=models.CASCADE)
    students = models.ManyToManyField('profiles.Profile', related_name='subjects', limit_choices_to={'role': Profile.STUDENT})
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Subjects'

    def __str__(self):
        return self.name
