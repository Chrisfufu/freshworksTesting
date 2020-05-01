from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.core.validators import RegexValidator
from django.core.validators import validate_email
# Create your models here.
# import datetime

class FeedDuckInfo(models.Model):
    infoId = models.AutoField(primary_key=True)
    time = models.DateTimeField()
    location = models.TextField()
    numberOfDucks = models.IntegerField()
    repeatDays = models.IntegerField()
    food = models.ManyToManyField('Food', through = 'DuckFood')
    class Meta:
        verbose_name = "FeedDuckInfo"
        db_table = "FeedDuckInfo"

class DuckFood(models.Model):
    duckFoodId = models.AutoField(primary_key=True)
    infoId = models.ForeignKey("FeedDuckInfo",db_column = 'infoId', on_delete=models.CASCADE)
    foodId = models.ForeignKey("Food",db_column = 'foodId', on_delete=models.CASCADE)
    class Meta:
        verbose_name = "Duck Food"
        db_table = "DuckFood"

class Food(models.Model):
    foodId = models.AutoField(primary_key=True)
    food = models.TextField()
    foodType = models.TextField()
    foodCalories = models.FloatField()
    class Meta:
        verbose_name = "Food"
        db_table = "Food"
