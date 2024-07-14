from django.urls import path, include
from rest_framework.routers import DefaultRouter

from quizzes.views.result_view import QuizResultExcelView
from quizzes.views.quiz_submission import QuizSubmissionViewSet
from quizzes.views.quiz_view import QuizViewSet
from quizzes.views.subject_view import SubjectViewSet
from quizzes.views.submissions_view import SubmissionsViewSet
from quizzes.views.user_rank_view import UserRankViewSet

router = DefaultRouter()
router.register(r'subject', SubjectViewSet, basename='subject')
router.register(r'quiz', QuizViewSet, basename='quiz')
router.register(r'ranks', UserRankViewSet, basename='ranks')

urlpatterns = [
    path('', include(router.urls)),
    path('quizzes/<subject_code>/', QuizViewSet.as_view({'get': 'list'}), name='quiz-subject'),
    path('quiz/<slug:quiz_slug>/submit/', QuizSubmissionViewSet.as_view({'post': 'create'}), name='submit-quiz'),
    path('quiz/<slug:quiz_slug>/submissions/', SubmissionsViewSet.as_view({'get': 'list'}), name='submissions_list'),
    path('quiz/<slug:quiz_slug>/submissions/<slug:single_submission>/', SubmissionsViewSet.as_view({'get': 'retrieve'}), name='single_submission'),
    path('subject/<slug:subject_code>/',
         SubjectViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}),
         name='single_subject'),
    path('result/<slug:quiz_slug>/', QuizResultExcelView.as_view(), name='quiz_result_excel'),
    ]
