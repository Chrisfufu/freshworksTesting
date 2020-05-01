from rest_framework import serializers
from myApp.models import *
from rest_framework.serializers import (
    ModelSerializer,
)
from django.db import transaction
import datetime

# ModelSerializer for Food Model
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

# Model Serializer for FeedDuckInfo.
# customize the create method.
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
        # atomic transaction.
        with transaction.atomic():
            # get many to many field: food.
            foods = validated_data.pop('food', [])
            # in order to get the repeat days set up properly,
            # the date needs add datetime.timedelta(days=day),
            # for example: 2020-04-30, next date will automatically return
            # 2020-05-01
            date = validated_data['time']
            repeatDay = validated_data['repeatDays']
            # use a for loop to create Feed Duck.
            for day in range(validated_data['repeatDays']):
                date = date+datetime.timedelta(days=day)
                info = FeedDuckInfo.objects.create(
                    time = date,
                    location = validated_data['location'],
                    numberOfDucks = validated_data['numberOfDucks'],
                    repeatDays = repeatDay
                )
                repeatDay -= 1
                # use a for loop to create Food object, by giving the id
                for food in foods:
                    foodId = Food.objects.get(foodId = food['foodId'])
                    DuckFood.objects.create(infoId=info, foodId=foodId)

            return info
