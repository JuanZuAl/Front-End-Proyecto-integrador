// Definimos una lista (Array) de objetos. Cada objeto tiene un usuario y una clave.
const usuariosRegistrados = [
    { usuario: "erica@gruporoldan.com.co", clave: "2146" },
    { usuario: "profesor@cesde.edu.co", clave: "1234" }
];

// Variables de control para limitar los intentos de inicio de sesión
let intentosRealizados = 0; // Empieza en 0 cada vez que se carga la página
const maximoIntentos = 3;   // Límite permitido antes de bloquear

function validarAcceso() {
    // Capturamos lo que el usuario escribió en los inputs del HTML
    const userIn = document.getElementById('email').value;
    const passIn = document.getElementById('password').value;
    // Referencia al elemento donde mostraremos los mensajes (éxito o error)
    const status = document.getElementById('mensaje-estado');

    // Variable "bandera" (boolean) para saber si encontramos una coincidencia
    let accesoConcedido = false;

    // Bucle FOR: Recorre la lista de usuarios registrados uno por uno
    for (let i = 0; i < usuariosRegistrados.length; i++) {
        // Comparamos si el correo Y la clave ingresados coinciden con el usuario actual del array
        if (userIn === usuariosRegistrados[i].usuario && passIn === usuariosRegistrados[i].clave) {
            accesoConcedido = true; // Si coinciden, cambiamos el estado a verdadero
            break; // Salimos del bucle inmediatamente, ya no necesitamos seguir buscando
        }
    }

    // Si después del bucle el acceso es verdadero...
    if (accesoConcedido) {
        status.style.color = "#2dd4bf"; // Cambiamos el color del texto a verde agua
        status.innerText = "¡ACCESO CONCEDIDO! Redirigiendo...";
        
        // Esperamos 1.5 segundos (1500ms) antes de cambiar de página
        setTimeout(() => {
            window.location.href = "bienvenido.html"; // Redirección a otra página
        }, 1500);

    } else {
        // Si los datos no coincidieron, sumamos 1 al contador de intentos
        intentosRealizados++;
        let restantes = maximoIntentos - intentosRealizados;

        if (restantes > 0) {
            // Si aún le quedan intentos, mostramos mensaje de advertencia en naranja
            status.style.color = "#ffb84d";
            status.innerText = `Datos incorrectos. Intento ${intentosRealizados} de ${maximoIntentos}.`;
        } else {
            // Si llegó al límite, mostramos error en rojo y bloqueamos la interfaz
            status.style.color = "#ff4d4d";
            status.innerText = "USUARIO BLOQUEADO: Contacte a soporte técnico.";
            
            // Deshabilitamos el botón para que no pueda seguir intentando
            document.getElementById('btn-login').disabled = true;
            document.getElementById('btn-login').style.opacity = "0.5"; // Lo ponemos opaco visualmente
        }
    }
}

// Escuchador de eventos: "Se queda esperando" a que alguien haga clic en el botón
document.getElementById('btn-login').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página (comportamiento por defecto)
    validarAcceso(); // Ejecuta la función de validación
});