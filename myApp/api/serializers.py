from rest_framework import serializers
from myApp.models import *
from rest_framework.serializers import (
    ModelSerializer,
)
from django.db import transaction
import datetime


class FoodSerializer(ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        extra_kwargs = {
            "foodId": {
                "read_only": False,
                "required": False,
            },
            "food": {
                "read_only": False,
                "required": False,
            },
            "foodType": {
                "read_only": False,
                "required": False,
            },
            "foodCalories": {
                "read_only": False,
                "required": False,
            }
        }

class FeedDuckInfoSerializer(ModelSerializer):
    food = FoodSerializer(many=True, required=False)
    class Meta:
        model = FeedDuckInfo
        fields = '__all__'
    def create(self, validated_data):
        '''
        DateTimeField Acceptance Format
        [
            '%Y-%m-%d %H:%M:%S',     # '2006-10-25 14:30:59'
            '%Y-%m-%d %H:%M:%S.%f',  # '2006-10-25 14:30:59.000200'
            '%Y-%m-%d %H:%M',        # '2006-10-25 14:30'
            '%Y-%m-%d',              # '2006-10-25'
            '%m/%d/%Y %H:%M:%S',     # '10/25/2006 14:30:59'
            '%m/%d/%Y %H:%M:%S.%f',  # '10/25/2006 14:30:59.000200'
            '%m/%d/%Y %H:%M',        # '10/25/2006 14:30'
            '%m/%d/%Y',              # '10/25/2006'
            '%m/%d/%y %H:%M:%S',     # '10/25/06 14:30:59'
            '%m/%d/%y %H:%M:%S.%f',  # '10/25/06 14:30:59.000200'
            '%m/%d/%y %H:%M',        # '10/25/06 14:30'
            '%m/%d/%y',              # '10/25/06'
        ]
        '''
        with transaction.atomic():
            foods = validated_data.pop('food', [])
            date = validated_data['time']
            repeatDay = validated_data['repeatDays']
            for day in range(validated_data['repeatDays']):
                date = date+datetime.timedelta(days=day)
                info = FeedDuckInfo.objects.create(
                    time = date,
                    location = validated_data['location'],
                    numberOfDucks = validated_data['numberOfDucks'],
                    repeatDays = repeatDay
                )
                repeatDay -= 1
                for food in foods:
                    foodId = Food.objects.get(foodId = food['foodId'])
                    DuckFood.objects.create(infoId=info, foodId=foodId)

            return info
