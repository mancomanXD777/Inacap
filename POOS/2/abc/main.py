from .Consultas.crud import *

def menu():
    print("\n1. Mostrar Usuarios")
    print("2. Agregar Usuario")
    print("3. Buscar Usuario")
    print("4. Eliminar Usuario")
    print("5. Salir\n")

    opc = int(input("ingrese una opcion : "))
    return opc

def insertar():
    Usuario_ID = input("Ingrese ID Usuario")
    Nombre = input("Ibgrese Nombre")
    Correo = input("Ingrese Correo")

while True:
    opc = menu()
    if opc == 1:
        print()
    elif opc == 2:
        print()
    elif opc == 3:
        print()
    elif opc == 4:
        print()
    elif opc == 5:
        break
    else: 
        print("Error Numero No Valido")
        break
        