from datetime import timedelta

from django.core.exceptions import ValidationError
from django.utils import timezone


class QuizValidator:
    @staticmethod
    def validate_starting_time(value):
        if value <= timezone.now():
            raise ValidationError("The starting time must be in the future.")
