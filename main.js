let url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let listaCompras = {};

async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    //console.log(data);

    inicializarCards(data);

    let headers = document.getElementsByClassName("nav-link");

    for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', function () {
            mostrarProductos(headers[i], data);
        });
    }
}


function inicializarCards(data) {
    productos = data[0].products;
    for (let j = 0; j < productos.length; j++) {
        crearCard(productos[j].image, productos[j].name, productos[j].description, productos[j].price);
    }
}


function mostrarProductos(element, data) {
    let divCards = document.getElementById("cards");

    divCards.innerHTML = "";

    let titulo = document.getElementById("titulo");

    let textoProducto = element.innerHTML;

    titulo.innerHTML = textoProducto;

    for (let i = 0; i < data.length; i++) {
        if (data[i].name === textoProducto) {
            productos = data[i].products
            for (let j = 0; j < productos.length; j++) {
                crearCard(productos[j].image, productos[j].name, productos[j].description, productos[j].price);
            }
        }
    }



}

function crearCard(imagen, titulo, cuerpo, precio) {
    let divCards = document.getElementById("cards");

    let divCardcol= document.createElement("div");
    divCardcol.className="col-3 d-flex align-items-stretch";

    let divCardUnico = document.createElement('div');
    divCardUnico.className = "card";
    divCardUnico.style = "width: 18rem;";
    let img = document.createElement('img');
    img.className = "card-img-top";
    img.src = imagen;
    //img.style="width: 600;heigth: 400; ";
    let divCardBody = document.createElement('div');
    divCardBody.className = "card-body";
    let titulacho = document.createElement('h5');
    titulacho.innerHTML = titulo;
    titulacho.className = "card-title";
    let contenido = document.createElement('p');
    contenido.innerHTML = cuerpo;
    contenido.className = "card-text";
    let precioTitulo = document.createElement('h4');
    precioTitulo.innerHTML = "$" + precio;
    precioTitulo.className = "card-text-bold";
    let boton = document.createElement('a');
    boton.className = "btn btn-dark";
    boton.onclick = agregarProductosCarrito;
    boton.innerHTML = "Add to Cart";
    divCardBody.appendChild(titulacho);
    divCardBody.appendChild(contenido);
    divCardBody.appendChild(precioTitulo);
    divCardBody.appendChild(boton);
    divCardUnico.appendChild(img);
    divCardUnico.appendChild(divCardBody);
    divCardcol.appendChild(divCardUnico);

    divCards.appendChild(divCardcol);

}

function agregarProductosCarrito(element) {
    let itemsTxt = document.getElementById("items");

    let numero = parseInt(itemsTxt.innerHTML.split(" ")[0]);

    itemsTxt.innerHTML = (numero + 1) + " items";

    let nombreProd = element.target.parentElement.children[0].innerHTML;

    let precioProd = element.target.parentElement.children[2].innerHTML;

    let encuentra = "no";

    for (let producto of Object.keys(listaCompras)) {
        if (producto === nombreProd) {
            listaCompras[nombreProd].cantidad = listaCompras[nombreProd].cantidad + 1;
            encuentra = "si";
            break;
        }

    }
    if (encuentra === "no") {
        listaCompras[nombreProd] = { "precio": precioProd, "cantidad": 1 };
    }

}
function cancelarOrden(element) {
    let itemsTxt = document.getElementById("items");

    itemsTxt.innerHTML = "0 items";

    listaCompras = {};

    mostrarCompras();
}

function confirmarOrden(element) {
    let listaPunto6 = []
    let count = 0
    for (let producto of Object.keys(listaCompras)) {
        let actual = {}
        actual['item'] = count;
        actual['quantity'] = listaCompras[producto].cantidad;
        actual['description'] = producto;
        actual['unitPrice'] = listaCompras[producto].precio;
        listaPunto6.push(actual);
        count = count + 1;
    }
    console.log(listaPunto6);
}

function agregarDesdeCarrito(element) {
    let itemsTxt = document.getElementById("items");

    let numero = parseInt(itemsTxt.innerHTML.split(" ")[0]);

    itemsTxt.innerHTML = (numero + 1) + " items";

    let nombreElemento = element.target.parentElement.parentElement.children[2].innerHTML;
    let encuentra = "no";

    for (let producto of Object.keys(listaCompras)) {
        if (producto === nombreElemento) {
            listaCompras[nombreElemento].cantidad = listaCompras[nombreElemento].cantidad + 1;
            encuentra = "si";
            break;
        }

    }
    if (encuentra === "no") {
        listaCompras[nombreProd] = { "precio": precioProd, "cantidad": 1 };
    }

    mostrarCompras();
}


function eliminarDesdeCarrito(element) {
    let itemsTxt = document.getElementById("items");

    let numero = parseInt(itemsTxt.innerHTML.split(" ")[0]);

    itemsTxt.innerHTML = (numero - 1) + " items";
    let nombreElemento = element.target.parentElement.parentElement.children[2].innerHTML;
    let encuentra = "no";

    for (let producto of Object.keys(listaCompras)) {
        if (producto === nombreElemento) {

            if (listaCompras[nombreElemento].cantidad == 1) {
                delete listaCompras[nombreElemento];
            }
            else {
                listaCompras[nombreElemento].cantidad = listaCompras[nombreElemento].cantidad - 1;
            }
            encuentra = "si";

            break;
        }

    }
    if (encuentra === "no") {
        listaCompras[nombreProd] = { "precio": precioProd, "cantidad": 1 };
    }

    mostrarCompras();
}

function mostrarCompras() {
    //console.log(listaCompras);

    let divCards = document.getElementById("cards");

    divCards.innerHTML = "";

    let titulo = document.getElementById("titulo");

    let textoProducto = "Order Detail";

    titulo.innerHTML = textoProducto;

    let tabla = document.createElement("table");
    tabla.className = "table table-stripped align-middle";
    tabla.id = "myTabla";
    let tblBody = document.createElement("tbody");

    let hilera1 = document.createElement("tr");
    let header = document.createElement("th");
    header.textContent = "Item";
    let header1 = document.createElement("th");
    header1.textContent = "Qty.";
    let header2 = document.createElement("th");
    header2.textContent = "Description";
    let header3 = document.createElement("th");
    header3.textContent = "Unit Price";
    let header4 = document.createElement("th");
    header4.textContent = "Amount";
    let header5 = document.createElement("th");
    header5.textContent = "Modify";
    hilera1.appendChild(header);
    hilera1.appendChild(header1);
    hilera1.appendChild(header2);
    hilera1.appendChild(header3);
    hilera1.appendChild(header4);
    hilera1.appendChild(header5);

    tblBody.appendChild(hilera1);

    let count = 1;
    // Crea las celdas
    let total = 0;
    for (let producto of Object.keys(listaCompras)) {
        // Crea las hileras de la tabla
        let hilera = document.createElement("tr");

        let datosFila = listaCompras[producto];


        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        let celda = document.createElement("td");
        let txtNum = document.createTextNode(count);
        celda.appendChild(txtNum);
        let celda1 = document.createElement("td");
        let txtCant = document.createTextNode(datosFila.cantidad);
        celda1.appendChild(txtCant);
        let celda2 = document.createElement("td");
        let txtProdu = document.createTextNode(producto);
        celda2.appendChild(txtProdu);
        let celda3 = document.createElement("td");
        let txtPrecio = document.createTextNode((datosFila.precio).split("$")[1]);
        celda3.appendChild(txtPrecio);
        let celda4 = document.createElement("td");
        total = total + parseFloat((datosFila.precio).split("$")[1]) * parseInt(datosFila.cantidad);
        let txtTotal = document.createTextNode(parseFloat(((datosFila.precio).split("$")[1]) * parseInt(datosFila.cantidad)).toFixed(2));
        celda4.appendChild(txtTotal);
        let celda5 = document.createElement("td");
        
        //let divButton = document.createElement("div");
        //divButton.className = "row";

        let buttonMas = document.createElement("button");
        buttonMas.textContent = "+";
        buttonMas.style="width: 25%;";
        buttonMas.className="btn btn-dark";
        buttonMas.onclick = agregarDesdeCarrito;
        let buttonMenos = document.createElement("button");
        buttonMenos.textContent = "-";
        buttonMenos.className="btn btn-dark";
        buttonMenos.style="width: 25%; margin-left:5px;";
        buttonMenos.onclick = eliminarDesdeCarrito;
        //divButton.appendChild(buttonMas);
        //divButton.appendChild(buttonMenos);
        celda5.appendChild(buttonMas);
        celda5.appendChild(buttonMenos);




        hilera.appendChild(celda);
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        hilera.appendChild(celda3);
        hilera.appendChild(celda4);
        hilera.appendChild(celda5);


        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
        count = count + 1;
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    divCards.appendChild(tabla);

    let divRowBotonesFInal = document.createElement("div");
    divRowBotonesFInal.className = "row";

    let divTxtCol = document.createElement("div");
    divTxtCol.className = "col-9";

    let txtTotal = document.createTextNode("Total: $" + total.toFixed(2));
    divTxtCol.appendChild(txtTotal);
    divRowBotonesFInal.appendChild(divTxtCol);

    let divButton1 = document.createElement("div");
    divButton1.className = "col-3";
    divButton1.style="";

    let buttonCancel = document.createElement("button");
    buttonCancel.type = "button";
    buttonCancel.className = "btn";
    buttonCancel.setAttribute("data-toggle", "modal");
    buttonCancel.setAttribute("data-target", "#exampleModal");
    buttonCancel.style="background-color:#FFA3A3;";
    buttonCancel.id = "triggerElement";
    buttonCancel.innerHTML = "Cancel";

    //buttonCancel.onclick= cancelarOrden;

    let buttonConfirm = document.createElement("button");
    buttonConfirm.textContent = "Confirm Order";
    buttonConfirm.className = "btn";
    buttonConfirm.style="background-color:#F5E2A5;margin-left:5px;";
    divButton1.appendChild(buttonCancel);
    divButton1.appendChild(buttonConfirm);
    divButton1.onclick = confirmarOrden;

    divRowBotonesFInal.appendChild(divButton1);

    divCards.appendChild(divRowBotonesFInal);
}






getapi(url);