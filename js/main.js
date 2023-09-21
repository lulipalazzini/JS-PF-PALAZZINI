/* Array de productos */
function productosOriginal(productosJSON) {
  let productosPetShop = productosJSON;

  let buscarInput = document.getElementById("busqueda");
  let buscarBoton = document.getElementById("botonLupita");
  buscarBoton.addEventListener("click", () =>
    buscarProducto(productosPetShop, buscarInput, carrito)
  );

  let filtroAnimal = document.getElementsByClassName("catDog");
  for (const filtro of filtroAnimal) {
    filtro.addEventListener("click", () =>
      filtrarProducto(productosPetShop, filtro, carrito)
    );
  }

  let visibilidadCarrito = document.getElementById("verCarrito");
  visibilidadCarrito.addEventListener("click", visibilidad);

  let carrito = [];
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }

  let finCompra = document.getElementById("botonCompra");
  finCompra.addEventListener("click", finalizarCompra);

  carritoRender(carrito);
  tarjetasRender(productosPetShop, carrito);
}
/* Fin array de productos */

function buscarProducto(productos, busqueda, carrito) {
  let textoBusqueda = busqueda.value.toLowerCase();
  let filtroBuscar = productos.filter((producto) =>
    producto.producto.includes(textoBusqueda)
  );
  tarjetasRender(filtroBuscar);
}

function filtrarProducto(productos, fil, carrito) {
  let botonAnimal = fil.value.toLowerCase();
  let filtroFiltrar = productos.filter((producto) =>
    producto.animal.includes(botonAnimal)
  );
  tarjetasRender(filtroFiltrar);
}

function tarjetasRender(productos, carrito) {
  let containerProductos = document.getElementById("productos");
  containerProductos.innerHTML = "";
  productos.forEach((prod) => {
    let productoCard = document.createElement("div");
    productoCard.className = "tarjetas";
    productoCard.innerHTML = `
    <img src="./imagenes/productos/${prod.img}" />
    <h3>${prod.producto}</h3>
    <p>$${prod.precio}</p>
    <button class=addCarrito id=${prod.id} ><i class="fa-solid fa-cart-plus"></i> Agregar al carrito</button>
  `;
    containerProductos.appendChild(productoCard);

    let agregarCarrito = document.getElementById(prod.id);
    agregarCarrito.addEventListener("click", (e) =>
      agregadoAlCarrito(productos, e, carrito)
    );
  });
}

function finalizarCompra() {
  localStorage.removeItem("carrito");
  alertaFinCompra(
    "Compra finalizada",
    "Gracias por confiar en PetShopping",
    "success"
  );
  carritoRender();
}

function visibilidad() {
  document.getElementById("visibilidad").classList.toggle("ocultar");
  document.getElementById("carritoBoton").classList.toggle("ocultar");
}

function agregadoAlCarrito(productos, evento, carrito) {
  let productoNuevo = productos.find(
    (prod) => prod.id === Number(evento.target.id)
  );
  let productoEnCarrito = carrito.find((prod) => prod.id === productoNuevo.id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    productoEnCarrito.precioTotal =
      productoEnCarrito.cantidad * productoEnCarrito.precioUnidad;
  } else {
    carrito.push({
      id: productoNuevo.id,
      producto: productoNuevo.producto,
      precioUnidad: productoNuevo.precio,
      cantidad: 1,
      precioTotal: productoNuevo.precio,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  carritoRender(carrito);

  tostadaProducto();
}

function carritoRender(productos) {
  let containerCarrito = document.getElementById("carritoDeCompras");
  containerCarrito.innerHTML = "";
  productos.forEach((prod) => {
    let carritoCard = document.createElement("div");
    carritoCard.className = "carritoCards";
    carritoCard.innerHTML = `
      <p>${prod.producto}</p>
      <p>$${prod.precioUnidad}</p>
      <p>${prod.cantidad}</p>
      <p>$${prod.precioTotal}</p>
    `;
    containerCarrito.appendChild(carritoCard);
  });
}

function tostadaProducto() {
  Toastify({
    text: "¡Producto agregado exitosamente!",
    duration: 1500,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "tostadita",
  }).showToast();
}

function alertaFinCompra(title, text, icon) {
  Swal.fire({
    title,
    text,
    icon,
    color: "#ee82c5",
    iconColor: "#ee82c5",
    confirmButtonText: "Confirmar",
    confirmButtonColor: "#ee82c5",
  });
}

async function infoProductos() {
  try {
    const respuesta = await fetch("/productos.json");
    const productosPS = await respuesta.json();
    productosOriginal(productosPS);
  } catch (error) {
    console.log(error);
  }
}
infoProductos();
