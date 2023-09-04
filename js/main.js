/* Array de productos */
function productosOriginal() {
  let productosPetShop = [
    {
      id: 1,
      producto: "bowl acero",
      categoria: "comederos",
      precio: 2000,
      animal: "ambos",
      img: "bowlAcero.jpg",
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
      animal: "ambos",
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
      img: "collarGato.jpg",
    },
    {
      id: 8,
      producto: "peluche",
      categoria: "juguetes",
      precio: 1000,
      animal: "ambos",
      img: "juguetePeluche.jpg",
    },
    {
      id: 9,
      producto: "pelota dura",
      categoria: "juguetes",
      precio: 700,
      animal: "ambos",
      img: "juguetePelota.jpg",
    },
    {
      id: 10,
      producto: "hueso duro",
      categoria: "juguetes",
      precio: 900,
      animal: "perro",
      img: "jugueteHueso.jpg",
    },
    {
      id: 11,
      producto: "pelota con soga",
      categoria: "juguetes",
      precio: 1200,
      animal: "perro",
      img: "jugueteSoga.jpg",
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
      img: "jugueteRaton.jpg",
    },
    {
      id: 14,
      producto: "rascador",
      categoria: "juguetes",
      precio: 1800,
      animal: "gato",
      img: "rascador.jpg",
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
      img: "bandejaSanitaria.jpg",
    },
    {
      id: 18,
      producto: "cucha grande",
      categoria: "otros",
      precio: 4500,
      animal: "ambos",
      img: "cuchaGrande.jpg",
    },
    {
      id: 19,
      producto: "cucha pequeña",
      categoria: "otros",
      precio: 3500,
      animal: "ambos",
      img: "cuchaChica.jpg",
    },
  ];

  let buscarInput = document.getElementById("busqueda");
  let buscarBoton = document.getElementById("botonLupita");
  /*   buscarBoton.addEventListener("click", buscarProducto);
   */ buscarBoton.addEventListener("click", () =>
    buscarProducto(productosPetShop, buscarInput)
  );

  tarjetasRender(productosPetShop);
}
productosOriginal();
/* Fin array de productos */

function buscarProducto(productos, busqueda) {
  let textoBusqueda = busqueda.value.toLowerCase();
  let filtroBuscar = productos.filter((producto) =>
    producto.producto.includes(textoBusqueda)
  );
  tarjetasRender(filtroBuscar);
}

function tarjetasRender(productos) {
  let container = document.getElementById("productos");
  container.innerHTML = "";
  productos.forEach((prod) => {
    let productoCard = document.createElement("div");
    productoCard.className = "tarjetas";
    productoCard.innerHTML = `
    <img src="./imagenes/productos/${prod.img}" />
    <h3>${prod.producto}</h3>
    <p>$${prod.precio}</p>
  `;
    container.appendChild(productoCard);
  });
}

/* const carritoDeCompras = [];

const opciones = `¿Que desea hacer?\n1. Ver lista de productos\n2. Buscar producto\n3. Filtrar por categoria\n4. Agregar al carrito\n5. Finalizar la compra\n6. Salir`;
let opcionInicio;

while (opcionInicio != 6) {
  opcionInicio = Number(prompt(`Bienvenido a PetShopping\n${opciones}`));
  if (opcionInicio === 1) {
    alert(opcionUno(productosPerro));
  } else if (opcionInicio === 2) {
    let buscaId = Number(
      prompt(
        `Ingrese el ID del producto que busca\n${opcionUno(productosPerro)}`
      )
    );
    opcionDos(buscaId);
  } else if (opcionInicio === 3) {
    let busqProducto = prompt(
      `¿Que categoria esta buscando?\nComederos, paseo o juguetes`
    ).toLowerCase();
    opcionTres(busqProducto);
  } else if (opcionInicio === 4) {
    let buscaId = Number(
      prompt(
        `Ingrese el ID del producto que busca\n${opcionUno(productosPerro)}`
      )
    );
    opcionCuatro(carritoDeCompras, buscaId);
  } else if (opcionInicio === 5) {
    let totalDeCompra = carritoDeCompras.reduce(
      (acumulador, productosPerro) =>
        acumulador + productosPerro.subtotalCompra,
      0
    );
    alert(`El total de su compra es ${totalDeCompra}`);
  }
}

function opcionUno(productosPerro) {
  let listaProductos = productosPerro
    .map((producto) => `ID: ${producto.id} - Producto: ${producto.producto}`)
    .join("\n");
  return listaProductos;
}

function opcionDos(buscaId) {
  let buscaProducto = productosPerro.find(
    (producto) => producto.id === buscaId
  );
  alert(
    `Producto: ${buscaProducto.producto}\nPrecio: ${buscaProducto.precio}\nCategoria: ${buscaProducto.categoria}`
  );
}

function opcionTres(busqProducto) {
  let prodFiltrado = productosPerro.filter(
    (producto) => producto.categoria === busqProducto
  );
  let listaFiltro = prodFiltrado.map(
    (producto) =>
      `ID: ${producto.id} - Producto: ${producto.producto} - Categoria: ${producto.categoria}`
  );
  alert(listaFiltro.join("\n"));
}

function opcionCuatro(carritoDeCompras, buscaId) {
  let buscaProducto = productosPerro.find(
    (producto) => producto.id === buscaId
  );
  let carritoProducto = carritoDeCompras.find(
    (producto) => producto.id === buscaId
  );
  if (carritoProducto) {
    carritoProducto.unidades++;
    carritoProducto.subtotalCompra =
      carritoProducto.precio * carritoProducto.unidades;
  } else {
    carritoDeCompras.push({
      id: buscaProducto.id,
      producto: buscaProducto.producto,
      unidades: 1,
      precio: buscaProducto.precio,
      subtotalCompra: buscaProducto.precio,
    });
  }
  console.log(carritoDeCompras);
}
 */
