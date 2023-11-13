const URL_DESTINO = "http://localhost:5500/";
const RECURSO = "pizzeria.json";

let tamaños = document.querySelector("#tamaños");
let ingredientes = document.querySelector("#ingredientes");
let tamañoContainer = document.getElementById("tamaño");
let ingredienteLabel = document.getElementById("ingrediente");
let reloadBtn = document.getElementById("reload");
let totalAmount = document.getElementById("total");

//llamada al servidor para traer los datos nada más cargar la página
window.onload = function ajaxData() {
  const xmlHttp = new XMLHttpRequest();

  xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
  xmlHttp.send();

  xmlHttp.onload = function () {
    getDataIngredients(this.responseText);
    getDataSizes(this.responseText);
  };

  xmlHttp.onerror = function () {
    alert("Algo ha fallado");
  };
};

//refrescar la página trayéndonos de nuevo los datos del servidor por si hubiera actualizaciones
reloadBtn.addEventListener(
  "click",

  function ajaxData() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
    xmlHttp.send();

    xmlHttp.onload = function () {
      location.reload();
    };

    xmlHttp.onerror = function () {
      alert("Algo ha fallado");
    };
  }
);

// calcular el precio total del pedido al clicar en el botón pasándole la función calcPrice
totalAmount.addEventListener(
  "click",

  function ajaxData() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", URL_DESTINO + RECURSO, true);
    xmlHttp.send();

    xmlHttp.onload = function () {
      calcPrice(this.responseText);
    };

    xmlHttp.onerror = function () {
      alert("Algo ha fallado");
    };
  }
);

function getDataIngredients(json) {
  const objJson = JSON.parse(json);

  let ingredients = objJson.ingredientes;

  for (let ingr of ingredients) {
    let label = document.createElement("label");
    let labelText = document.createTextNode(ingr.nombre);

    let inputFields = document.createElement("input");
    inputFields.type = "checkbox";
    inputFields.name = "ingredientes";
    inputFields.value = ingr.nombre;
    label.appendChild(labelText);

    ingredienteLabel.appendChild(label);
    ingredienteLabel.appendChild(inputFields);
  }
}

function getDataSizes(json) {
  const objJson = JSON.parse(json);

  let sizes = objJson.tamaños;

  for (let size of sizes) {
    let label = document.createElement("label");
    let labelText = document.createTextNode(size.nombre);

    let inputFields = document.createElement("input");
    inputFields.type = "radio";
    inputFields.name = "tamaño";
    inputFields.id = size.nombre;
    label.appendChild(labelText);

    tamañoContainer.appendChild(label);
    tamañoContainer.appendChild(inputFields);
  }
}

function calcPrice(json) {
  const objJson = JSON.parse(json);
  let ingredients = objJson.ingredientes;
  let sizes = objJson.tamaños;
  let checkBoxIngr = document.getElementsByName("ingredientes");
  let radioSizes = document.getElementsByName("tamaño");

  let totalPedido = 0;

  for (let i = 0; i < checkBoxIngr.length; i++) {
    if (checkBoxIngr[i].checked) {
      totalPedido += ingredients[i].precio;
    }
  }

  for (let i = 0; i < radioSizes.length; i++) {
    if (radioSizes[i].checked) {
      totalPedido += sizes[i].precio;
    }
  }
  totalPedido += " euros";
  alert(`El total del pedido son: ${totalPedido}`);
}
