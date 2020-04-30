from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.core.validators import RegexValidator
from django.core.validators import validate_email
# Create your models here.


class FeedDuckInfo(models.Model):
    id = models.AutoField(primary_key=True)
    time = DateTimeField(auto_now=True)
    food = models.TextField(null=True)
    location = models.TextField(null=True)
    numberOfDucks = models.IntegerField(null=True)
    foodType = models.TextField(null=True)
    foodCalories = models.FloatField(null=True)

    class Meta:
        verbose_name = "FeedDuckInfo"
        db_table = "FeedDuckInfo"
