from django.conf.urls import url
from django.contrib import admin
from django.conf.urls.static import static
from .views import *
from django.conf import settings

# the following is the controller APIs.
urlpatterns = [
    # feed key information controllers.
    # it has create information, view all information and delete information by id.
    url(r'^info/create/$', KeyInfoCreateAPIView.as_view(), name='info-create'),
    url(r'^info/all/$', KeyInfoListAPIView.as_view(), name='info-view'),
    url(r'^info/(?P<pk>[0-9]+)/$', KeyInfoDeteleAPIView.as_view(), name='info-delete'),
]
