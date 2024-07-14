from django.contrib import admin

from profiles.models import Profile
from quizzes.models import Subject, Quiz, Question, Choice, QuizSubmission, UserRank


# Register your models here.

class QuizSubmissionAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "profile":
            kwargs["queryset"] = Profile.objects.filter(role=Profile.STUDENT)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class QuizAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "created_by":
            kwargs["queryset"] = Profile.objects.filter(role=Profile.TEACHER)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class UserRankAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = Profile.objects.filter(role=Profile.STUDENT)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'text']


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'text']


class SubjectAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'subject_code', 'teacher']


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(QuizSubmission, QuizSubmissionAdmin)
admin.site.register(UserRank, UserRankAdmin)
