"""
URL configuration for todo_list project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views 
urlpatterns = [
    path('',views.loginView.as_view(),name='login'),
    path('tasks/', views.tasksView.as_view(), name="tasks"),
    path('register/',views.registerView.as_view(),name='register'),
    path('logout/',views.logoutView.as_view(),name='logoutUser'),
    path('delete/<str:name>/',views.deleteView.as_view(),name='delete'),
    path('update/<str:name>/',views.updateView.as_view(),name='update'),
    
    
]
