from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return render(request, 'Secretos/index.html')

def index2(request):
    return render(request, 'Secretos/index2.html')