from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from authapi.models import User


# Create your models here.

class Profile(models.Model):
    STUDENT = 1
    TEACHER = 2
    ROLE_CHOICES = (
        (STUDENT, 'Student'),
        (TEACHER, 'Teacher'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=STUDENT)
    bio = models.TextField(blank=True, null=True)
    enrollment_no = models.CharField(max_length=14, blank=True, null=True, unique=True)
    profile_img = models.ImageField(upload_to='profile_images', default='user.png', blank=True, null=True)
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, blank=True, null=True)
    quiz_history = models.ManyToManyField('quizzes.Quiz', through='quizzes.QuizSubmission', related_name='quiz_history',
                                          blank=True)

    def __str__(self):
        return self.user.email


"""
    post_save is a signal that gets fired after an object is saved. 
    @receiver(post_save, sender=User) is a decorator that connects the 
    create_user_profile function to the post_save signal for the User model. 
    So, whenever a User object is saved, 
    a Profile object is created for that user.
"""


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
