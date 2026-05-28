#bienvenido a la libreria
from pymongo import MongoClient
cliente = MongoClient('mongodb://localhost:27017')
#establecer la abse de clientes y la coleccion
db = cliente['TiendaLevelOne']
coleccion = db ['Catalogo_Producto']

#definir el documento como un diccionario

consola = [
{
    "nombre": "Gameboy",
    "Marca": "Nintendo",
    "Precio": 27000,
    "Stock": 2,
    "especificaciones": {
        "pantalla": "LCD 2,9 pulgadas",
        "color": "Azul Cielo Temporal Marino"
        }

    },

    {
    "nombre": "Playstation 5",
    "Marca": "Sony",
    "Precio": 1000000,
    "Stock": 7,
    "especificaciones": {
        "pantalla": "No",
        "color": "Blanco"
        }

}
]

#ejecutar la insercion

resultado = coleccion.insert_many(consola)


#confirmar la operacion

print(f"Producto insertado con _id {resultado.inserted_ids}")