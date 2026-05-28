function registrar(){
    var u = document.getElementById("usuarioInput").value;
    var c = document.getElementById("claveInput").value;
    var co = document.getElementById("correoInput").value
    var cv = document.getElementById("claveInputV").value
    var errorDiv = document.getElementById("mensajeError");

if (co.includes("@")){

    if (cv === c){
    errorDiv.innerHTML= "Todo Correcto"
    } 

    else {errorDiv.innerHTML = "Claves No Coincidentes"}
}

else{ errorDiv.innerHTML = "Correo No Valido"
}




}
