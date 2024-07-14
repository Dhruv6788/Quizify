import openpyxl
from celery import shared_task
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import Sum

from quizzes.models.choice import Choice
from quizzes.models.question import Question


@shared_task
def update_board(quiz_id):
    from quizzes.models import Quiz
    quiz = Quiz.objects.get(id=quiz_id)
    # Count the sum of scores for all users for the current quiz
    from quizzes.models import QuizSubmission
    user_scores = QuizSubmission.objects.filter(quiz=quiz).values('profile').annotate(
        total_score=Sum('score')).order_by('-total_score')

    # Update rank based on the sorted list
    rank = 1
    with transaction.atomic():    # used transaction so that either all rank are updated or none of them are updated
        for entry in user_scores:
            user_id = entry['profile']
            total_score = entry['total_score']

            from quizzes.models import UserRank
            user_rank, created = UserRank.objects.get_or_create(user_id=user_id, quiz=quiz)
            user_rank.rank = rank
            user_rank.total_score = total_score
            user_rank.save()
            rank += 1


@shared_task
def import_quiz_from_excel(quiz_id):
    try:
        from quizzes.models import Quiz
        quiz = Quiz.objects.get(id=quiz_id)
        workbook = openpyxl.load_workbook(quiz.quiz_file)
        worksheet = workbook.active

        questions_data = []
        for row_index, row in enumerate(worksheet.iter_rows(values_only=True, min_row=2), start=2):
            if len(row) > 7:
                raise ValidationError(f"Row {row_index}: {len(row)} values (expected 7)")
            question_text, A, B, C, D, correct_answer, point = row

            if not all((question_text, A, B, C, D, correct_answer, point)):
                raise ValidationError({"error": f"Incomplete data in row {row_index}: question_text, A, B, C, D, correct_answer, point should not be empty."})

            questions_data.append({
                'question_text': question_text,
                'choices': [A, B, C, D],
                'correct_answer': correct_answer,
                'point': point
            })
        with transaction.atomic():
            quiz.questions.all().delete()
            for data in questions_data:
                multiple_answer = True if len(data['correct_answer']) > 1 else False
                question = Question.objects.create(
                    quiz=quiz,
                    text=data['question_text'],
                    point=data['point'],
                    multiple_answer=multiple_answer
                )
                for i, choice_text in enumerate(data['choices']):
                    is_correct = 'ABCD'[i] in data['correct_answer'].upper().replace(',', '')
                    Choice.objects.create(question=question, text=choice_text, is_correct=is_correct)

    except (FileNotFoundError, PermissionError, ValidationError) as e:
        raise ValidationError({"error": f"Error importing quiz from Excel: {e}"})
    except Exception as e:
        raise ValidationError({"error": f"Unexpected error importing quiz from Excel in row {row_index}: {e}"})
