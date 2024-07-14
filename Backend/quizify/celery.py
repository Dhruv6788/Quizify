import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quizify.settings')

app = Celery('quizify')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

# app.conf.beat_schedule = {
#     'send-quiz-status-every-60-seconds': {
#         'task': 'quizzes.tasks.send_quiz_status_task',
#         'schedule': 60.0,
#         'args': ["Java1", "Kotlin1"]
#     },
# }
