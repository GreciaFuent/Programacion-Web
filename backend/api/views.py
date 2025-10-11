from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import uuid
import os, redis
import uuid, time


r = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"),
    port=int(os.getenv("REDIS_PORT", "6379")),
    decode_responses=True,
)


def _generate_unique_key():
    for _ in range(5):
        key = uuid.uuid4().hex[:8]
        if r.set(key, "__reserved__", nx=True, ex=5):  
            return key
        time.sleep(0.01)
    long_key = uuid.uuid4().hex
    r.set(long_key, "__reserved__", nx=True, ex=5)
    return long_key

@csrf_exempt
def hide_secret(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)
    data = json.loads(request.body)
    secret = data.get("secret")
    if not secret:
        return JsonResponse({"error": "Falta el campo 'secret'"}, status=400)

    key = _generate_unique_key()
    r.set(key, secret)          
    r.persist(key)             
    return JsonResponse({"key": key})

def reveal_secret(request, key):
    secret = r.get(key)
    if not secret:
        return JsonResponse({"error": "Key inválida o ya usada"}, status=404)
    r.delete(key)
    return JsonResponse({"secret": secret})
