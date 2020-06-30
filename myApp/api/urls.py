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
    url(r'^info/update/(?P<key>.+)/$', KeyInfoUpdateAPIView.as_view(), name='info-update'),
    url(r'^info/refresh/(?P<key>.+)/$', KeyInfoRefreshAPIView.as_view(), name='info-refresh'),
]
