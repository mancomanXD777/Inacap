from ..Conexion.conexion1 import Conexion


def listar():
    try:
        conex = Conexion()
        print(conex)
        cur = Conexion.cursor()
        cur.execute("select Usuario_ID, Nombre, Correo from usuarios")
        result = cur.fetchall()
        conex.close()
    except:
        print("Error")
    return result

def insertar(Usuario_ID, Nombre, Correo):
    sql = "insert into usuarios (Usuario_ID, Nombre, Correo) values (%s,%s,%s)"
    try:
        conex = Conexion()
        cursor = conex.cursor()
        cursor.execute(sql,(Usuario_ID,Nombre,Correo))
        conex.commit()
        filas = cursor.rowcount
        if filas > 0:
            print("Datos ingresados OK")
        else:
            print("no hubo cambios")
    except:
        print(traceback.print_exc())