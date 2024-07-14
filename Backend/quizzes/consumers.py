import asyncio
import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.db.models import Q, F
from django.utils import timezone
from profiles.models import Profile

QUIZ_STATUS = 'quiz.status'


class QuizConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if self.user.is_authenticated:
            self.subjects = await self.get_subjects()
            for subject in self.subjects:
                group_name = f"quiz_{subject.subject_code}"
                await self.channel_layer.group_add(group_name, self.channel_name)
            await self.accept()
            self.send_quiz_status_task = asyncio.create_task(self.send_quiz_status_periodically())
        else:
            await self.close()

    @database_sync_to_async
    def get_subjects(self):
        role = self.user.profile.role
        from quizzes.models import Subject
        subjects = Subject.objects.select_related('teacher').filter(
            teacher=self.user.id) if role == Profile.TEACHER else Subject.objects.prefetch_related('students').filter(
            students=self.user.id)
        return list(subjects)

    async def send_quiz_status(self):
        subject_codes = [subject.subject_code for subject in self.subjects]
        quiz_status = await self.get_quiz_status(subject_codes)
        for subject_code, status in quiz_status.items():
            try:
                await self.channel_layer.group_send(
                    f"quiz_{subject_code}",
                    {
                        'type': QUIZ_STATUS,
                        'quiz_status': status
                    }
                )
            except Exception as e:
                error_response = {
                    'error': str(e),
                    'details': str(e.__traceback__)
                }
                await self.send(text_data=json.dumps(error_response))

    async def send_quiz_status_periodically(self):
        while True:
            try:
                await self.send_quiz_status()
                await asyncio.sleep(5)
            except asyncio.CancelledError:
                break

    @database_sync_to_async
    def get_quiz_status(self, subject_codes):
        quiz_status = {}
        now = timezone.now()

        # Get all quizzes for the given subject codes at once
        from quizzes.models import Quiz
        quizzes = Quiz.objects.filter(subject__subject_code__in=subject_codes)

        for subject_code in subject_codes:
            subject_quizzes = quizzes.filter(subject__subject_code=subject_code)
            total_quizzes = subject_quizzes.count()
            live_quizzes = subject_quizzes.filter(
                Q(starting_time__lte=now) &
                Q(starting_time__gte=now - F('duration'))
            ).count()
            pending_quizzes = subject_quizzes.filter(
                Q(starting_time__gt=now)
            ).count()
            quiz_status[subject_code] = {
                'subject_code': subject_code,
                'total_quizzes': total_quizzes,
                'live_quizzes': live_quizzes,
                'pending_quizzes': pending_quizzes,
            }
        return quiz_status

    async def quiz_status(self, event):
        quiz_status = event['quiz_status']
        await self.send(text_data=json.dumps(quiz_status))

    async def disconnect(self, close_code):
        try:
            self.send_quiz_status_task.cancel()
            await self.send_quiz_status_task
        except asyncio.CancelledError:
            pass
