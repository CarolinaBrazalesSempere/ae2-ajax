const urlDestino = "http://localhost:5500/";
const recurso = "ae2_json.json";

let recargar = document.getElementById("recargar");
let procesar = document.getElementById("procesar");

// Funcion que al cargar el DOM muestra los datos del formulario del JSON.
window.onload = function cargar() {
  const xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", urlDestino + recurso, true); // true indica que es una peticion asincrona
  xmlHttp.send();

  xmlHttp.onload = function () {
    pintarTam(this.responseText); // Llama a la funcion pintarTam
    pintarIng(this.responseText); // Llama a la funcion pintarIng
  };

  xmlHttp.onerror = function () {
    alert("ERROR");
  };
};

// Funcion que muestra los tamaños de pizza del JSON
function pintarTam(json) {
  let jsonObj = JSON.parse(json);
  let arrayTam = jsonObj.PIZZASINFO.TAMANOS;

  for (let tam of arrayTam) {
    let tamInput = document.createElement("input");
    tamInput.id = tam.SIZE;
    tamInput.type = "radio";

    let tamLabel = document.createElement("label");
    let contTamLabel = document.createTextNode(tam.SIZE);

    tamLabel.appendChild(contTamLabel);

    divTam.appendChild(tamInput);

    divTam.appendChild(tamLabel);
  }
}

// Funcion que muestra los ingredientes de pizza del JSON
function pintarIng(json) {
  let jsonObj = JSON.parse(json);
  let arrayIng = jsonObj.PIZZASINFO.INGREDIENTES;

  for (let ing of arrayIng) {
    let ingInput = document.createElement("input");
    ingInput.id = ing.NAME;
    ingInput.type = "checkbox";

    let ingLabel = document.createElement("label");
    let contIngLabel = document.createTextNode(ing.NAME);

    ingLabel.appendChild(contIngLabel);

    divIng.appendChild(ingInput);

    divIng.appendChild(ingLabel);
  }
}

// Funcion que recarga la página
recargar.addEventListener("click", function botonRecargar() {
  location.reload();

  alert("¡Página recargada con éxito!");
});

// Función que al pulsar el boton "procesar" muestra el precio total del pedido
procesar.addEventListener("click", function botonProcesar() {
  const xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", urlDestino + recurso, true); // true indica que es una peticion asincrona
  xmlHttp.send();

  xmlHttp.onload = function () {
    calcularPrecio(this.responseText); // Llama a la funcion calcularPrecio
  };

  xmlHttp.onerror = function () {
    alert("ERROR");
  };
});

// Funcion que calcula el precio total del tamaño de pizza y de los ingredientes elegidos
function calcularPrecio(json) {
  let jsonObj = JSON.parse(json);
  let arrayTam = jsonObj.PIZZASINFO.TAMANOS;
  let arrayIng = jsonObj.PIZZASINFO.INGREDIENTES;
  let totalTam = 0;
  let totalIng = 0;
  let totalPrecio = 0;

  // Nos da el precio del tamaño de pizza elegido
  for (let tam of arrayTam) {
    let tamInput = document.getElementById(tam.SIZE);

    if (tamInput.checked) {
      totalTam += parseFloat(tam.PRICE); // Parseamos el precio para que la suma se ejecute correctamente
    }
  }

  // Nos da el precio de los ingredientes elegidos
  for (let ing of arrayIng) {
    let ingInput = document.getElementById(ing.NAME);

    if (ingInput.checked) {
      totalIng += parseFloat(ing.PRICE); // Parseamos el precio para que la suma se ejecute correctamente
    }
  }

  // Suma el precio del tamaño de pizza y de los ingredientes
  totalPrecio = totalTam + totalIng;

  alert(`¡Nos debes ${totalPrecio} €!`);
}
