# HW-06
# Docker images

steps to run de aplication

# 1) Build containers
docker compose build

# 2) run de containers
docker compose up -d

# 3) verify that everything it´s runind
docker ps

# 3) Apply the database migrations
docker-compose exec web python manage.py migrate

With those steps complete the correct way you can run *http://localhost:8000/* and you will see the django project runing 

