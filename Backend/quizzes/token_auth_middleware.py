from asgiref.sync import sync_to_async
from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser

import jwt
from django.contrib.auth import get_user_model


class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        if b'authorization' in headers:
            try:
                token_name, token_key = headers[b'authorization'].decode().split()
                if token_name == 'JWT':
                    decoded_data = jwt.decode(token_key, options={"verify_signature": False})
                    user_id = decoded_data["user_id"]
                    User = get_user_model()
                    user = await sync_to_async(User.objects.get)(id=user_id)
                    scope['user'] = user
            except Exception as e:
                scope['user'] = AnonymousUser()
        return await self.inner(scope, receive, send)


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
