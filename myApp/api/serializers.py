from rest_framework import serializers
from myApp.models import *
from rest_framework import serializers
from rest_framework.serializers import (
    ModelSerializer,
)


class FeedDuckInfoSerializer(ModelSerializer):
    class Meta:
        model = FeedDuckInfo
        fields = '__all__'
