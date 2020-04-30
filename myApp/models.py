from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.core.validators import RegexValidator
from django.core.validators import validate_email
# Create your models here.
# import datetime

class FeedDuckInfo(models.Model):
    id = models.AutoField(primary_key=True)
    time = models.DateTimeField()
    food = models.TextField()
    location = models.TextField()
    numberOfDucks = models.IntegerField()
    foodType = models.TextField()
    foodCalories = models.FloatField()

    class Meta:
        verbose_name = "FeedDuckInfo"
        db_table = "FeedDuckInfo"
