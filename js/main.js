let vuelos = [];

fetch("./js/vuelos.json")
    .then(response => response.json())
    .then(data => {
        vuelos = data;
        cargarVuelos(vuelos);
    })

const contenedorVuelos = document.querySelector("#contenedor-vuelos");
let botonesAdd = document.querySelectorAll(".add-to-cart-button");
const numeroCart = document.querySelector("#numero-cart");

// Funcion para cargar los vuelos

function cargarVuelos() {

    vuelos.forEach(vuelo => {

        const div = document.createElement("div");
        div.classList.add("vuelo");
        div.innerHTML = `
            <img id="product-image-wrapper" src="${vuelo.imagen}" alt="${vuelo.titulo}" class="product-image">
            <div class="product-info-container">
                <span class="product-seller">TUVIAJE.COM</span>
                <h3 class="product-title">${vuelo.titulo}</h3>
                <h3 class="product-price">€${vuelo.precio}</h3>
                <button class="add-to-cart-button" id="${vuelo.id}">Agregar al carrito</button>
            </div>
        `

        contenedorVuelos.append(div);
    })

    actualizarBotones();

}

cargarVuelos();

// Funcion para actualizar los botones 

function actualizarBotones () {
    botonesAdd = document.querySelectorAll(".add-to-cart-button");
    botonesAdd.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let vuelosEnCarrito;
let vuelosEnCarritoLS = localStorage.getItem("vuelos-en-carrito");

if (vuelosEnCarritoLS) {
    vuelosEnCarrito = JSON.parse(vuelosEnCarritoLS);
    actualizarNumero();
} else {
    vuelosEnCarrito = [];
}

// Funcion para agregar al carrito

function agregarAlCarrito(e) {
    Toastify({
        text: "Vuelo agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #3a70d1, #33a1b8, #45fce8)",
          borderRadius: "1.25rem"
        },
        offset: {
            x: "1.25rem",
            y: "1.5rem"
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const vueloAgregado = vuelos.find(vuelo => vuelo.id === idBoton);

    if(vuelosEnCarrito.some(vuelo => vuelo.id === idBoton)) {
        const index = vuelosEnCarrito.findIndex(vuelo => vuelo.id === idBoton);
        vuelosEnCarrito[index].cantidades++;
    } else {
        vueloAgregado.cantidades = 1;
        vuelosEnCarrito.push(vueloAgregado);
    }

    actualizarNumero();

    localStorage.setItem("vuelos-en-carrito", JSON.stringify(vuelosEnCarrito));
}

// Funcion para actualizar el número de productos

function actualizarNumero() {
    let numeroVuelo = vuelosEnCarrito.reduce((acc, vuelo) => acc + vuelo.cantidades, 0);
    numeroCart.innerHTML = numeroVuelo;
}








