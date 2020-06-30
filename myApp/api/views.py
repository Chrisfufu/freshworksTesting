from myApp.models import *
from .serializers import *

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView,
)

# this allows user to create information
class KeyInfoCreateAPIView(CreateAPIView):
    serializer_class = KeyInfoCreateSerializer
    queryset = KeyInfo.objects.all()

# this allows user to view all information
class KeyInfoListAPIView(ListAPIView):
    serializer_class = KeyInfoListSerializer
    queryset = KeyInfo.objects.all()

# this allows user to update information
class KeyInfoUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = KeyInfoUpdateSerializer
    queryset = KeyInfo.objects.all()
    lookup_field = 'key'

# this allows user to Refresh time by 24 hours
class KeyInfoRefreshAPIView(RetrieveUpdateAPIView):
    serializer_class = KeyInfoRefreshSerializer
    queryset = KeyInfo.objects.all()
    lookup_field = 'key'