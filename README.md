# Programacion-Web
# Grecia Fuentes


Steps to run the application

# 1) Go to the backend folder
cd backend


# 2) Build and run the containers
For the first time you use the project:
docker compose up -d --build

If the containers were already built before:
docker compose up -d

# 3) Verify that everything is running
docker ps

# 4) Access the services
Frontend: **http://localhost:3000**  
Backend (API): **http://localhost:8000**  
Redis Commander: **http://localhost:8081**
