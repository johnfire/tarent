from django.urls import path

from . import views

urlpatterns = [
    path("v1/mv1/school/createClass/", views.createClass),
    path("v1/mv1/both/AllClasses/", views.sendIds),
    path("v1/mv1/school/modifyClass/", views.modifyClass)
]