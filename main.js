let url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }

    modificarNav();
}


function modificarNav() {
    let headers = document.getElementsByClassName("nav-link");
    let headersIni = headers;
    for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener("click", mostrarProductos(headers[i].id));
    }

    let navitems = document.getElementsByClassName("nav-item");

    for (let i = 0; i < navitems.length; i++) {
        console.log(navitems[i]);
        navitems[i].appendChild(headers[i]);
    }



}

function mostrarProductos(id) {

    let nombreCate = document.getElementById(id).value;

}