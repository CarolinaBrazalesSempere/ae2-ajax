const URL_DESTINO = "http://localhost:5501/AE-2/Requerimiento1/";
const RECURSO = "datosPizzeria.json";

let formulario = document.getElementById("formulario");

//variable "id" de inputs
let nombre = document.getElementById("nombre");
let direccion = document.getElementById("direccion");
let telefono = document.getElementById("telefono");
let email = document.getElementById("email");

let alerta = document.getElementById("alerta");
let boton = document.getElementById("botonProcesar");

///Realiza una solicitud AJAX para cargar los datos JSON
function cargarDatosJSON() {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onload = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        tamaños(this.responseText);
        ingredientes(this.responseText);
        precio(this.responseText)
      }
    }
  };
  xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
  xmlHttp.send();
}
///Realiza una solicitud AJAX para cargar los datos JSON
boton.addEventListener("click", function cargarDatosJSON() {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onload = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        precio(this.responseText)
      }
    }
  };
  xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
  xmlHttp.send();
});

function validacionInput() {
  if (
    nombre.value.trim() == "" ||
    direccion.value.trim() == "" ||
    telefono.value.trim() == "" ||
    email.value.trim() == ""
  ) {
    alerta.style.display = "block";
    return false;
  } else {
    alerta.style.display = "none";
    return true;
  }
}

///Funcion para los tamaños
function tamaños(jsonDoc) {
  var objetoJson = JSON.parse(jsonDoc);
  var formulario = document.getElementById("formulario");

  var tamaArray = objetoJson.tamaños
  var divTama = document.getElementById("tamaños")

  for (var tama of tamaArray){
    var tamaLabel = document.createElement("label")
    var contenidoLabelTama = document.createTextNode(tama.nombre)

    var tamaInput = document.createElement("input")
    tamaInput.type = "radio"
    tamaInput.name = "tamaños"
    tamaInput.id = tama.nombre

    tamaLabel.appendChild(contenidoLabelTama)
    divTama.appendChild(tamaInput)
    divTama.appendChild(tamaLabel)
    formulario.appendChild(divTama)
  }
}

//
//funcion para los ingredientes
function ingredientes(jsonDoc) {
  var objetoJson = JSON.parse(jsonDoc);
  var ingrArray = objetoJson.ingredientes
  var divIngr = document.getElementById("ingredientes")

  for (var ingr of ingrArray){
    var ingrLabel = document.createElement("label")
    var contenidoLabel = document.createTextNode(ingr.nombre)

    var ingrInput = document.createElement("input")
    ingrInput.type = "checkbox"
    ingrInput.name = "ingredientes"
    ingrInput.id = ingr.nombre

    ingrLabel.appendChild(contenidoLabel)
    divIngr.appendChild(ingrInput)
    divIngr.appendChild(ingrLabel)
    formulario.appendChild(divIngr)
    formulario.appendChild(botonProcesar)
    formulario.appendChild(botonRefrescar)
  }
}

//Funcion para sacar el precio de los ingredientes
function precio(jsonDoc) {
  var objetoJson = JSON.parse(jsonDoc);
  var totalPrecio = 0;
  var ingrArray = objetoJson.ingredientes;
  var tamaArray = objetoJson.tamaños;

  var totalTam = 0
  var totalIng = 0
  
  for (let tama of tamaArray){
    let tamaImput = document.getElementById(tama.nombre);
    if (tamaImput.checked){
      totalTam += parseFloat(tama.precio);
    }
  }
  for (let ingr of ingrArray){
    let inputIngr = document.getElementById(ingr.nombre);
    if (inputIngr.checked){
      totalIng += parseFloat(ingr.precio);
    }
  }

  totalPrecio = totalTam + totalIng
  totalPrecio += "€";
  alert(`El total del pedido es : ${totalPrecio}`);

  console.log(objetoJson)
}

//Funcion para refrescar la pagina entera
function refrescar() {
  location.reload();
}

var btnRefrescar = document.getElementById("botonRefrescar");

btnRefrescar.onclick = function () {
  refrescar();
};


formulario.onsubmit = validacionInput;
boton.onclick = function () {
  if (validacionInput()) {
    precio();
  }
};
//llamamos a la funcion para cargar los datos de nuestro archivo JSON
cargarDatosJSON();

//////////////////////////////////////////////////////////////////////////
