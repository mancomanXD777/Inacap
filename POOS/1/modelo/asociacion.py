class Dueno:
    def __init__(self, nombre):
        self.nombre = nombre
        self.mascotas = []

    def añadir_mascota(self, mascota):
        if isinstance(mascota, Mascota):
            self.mascotas.append(mascota)
            mascota.asignar_dueno(self)
        else:
            print("¡Error! Solo puedes añadir instancias de la clase Mascota.")

    def mostrar_mascotas(self):
        print(f"{self.nombre} tiene las siguientes mascotas:")
        for mascota in self.mascotas:
            print(f"- {mascota.nombre} ({mascota.especie})")

class Mascota:
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie
        self.dueno = None

    def asignar_dueno(self, dueno):
        if isinstance(dueno, Dueno):
            self.dueno = dueno
        else:
            print("¡Error! Solo puedes asignar instancias de la clase Dueño como dueño")

    def mostrar_dueno(self):
        if self.dueno:
            print(f"{self.nombre} es propiedad de {self.dueno.nombre}.")
        else:
            print(f"{self.nombre} no tiene dueño")