from django.conf.urls import url
from django.contrib import admin
from django.conf.urls.static import static
from .views import *
from django.conf import settings

urlpatterns = [
    url(r'^info/create/$', FeedDuckInfoCreateAPIView.as_view(), name='info-create'),
    url(r'^info/all/$', FeedDuckInfoListAPIView.as_view(), name='info-view'),
    url(r'^info/(?P<pk>[0-9]+)/delete/$', FeedDuckInfoDeteleAPIView.as_view(), name='info-delete'),

    url(r'^foods/create/$', FoodCreateAPIView.as_view(), name='food-create'),
    url(r'^foods/all/$', FoodListAPIView.as_view(), name='food-view'),
    url(r'^foods/(?P<pk>[0-9]+)/delete/$', FoodDeteleAPIView.as_view(), name='food-delete'),
]
