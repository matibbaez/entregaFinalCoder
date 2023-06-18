let vuelosEnCarrito = localStorage.getItem("vuelos-en-carrito");
vuelosEnCarrito = JSON.parse(vuelosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoVuelos = document.querySelector("#carrito-vuelos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acc");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-vuelo-eliminar");
const botonVaciar = document.querySelector("#carrito-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-comprar")

// Cargar los vuelos disponibles en el carrito

function cargarVuelosCarrito () {

    if (vuelosEnCarrito && vuelosEnCarrito.length > 0) {
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoVuelos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoVuelos.innerHTML = "";
    
        vuelosEnCarrito.forEach(vuelo => {
            const div = document.createElement("div");
            div.classList.add("carrito-vuelo");
            div.innerHTML = `
                <img class="carrito-vuelo-imagen" src="${vuelo.imagen}" alt="${vuelo.titulo}">
                <div class="carrito-vuelo-titulo">
                    <small>Título</small>
                    <h3>${vuelo.titulo}</h3>
                </div>
                <div class="carrito-vuelo-pasajeros">
                    <small>Pasajeros</small>
                    <p>${vuelo.pasajeros}</p>
                </div>
                <div class="carrito-vuelo-precio">
                    <small>Precio</small>
                    <p>€${vuelo.precio}</p>
                </div>
                <div class="carrito-vuelo-subtotal">
                    <small>Subtotal</small>
                    <p>€${vuelo.precio * vuelo.pasajeros}</p>
                </div>
                <button class="carrito-vuelo-eliminar" id="${vuelo.id}"><i class="bi bi-trash-fill"></i></button>
    
            `;
    
            contenedorCarritoVuelos.append(div);
    
        })
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoVuelos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }

    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarVuelosCarrito();

// Actualizar el boton eliminar

function actualizarBotonesEliminar () {
    botonEliminar = document.querySelectorAll(".carrito-vuelo-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

// Eliminar del carrito

function eliminarDelCarrito (e) {
    Toastify({
        text: "Vuelo eliminado",
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

    let idBoton = e.currentTarget.id;
    const index = vuelosEnCarrito.findIndex(vuelo => vuelo.id === idBoton);

    vuelosEnCarrito.splice(index, 1);
    cargarVuelosCarrito();

    localStorage.setItem("vuelos-en-carrito", JSON.stringify(vuelosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

// Vaciar el carrito 

function vaciarCarrito () {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a eliminar ${vuelosEnCarrito.reduce((acc, vuelo) => acc + vuelo.pasajeros, 0)} vuelos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Sí',
        cancelButtonText:
          'No',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          vuelosEnCarrito.length = 0;
          localStorage.setItem("vuelos-en-carrito", JSON.stringify(vuelosEnCarrito));
          cargarVuelosCarrito();
        } 
    })
}

// Actualizar el total de vuelos

function actualizarTotal () {
    const totalCalculado = vuelosEnCarrito.reduce((acc, vuelo) => acc + (vuelo.precio * vuelo.pasajeros), 0);
    total.innerText = `€${totalCalculado}`;
}

// Boton "comprar"

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito () {

    Swal.fire({
        title: 'Confirmar compra',
        icon: 'success',
        html: `Comprarás ${vuelosEnCarrito.reduce((acc, vuelo) => acc + vuelo.pasajeros, 0)} vuelos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Sí',
        cancelButtonText:
          'No',
    }).then((result) => {
        if (result.isConfirmed) {
            vuelosEnCarrito.length = 0;
            localStorage.setItem("vuelos-en-carrito", JSON.stringify(vuelosEnCarrito));
        
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoVuelos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
        } 
    })

    // vuelosEnCarrito.length = 0;
    // localStorage.setItem("vuelos-en-carrito", JSON.stringify(vuelosEnCarrito));

    // contenedorCarritoVacio.classList.add("disabled");
    // contenedorCarritoVuelos.classList.add("disabled");
    // contenedorCarritoAcciones.classList.add("disabled");
    // contenedorCarritoComprado.classList.remove("disabled");
}
