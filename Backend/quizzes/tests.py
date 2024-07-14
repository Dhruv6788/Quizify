import uuid

import jwt
from django.conf import settings

import quizify.settings
from quizify import settings
import datetime


def generate_access_token(user_id):
    data = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
        "jti": str(uuid.uuid4()),
        "token_type": "access",
    }
    token = jwt.encode(data, settings.SECRET_KEY, algorithm='HS256')
    print(token)


# generate_access_token("1")

from decouple import config

print(config('EMAIL_USER') == quizify.settings.EMAIL_HOST_USER)
print(config('EMAIL_PASS') == quizify.settings.EMAIL_HOST_PASSWORD)
print(type(config('EMAIL_USER')))
print(type(quizify.settings.EMAIL_HOST_USER))
