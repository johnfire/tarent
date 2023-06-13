from django.urls import path

from . import views

urlpatterns = [
    path("", views.createClass),
    path("sendIds/", views.sendIds),
    path("modifyCourse/", views.modifyClass)
]