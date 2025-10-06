from django.db import models
from movies.models import Movie     

class Actor(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='actors')
    name = models.CharField(max_length=120)
    age = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} en {self.movie.title}"
