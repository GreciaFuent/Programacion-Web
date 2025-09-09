from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=80)
    year = models.PositiveIntegerField()
    genre = models.CharField(max_length=30)

    def __str__(self):
        return f"Titulo Pelicula: {self.title} Año lanzamiento: {self.year} Genero: {self.genre}"
    

class Director(models.Model):
    name = models.CharField(max_length=80)
    country = models.CharField(max_length=50)

    def __str__(self):
        return self.name