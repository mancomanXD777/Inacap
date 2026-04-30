from pymongo import MongoClient
from Base import *

cliente = MongoClient('mongodb://localhost:27017')

db = cliente['Tienda_LevelUp']
colecction = db['Catalogo_productos']


