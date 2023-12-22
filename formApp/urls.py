# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('save-data/', views.save_data, name='save_data'),
    path('form-templates/', views.form_template, name='form_template'),
    path('your_redirect_view/<str:form_id>/', views.your_redirect_view,
         name='your_redirect_view'),
    path('formApp/save-response/', views.save_response, name='save_response'),
]
