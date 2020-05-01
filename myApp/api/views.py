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
class FeedDuckInfoCreateAPIView(CreateAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()

# this allows user to view all information
class FeedDuckInfoListAPIView(ListAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()

# this allows user to delete information
class FeedDuckInfoDeteleAPIView(RetrieveDestroyAPIView):
    serializer_class = FeedDuckInfoSerializer
    queryset = FeedDuckInfo.objects.all()

# this allows user to create Food
class FoodCreateAPIView(CreateAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()

# this allows user to view all Food
class FoodListAPIView(ListAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()

# this allows user to delete Food
class FoodDeteleAPIView(RetrieveDestroyAPIView):
    serializer_class = FoodSerializer
    queryset = Food.objects.all()
