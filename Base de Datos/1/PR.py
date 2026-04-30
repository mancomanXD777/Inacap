from pymongo import MongoClient
from Base import *

cliente = MongoClient('mongodb://localhost:27017')

db = cliente['Tienda_LevelUp']
colecction = db['Catalogo_productos']


consola = {
    "nombre": "Nintendo",
    "Marca": "nintendo",
    "Precio": 3500,
    "Stock": 10,
    "especificaciones": {
        "pantalla": "oled 7 pulgada",
        "color": "neon"
        }

}

resultado = colecction.insert_one(consola)

print (f"producto insertado con id: {resultado.inserted_id}")