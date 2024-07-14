import pandas as pd
import re

from django.core.validators import EmailValidator
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from profiles.models import Profile
from quizzes.models import Subject
from quizzes.permissions.is_subject_teacher_or_read_only import IsSubjectTeacherOrReadOnly
from quizzes.serializers.subject_serializer import SubjectSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsSubjectTeacherOrReadOnly]
    serializer_class = SubjectSerializer
    parser_classes = [MultiPartParser]
    lookup_field = 'subject_code'

    def get_queryset(self):
        if self.request.user.profile.role == Profile.TEACHER:
            return Subject.objects.filter(teacher=self.request.user.profile)
        else:
            return Subject.objects.filter(students=self.request.user.profile)

    @property
    def allowed_methods(self):
        return ['GET', 'PATCH', 'DELETE']

    def get_students_from_file(self, request):
        students = None
        email_validator = EmailValidator()

        # Check if 'file' is in request.FILES
        if 'file' in request.FILES:
            excel_file = request.FILES['file']

            try:
                data = pd.read_excel(excel_file)
            except Exception as e:
                raise ValidationError({"file": "The file could not be read. Please ensure it is a valid Excel file."})

            # Find all emails in the Excel file
            emails = []
            email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            for column in data:
                for cell in data[column]:
                    if isinstance(cell, str) and re.match(email_regex, cell):
                        try:
                            email_validator(cell)
                            emails.append(cell)
                        except ValidationError:
                            raise ValidationError({"file": f"Invalid email found: {cell}"})

            if not emails:
                raise ValidationError({"file": "No emails found in the Excel file."})

            students = Profile.objects.filter(user__email__in=emails, role=Profile.STUDENT)

            if len(students) != len(emails):
                raise ValidationError({"file": "Some emails in the Excel file do not correspond to any student."})

        return students

    def create(self, request, *args, **kwargs):
        if request.user.profile.role != Profile.TEACHER:
            raise PermissionDenied({"permission": "Only teachers can create subjects."})

        students = self.get_students_from_file(request)

        data = request.data.copy()
        data['teacher'] = request.user.profile.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        subject = serializer.save(teacher=request.user.profile)
        if students:
            subject.students.set(students)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        students = self.get_students_from_file(request)

        data = request.data.copy()
        serializer = self.get_serializer(instance, data=data, partial=True)  # set partial=True to update a data partially
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if students:
            instance.students.set(students)

        if getattr(instance, '_prefetched_objects_cache', None):  # If 'prefetch_related' has been applied
            instance._prefetched_objects_cache = {}  # Clear prefetch cache after update

        return Response(serializer.data)

    def get_object(self):
        queryset = self.get_queryset()
        slug = self.kwargs['subject_code']
        obj = get_object_or_404(queryset, subject_code=slug)
        return obj
