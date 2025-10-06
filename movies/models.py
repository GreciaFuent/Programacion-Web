from django.db import models
from directors.models import Director  # Importamos el modelo Director

class Movie(models.Model):
    title = models.CharField(max_length=80)
    year = models.PositiveIntegerField()
    genre = models.CharField(max_length=30)
    director = models.ForeignKey(
        Director,
        on_delete=models.PROTECT,
        related_name='movies',
        null=True, blank=True
    )

    def __str__(self):
        return f"{self.title} ({self.year}) - {self.genre}"


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField()
    rating = models.PositiveSmallIntegerField()
    author = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review de {self.movie.title} por {self.author}"
