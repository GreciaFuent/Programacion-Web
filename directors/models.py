from django.db import models

class Director(models.Model):
    name = models.CharField(max_length=80)
    country = models.CharField(max_length=50)

    def __str__(self):
        return self.name