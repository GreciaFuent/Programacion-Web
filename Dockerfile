# la imagen con python
FROM python:3.11-slim AS base

# creacion de un usuario
RUN useradd -m appuser

# definir el entorno de trabajo
WORKDIR /app


COPY requirements.txt .


RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get purge -y --auto-remove gcc \
    && rm -rf /var/lib/apt/lists/*

# copia todo el codigo
COPY . .


RUN chown -R appuser /app
USER appuser

EXPOSE 8000


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
