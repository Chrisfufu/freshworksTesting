from django.conf.urls import url
from django.contrib import admin
from django.conf.urls.static import static
from .views import *
from django.conf import settings

urlpatterns = [
    url(r'^create/$', FeedDuckInfoCreateAPIView.as_view(), name='create'),
    url(r'^all/$', FeedDuckInfoListAPIView.as_view(), name='view'),
    url(r'^update/(?P<pk>[0-9]+)/$', FeedDuckInfoUpdateAPIView.as_view(), name='update'),
    url(r'^info/(?P<pk>[0-9]+)/delete/$', FeedDuckInfoDeteleAPIView.as_view(), name='delete'),
]
