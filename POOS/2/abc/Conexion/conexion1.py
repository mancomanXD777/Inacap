import mysql.connector
from mysql.connector import Error

class Conexion():

    def __init__(self):
        try:
            self.myconexion=mysql.connector.connect(host='localhost',user='root',passwd='',database='dbinacap')

            if self.myconexion.is_connected:
                print("estoy conectandome")
        except Error as e:
            print(e)

    def getConectar(self):
        return self.myconexion