import datetime
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def display(request):
    return HttpResponse("<h1>Hola mundo</h1>")

def displayDateTime(request):
    dt = datetime.datetime.now()
    s = "<b>Fecha y hora actual: </b>" + str(dt)
    return HttpResponse(s)

def mostrar_render (request):
    contexto = {
        'nombre' : 'Inacapito',

    }
    return render (request, 'ejemplo1.html', contexto)