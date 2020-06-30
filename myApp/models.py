from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.core.validators import RegexValidator
from django.core.validators import validate_email
import uuid
# Create your models here.
# import datetime

# FeedDuckInfo Model
# ManyToManyField through DuckFood.
class KeyInfo(models.Model):
    keyId = models.AutoField(primary_key=True)
    name = models.TextField()
    description = models.TextField()
    key = models.TextField(unique=True, editable=False)
    expiryTime = models.DateTimeField()
    class Meta:
        verbose_name = "KeyInfo"
        db_table = "keyinfo"