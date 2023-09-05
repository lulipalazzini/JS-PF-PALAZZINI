/* Array de productos */
function productosOriginal() {
  let productosPetShop = [
    {
      id: 1,
      producto: "bowl acero",
      categoria: "comederos",
      precio: 2000,
      animal: "perro",
      img: "bowlAcero.png",
    },
    {
      id: 2,
      producto: "bowl plegable",
      categoria: "comederos",
      precio: 1500,
      animal: "perro",
      img: "bowlPlegable.jpg",
    },
    {
      id: 3,
      producto: "bowl agua automatico",
      categoria: "comederos",
      precio: 10000,
      animal: "gato",
      img: "bowlAguaAuto.jpg",
    },
    {
      id: 4,
      producto: "pretal con correa",
      categoria: "paseo",
      precio: 4000,
      animal: "perro",
      img: "pretalCorrea.jpg",
    },
    {
      id: 5,
      producto: "collar con correa",
      categoria: "paseo",
      precio: 2500,
      animal: "perro",
      img: "collarCorrea.jpg",
    },
    {
      id: 6,
      producto: "pretal con correa",
      categoria: "paseo",
      precio: 3500,
      animal: "gato",
      img: "pretalGato.jpg",
    },
    {
      id: 7,
      producto: "collar",
      categoria: "paseo",
      precio: 1500,
      animal: "gato",
      img: "collarGato.png",
    },
    {
      id: 8,
      producto: "peluche",
      categoria: "juguetes",
      precio: 1000,
      animal: "perro",
      img: "juguetePeluche.jpg",
    },
    {
      id: 9,
      producto: "pelota dura",
      categoria: "juguetes",
      precio: 700,
      animal: "gato",
      img: "juguetePelota.png",
    },
    {
      id: 10,
      producto: "hueso duro",
      categoria: "juguetes",
      precio: 900,
      animal: "perro",
      img: "jugueteHueso.png",
    },
    {
      id: 11,
      producto: "pelota con soga",
      categoria: "juguetes",
      precio: 1200,
      animal: "perro",
      img: "jugueteSoga.png",
    },
    {
      id: 12,
      producto: "cañita con plumas",
      categoria: "juguetes",
      precio: 1000,
      animal: "gato",
      img: "jugueteCanita.jpg",
    },
    {
      id: 13,
      producto: "ratoncitos",
      categoria: "juguetes",
      precio: 300,
      animal: "gato",
      img: "jugueteRaton.png",
    },
    {
      id: 14,
      producto: "rascador",
      categoria: "juguetes",
      precio: 1800,
      animal: "gato",
      img: "rascador.png",
    },
    {
      id: 15,
      producto: "tunel con colgantes",
      categoria: "juguetes",
      precio: 2500,
      animal: "gato",
      img: "jugueteTunel.jpg",
    },
    {
      id: 16,
      producto: "cubre asientos",
      categoria: "otros",
      precio: 8000,
      animal: "perro",
      img: "cubreAsientos.jpg",
    },
    {
      id: 17,
      producto: "bandeja sanitaria y palita",
      categoria: "otros",
      precio: 3000,
      animal: "gato",
      img: "bandejaSanitaria.png",
    },
    {
      id: 18,
      producto: "cucha grande",
      categoria: "otros",
      precio: 4500,
      animal: "perro",
      img: "cuchaGrande.png",
    },
    {
      id: 19,
      producto: "cucha pequeña",
      categoria: "otros",
      precio: 3500,
      animal: "perro",
      img: "cuchaChica.png",
    },
  ];

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
productosOriginal();
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
