def main():
    class principal:
        def __init__(self,departamentoID = 0 ,nombreDepartamento = "",usuarioID = 0, nombre = "", 
        correoElectronico = "",EmpleadoID = 0,cargo = "" ,departamentoAsignado = "",
        proyectoID = 0, nombreProyecto = ""):
            self.departamentoID = departamentoID
            self.nombreDepartamento = nombreDepartamento
            self.usuarioID = usuarioID
            self.nombre = nombre
            self.correoElectronico = correoElectronico
            self.EmpleadoID = EmpleadoID
            self.cargp = cargo
            self.departamentoAsignado = departamentoAsignado
            self.proyectoID = proyectoID
            self.nombreProyecto = nombreProyecto
        def get_nombreDepartamento(self):
            return self.__nombreDepartamento
        def get_usuarioID(self):
            return self.__usuarioID 
        def get_nombre(self):
            return self.__nombre
        def get_departamentoID(self):
            return self.__departamentoID
        def get_correoElectronico(self):
            return self.__correoElectronico
        def get_usuarioID(self):
            return self.__EmpleadoID
        def get_cargo(self):
            return self.__cargo
        def get_departamentoAsignado(self):
            return self.__departamentoAsignado
        def get_proyectoID(self):
            return self.__proyectoID 
        def get_nombreProyecto(self):
            return self.__nombreProyecto 
        def set_departamentoID(self,departamentoID):
            self.__departamentoID = departamentoID
        def set_nombreDepartamento(self,nombreDepartamento):
            self.__nombreDepartamento = nombreDepartamento
        def set_usuarioID(self,usuarioID):
            self.__usuarioID = usuarioID
        def set_nombre(self,nombre):
            self.__nombre = nombre
        def set_correoElectronico(self,correoElectronico):
            self.__correoElectronico = correoElectronico
        def set_usuarioID(self,usuarioID):
            self.__EmpleadoID = usuarioID
        def set_cargo(self,cargo):
            self.__cargo = cargo
        def set_departamentoAsignado(self,departamentoAsignado):
            self.__departamentoAsignado = departamentoAsignado
        def set_proyectoID(self,proyectoID):
            self.__proyectoID = proyectoID
        def set_nombreProyecto(self, nombreProyecto):
            self.__nombreProyecto = nombreProyecto
        class usuario:
            def iniciarsesion():
                nombre = "Hector"
                contraseña = 1234
                print("Ingrese sus credenciales")
                print("Ingrese nombre")
                nombreingresado = input()
                print("Ingrese contraseña")
                contraseñaingresada = int(input())                 
                if (nombreingresado == nombre):
                    if( contraseña==contraseñaingresada):
                        print("Haz ingresado")
                else:
                    print("error") 
            def cerrarsesion():
                while True:
                    respuesta = input("¿Quieres cerrar sesión? (si/no): ")
                    if respuesta == "si":
                        print("Sesión cerrada correctamente.")
                        break
                    elif respuesta == "no":
                        print("Cancelado.")
                    else:
                        print("Opción no válida. Por favor responde 'si' o 'no'.") 
            cerrarsesion()

        class departamento:
            pass
        class empleado:
            pass
        class gerente:
            pass
        class administrador:
            pass
        class proyecto:
            pass
main()
        