from rest_framework import serializers
from myApp.models import *
from rest_framework.serializers import (
    ModelSerializer,
)
from django.db import transaction
import datetime
import uuid

# List API View
# it does not show the uuid
class KeyInfoListSerializer(ModelSerializer):
    class Meta:
        model = KeyInfo
        fields = '__all__'

class KeyInfoCreateSerializer(ModelSerializer):
    class Meta:
        model = KeyInfo
        fields = "__all__"
        extra_kwargs = {
            "name": {
                "read_only": False,
                "required": False,
            },
            "description": {
                "read_only": False,
                "required": False,
            },
            "expiryTime": {
                "read_only": False,
                "required": False,
            }
        }

    def create(self, validated_data):

        # atomic transaction.
        with transaction.atomic():
            # create a new key information.
            # the key is using UUID.
            # Only after creation, the key will show up
            # other than creation, and listing, key does not show up.
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


class KeyInfoUpdateSerializer(ModelSerializer):
    class Meta:
        model = KeyInfo
        fields = [
            'name',
            'description',
            'expiryTime'
        ]
        extra_kwargs = {
            "name": {
                "read_only": True,
                "required": False,
            },
            "description": {
                "read_only": False,
                "required": False,
            },
            "expiryTime": {
                "read_only": True,
                "required": False,
            }
        }
    # edit description only
    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.description = validated_data.pop('description', False)
            instance.save()
            return instance

class KeyInfoRefreshSerializer(ModelSerializer):
    class Meta:
        model = KeyInfo
        fields = [
            'name',
            'description',
            'expiryTime'
        ]
        extra_kwargs = {
            "name": {
                "read_only": True,
                "required": False,
            },
            "description": {
                "read_only": True,
                "required": False,
            },
            "expiryTime": {
                "read_only": True,
                "required": False,
            }
        }

    # extend the expiration.
    def update(self, instance, validated_data):
        with transaction.atomic():
            print(instance.keyId)
            dateStart = KeyInfo.objects.filter(keyId = instance.keyId).first().expiryTime
            print(dateStart,'\n\n\n')
            date = dateStart + datetime.timedelta(days=1)
            instance.expiryTime = date
            instance.save()
            return instance
