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

class FeedDuckInfoCreateAPIView(CreateAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()

class FeedDuckInfoListAPIView(ListAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()

class FeedDuckInfoUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()

class FeedDuckInfoDeteleAPIView(RetrieveDestroyAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()
