from myApp.models import *
from .serializers import *

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
    CreateAPIView,
    DestroyAPIView,
)

# this allows user to create information
class KeyInfoCreateAPIView(CreateAPIView):
    serializer_class = KeyInfoSerializer
    queryset = KeyInfo.objects.all()

# this allows user to view all information
class KeyInfoListAPIView(ListAPIView):
    serializer_class = KeyInfoSerializer
    queryset = KeyInfo.objects.all()

# this allows user to delete information
class KeyInfoDeteleAPIView(RetrieveUpdateAPIView):
    serializer_class = KeyInfoSerializer
    queryset = KeyInfo.objects.all()
