from django.db import models

# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=80)
    country = models.CharField(max_length=50)

    def __str__(self):
        return self.name


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
        return f"Titulo Pelicula: {self.title} Año lanzamiento: {self.year} Genero: {self.genre}"


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField()                       
    rating = models.PositiveSmallIntegerField()     
    author = models.CharField(max_length=50)       
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review de {self.movie} por {self.author} \n {self.review} puntuacion: {self.rating}"


class Actor(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='actors')
    name = models.CharField(max_length=120)
    age = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"Actor: {self.name} in the movie: {self.movie}"