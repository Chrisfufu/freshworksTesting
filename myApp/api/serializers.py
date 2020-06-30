from rest_framework import serializers
from myApp.models import *
from rest_framework.serializers import (
    ModelSerializer,
)
from django.db import transaction
import datetime
import uuid

class KeyInfoSerializer(ModelSerializer):
    class Meta:
        model = KeyInfo
        fields = [
            'keyId',
            'name',
            'description',
            'expiryTime'
        ]
    def create(self, validated_data):
        
        # atomic transaction.
        with transaction.atomic():
            # get many to many field: food.
            # in order to get the repeat days set up properly,
            # the date needs add datetime.timedelta(days=day),
            # for example: 2020-04-30, next date will automatically return
            # 2020-05-01
            name = validated_data['name']
            description = validated_data['description']
            expiryTime = validated_data['expiryTime']
            key = uuid.uuid4().hex
            # use a for loop to create Feed Duck.
            info = KeyInfo.objects.create(
                    name = name,
                    description = description,
                    expiryTime = expiryTime,
                    key = key
                )
            return info
    
    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.description = validated_data.pop('description', False)
            instance.save()
            return instance
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