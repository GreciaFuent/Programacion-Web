from django.contrib import admin
from .models import Director, Movie, Review, Actor


@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'country')   
    search_fields = ('name', 'country')        
    list_filter = ('country',)                


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'year', 'genre', 'director')  
    search_fields = ('title', 'genre')                           
    list_filter = ('year', 'genre', 'director')                 
    autocomplete_fields = ('director',)                         


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'movie', 'author', 'rating', 'created_at')
    search_fields = ('author', 'review')
    list_filter = ('rating', 'created_at')
    autocomplete_fields = ('movie',)


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age', 'movie')
    search_fields = ('name',)
    list_filter = ('age', 'movie')
    autocomplete_fields = ('movie',)
