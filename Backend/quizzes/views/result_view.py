import io

import xlsxwriter
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.clickjacking import xframe_options_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from quizzes.models import QuizSubmission, Quiz


@method_decorator(xframe_options_exempt, name='dispatch')
class QuizResultExcelView(APIView):
    permission_classes = [IsAuthenticated]  # replace with your custom permission

    def get(self, request, quiz_slug, format=None):
        quiz = Quiz.objects.get(slug=quiz_slug)
        submissions = QuizSubmission.objects.filter(quiz=quiz)

        # Create an in-memory buffer for the Excel file
        output = io.BytesIO()

        # Create the Excel file using XlsxWriter
        workbook = xlsxwriter.Workbook(output, {'in_memory': True})
        worksheet = workbook.add_worksheet('Quiz Results')

        # All Formats
        center_format = workbook.add_format({'align': 'center', 'valign': 'vcenter'})

        bold_format = workbook.add_format({'bold': True})
        center_bold_format = workbook.add_format({'align': 'center', 'valign': 'vcenter', 'bold': True})

        number_format = workbook.add_format({'num_format': '0'})
        center_number_format = workbook.add_format({'align': 'center', 'valign': 'vcenter', 'num_format': '0'})

        # Write the hardcoded strings using the bold format
        worksheet.write('A1', 'Subject(Subject_Code) :', bold_format)
        worksheet.write('B1', quiz.subject.name + ' (' + quiz.subject.subject_code + ')')
        worksheet.write('A2', 'Quiz Title :', bold_format)
        worksheet.write('B2', quiz.title)
        worksheet.write('A3', 'Taken Date & Time :', bold_format)
        worksheet.write('B3', quiz.starting_time.strftime("%d-%m-%Y %I:%M %p"))  # Use %I:%M %p for 12-hour format
        worksheet.write('A4', 'Quiz Duration :', bold_format)
        worksheet.write('B4', str(quiz.duration) + " mins")

        worksheet.write('A6', 'SR NO', center_bold_format)
        worksheet.write('B6', 'Name', center_bold_format)
        worksheet.write('C6', 'Email', center_bold_format)
        worksheet.write('D6', 'Enrollment NO', center_bold_format)
        worksheet.write('E6', 'Submission Time', center_bold_format)
        worksheet.write('F6', 'Score', center_bold_format)

        # Apply custom column width
        worksheet.set_column(0, 0, 22)  # Column A [0(starting column index), 0(ending column index), 20(width)]
        worksheet.set_column(1, 1, 40)  # Column B
        worksheet.set_column(2, 2, 27)  # Column C
        worksheet.set_column(3, 3, 18)  # Column C
        worksheet.set_column(4, 4, 19)  # Column E

        # Prepare the data for the Excel file
        data = []
        for submission in submissions:
            data.append(
                [submission.profile.user.name, "mailto:" + submission.profile.user.email,
                 int(submission.profile.enrollment_no),
                 submission.submission_time.strftime("%d-%m-%Y %I:%M %p"),  # Use %I:%M %p for 12-hour format
                 int(submission.score)
                 ]
            )

        # Write DataFrame data
        for row_num, row_data in enumerate(data, start=1):  # Start enumeration at column 1
            for col_num, col_data in enumerate(row_data):
                # Adjust row_num to account for starting at 1 and add 1 to col_num to shift the columns to the right
                if col_num == 2:  # If this is the enrollment_no column
                    worksheet.write(row_num + 6, col_num + 1, col_data, center_number_format)
                elif col_num == 1:  # If this is the email column
                    worksheet.write_url(row_num + 6, col_num + 1, col_data, center_format)
                else:
                    worksheet.write(row_num + 6, col_num + 1, col_data, center_format)

            # Write the sequence number (row_num) in the first column ('A')
            worksheet.write(row_num + 6, 0, row_num, center_format)

        workbook.close()

        # Set the appropriate content type and return the file to the user
        output.seek(0)
        filename = f"{quiz.title}_results.xlsx"
        response = HttpResponse(output,
                                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'

        return response
