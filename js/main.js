/* PREENTREGA 1
const nombreUsuario = "Pepito";
const contra = "1234";
let contador = 3;

function login() {
  do {
    let usuarioIngresado = prompt("Ingrese su nombre de usuario").trim();
    let contraIngresada = prompt("Ingresa tu contraseña").trim();

    if (usuarioIngresado === null || usuarioIngresado === "") {
      alert("Debe ingresar un nombre de usuario");
    } else if (usuarioIngresado == nombreUsuario && contraIngresada == contra) {
      alert(`Bienvenido a PetShopping, ${nombreUsuario}`);
      break;
    } else {
      alert("Contraseña o nombre de usuario incorrectos");
      contador--;
      alert(`Le quedan ${contador} intento/s`);
    }
  } while (contador > 0);
}

login(); */

const productosPerro = [
  { id: 1, producto: "bowl comida", categoria: "comederos", precio: 2000 },
  { id: 2, producto: "correa y pretal", categoria: "paseo", precio: 4000 },
  { id: 3, producto: "correa y collar", categoria: "paseo", precio: 2500 },
  { id: 4, producto: "peluche", categoria: "juguetes", precio: 1000 },
  { id: 5, producto: "pelota dura", categoria: "juguetes", precio: 700 },
];

const carritoDeCompras = [];

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
      `¿Que producto o categoria esta buscando?`
    ).toLowerCase;
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
    (producto) =>
      producto.categoria === busqProducto || producto.producto === busqProducto
  );
  let listaFiltro = prodFiltrado
    .map(
      (producto) =>
        `ID: ${producto.id} - Producto: ${producto.producto} - Categoria: ${producto.categoria}`
    )
    .join("\n");
  alert(listaFiltro);
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
