from django.db import models, transaction
from django.utils import timezone
from django.utils.text import slugify
from django_celery_beat.models import IntervalSchedule, PeriodicTask

from quizzes.models.subject import Subject
from quizzes.quiz_validation import QuizValidator
from quizzes.tasks import import_quiz_from_excel


class Quiz(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    subject = models.ForeignKey(Subject, related_name='quizzes', on_delete=models.CASCADE)
    quiz_file = models.FileField(upload_to='quiz/')
    starting_time = models.DateTimeField(validators=[QuizValidator.validate_starting_time])
    duration = models.DurationField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey("profiles.Profile", related_name='created_quizzes', on_delete=models.CASCADE, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = 'Quizzes'

    def __str__(self):
        return self.title

    @property
    def is_active(self):
        now = timezone.now()
        end_time = self.starting_time + self.duration
        return self.starting_time <= now <= end_time

    @property
    def total_marks(self):
        return sum(question.point for question in self.questions.all())

    @property
    def status(self):
        now = timezone.now()
        end_time = self.starting_time + self.duration

        if now < self.starting_time:
            return 'PENDING'
        elif self.starting_time <= now <= end_time:
            return 'LIVE'
        else:
            return 'ENDED'

    def save(self, *args, **kwargs):
        self.full_clean()
        if not self.slug:
            self.slug = slug = slugify(self.title)
            while Quiz.objects.filter(slug=slug).exists():
                slug = "{}-{}".format(slug, Quiz.objects.filter(slug__startswith=slug).count())
            self.slug = slug

        # Check if the quiz_file has changed
        if self.pk is not None:
            orig = Quiz.objects.get(pk=self.pk)
            if orig.quiz_file != self.quiz_file:
                super().save(*args, **kwargs)
                transaction.on_commit(lambda: import_quiz_from_excel.delay(self.id))
            else:
                super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)
            if self.quiz_file:
                transaction.on_commit(lambda: import_quiz_from_excel.delay(self.id))
        self.schedule_update_leaderboard_task()

    def schedule_update_leaderboard_task(self):
        end_time = self.starting_time + self.duration
        interval, created = IntervalSchedule.objects.get_or_create(
            every=0,  # or set it to 0
            period=IntervalSchedule.MINUTES
        )
        # Include the current timestamp in the task name
        task_name = f"Update Leaderboard for Quiz {self.id}"
        try:
            # Try to get the existing task
            task = PeriodicTask.objects.get(name=task_name)
            # Update the task properties
            task.interval = interval
            task.args = [self.id]
            task.start_time = end_time
            task.enabled = True
            task.save()
        except PeriodicTask.DoesNotExist:
            # If the task does not exist, create a new one
            PeriodicTask.objects.create(
                name=task_name,
                task="quizzes.tasks.update_board",
                args=[self.id],
                start_time=end_time,
                one_off=True,
                interval=interval
            )

