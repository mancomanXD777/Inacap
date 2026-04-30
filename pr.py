c = int(input("¿Cuantos Productos Quiere Ingresar?: "))
while c >= 1:
    print("¿Es Una Consola?")
    print("1.- Si")
    print("2.- No")
    t = int(input(""))
    if t == 1:
        Nombre = input("Cual es el Nombre: ")
        Marca = input("Cual es la Marca: ")
        Precio = float(input("Cual es el Precio: "))
        Stock = int(input("Cual es el Stock: "))
        Almacenamiento = input("Cuanto de Almacenamiento tiene: ")
        Color = input("Cual es el Color: ")
        #db.insertOne{"Nombre" : Nombre, "Marca": Marca, "Precio" : Precio, "Stock" : Stock, "Almacenamiento" : Almacenamiento , "Color" : Color}

    else: 
        Nombre = input("Cual es el Nombre: ")
        Marca = input("Cual es la Marca: ")
        Precio = float(input("Cual es el Precio: "))
        Stock = int(input("Cual es el Stock: "))
        #db.insertOne{"Nombre" : Nombre, "Marca": Marca, "Precio" : Precio, "Stock" : Stock}

c =c-1