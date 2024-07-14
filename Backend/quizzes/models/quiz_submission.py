from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models, transaction
from django.utils.text import slugify

from profiles.models import Profile
from quizzes.models import Quiz, Question, Choice
from django.core.exceptions import ObjectDoesNotExist


def validate_answers(value):
    if not isinstance(value, list):
        raise ValidationError("Answers must be a list.")
    for answer in value:
        if not isinstance(answer, dict) or 'question' not in answer or 'choices' not in answer:
            raise ValidationError("Each answer must be a dictionary with 'question' and 'choices' keys.")
        if not isinstance(answer['choices'], list):
            raise ValidationError("The 'choices' value must be a list.")


class QuizSubmission(models.Model):
    profile = models.ForeignKey('profiles.Profile', on_delete=models.CASCADE,
                                limit_choices_to={'role': Profile.STUDENT})
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.IntegerField(validators=[MinValueValidator(0)], default=0)  # score cannot be negative
    submission_time = models.DateTimeField(auto_now_add=True)

    # answers is a JSON field that can store the user’s answers.
    answers = models.JSONField(validators=[validate_answers])
    submission_slug = models.SlugField(unique=True, blank=True)

    class Meta:
        unique_together = ('quiz', 'profile')  # The unique_together option is used to ensure that each user can only
        # have one submission for each quiz.

    def __str__(self):
        return f'{self.profile.user.name} - {self.quiz.title}'

    def save(self, *args, **kwargs):
        is_new = self.pk is None  # Check if it's a new instance
        if is_new:
            self.submission_slug = slug = slugify(self.quiz.title[:3] + str(self.id))
            while QuizSubmission.objects.filter(submission_slug=slug).exists():
                slug = "{}-{}".format(slug, QuizSubmission.objects.filter(submission_slug__startswith=slug).count())
            self.submission_slug = slug
        super().save(*args, **kwargs)  # Save after all fields are set

    @transaction.atomic
    def calculate_score(self):

        submission = QuizSubmission.objects.select_for_update().get(id=self.id)
        """
        in above line The select_for_update() method is a queryset method in Django that locks the selected database 
        rows until the end of your database transaction. This is useful when you want to prevent other transactions from
        changing the selected rows while your transaction is in progress.
        """

        score = 0

        # Check if self.answers is a list
        if not isinstance(self.answers, list):
            self.score = score
            self.save()
            raise ValidationError("Answers should be a list.")

        for answer in self.answers:
            # Check if answer is a dictionary with 'question' and 'choices' keys
            if not isinstance(answer, dict) or 'question' not in answer or 'choices' not in answer:
                continue

            # Check if 'choices' is a list
            if not isinstance(answer['choices'], list):
                continue

            try:
                question_ids = [answer['question'] for answer in self.answers]
                questions = Question.objects.filter(id__in=question_ids).prefetch_related('choices')
                question = next((q for q in questions if q.id == answer['question']), None)
                if question is None:
                    continue

                correct_choices = question.choices.filter(is_correct=True)
                correct_choice_ids = set(choice.id for choice in correct_choices)
                selected_choice_ids = set(answer['choices'])

                # Check if the selected choices are exactly the correct choices
                if correct_choice_ids == selected_choice_ids:
                    score += question.point
            except (ObjectDoesNotExist, Question.DoesNotExist, Choice.DoesNotExist) as e:
                raise ValidationError(str(e))

        self.score = score
        self.save()
