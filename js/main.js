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

login();
