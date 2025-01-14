const cuadro = document.querySelector(".cuadro");  // Selecciona el elemento con la clase "cuadro" en el DOM y lo guarda en la constante cuadro.
const loginlink = document.querySelector(".login-link");  // Selecciona el enlace con la clase "login-link" para acceder al login.
const registerlink = document.querySelector(".register-link");  // Selecciona el enlace con la clase "register-link" para acceder al registro.

const btnPopup = document.querySelector(".btnLogin-popup");  // Selecciona el botón con la clase "btnLogin-popup" que abre el popup de login.
const iconClose = document.querySelector(".icon-close");  // Selecciona el ícono de cierre con la clase "icon-close".

const loginbutton = document.querySelector(".btn");  // Selecciona el botón de login con la clase "btn".
const Registrarsebutton = document.querySelector("#login-register");  // Selecciona el botón de registro con el id "login-register".

// Evento para mostrar el cuadro de registro al hacer clic en el enlace de registro.
registerlink.addEventListener("click", () => {
    cuadro.classList.add("active");  // Añade la clase "active" al elemento cuadro para mostrar el formulario de registro.
});

// Evento para mostrar el cuadro de login al hacer clic en el enlace de login.
loginlink.addEventListener("click", () => {
    cuadro.classList.remove("active");  // Elimina la clase "active" del elemento cuadro para mostrar el formulario de login.
});

// Evento para abrir el popup de login al hacer clic en el botón de login.
btnPopup.addEventListener("click", () => {
    cuadro.classList.add("active-popup");  // Añade la clase "active-popup" para mostrar el popup de login.
});

// Evento para cerrar el popup de login al hacer clic en el ícono de cerrar.
iconClose.addEventListener("click", () => {
    cuadro.classList.remove("active-popup");  // Elimina la clase "active-popup" para cerrar el popup de login.
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* BOTON PARA LOGEAR */

// Solo para datos de la PC local. Maneja el evento de clic para el botón de login.
loginbutton.addEventListener("click", (event) => {
    event.preventDefault();  // Previene la acción predeterminada del botón, que sería enviar el formulario.

    const user = document.getElementById("USER").value;  // Obtiene el valor del campo de usuario del formulario de login.
    const password = document.getElementById("password").value;  // Obtiene el valor del campo de contraseña del formulario de login.

    console.log("USERNAME: " + user + ". PASSWORD: " + password);  // Muestra en consola el usuario y la contraseña ingresados.

    flaglogin = iniciarSesion(user, password);  // Llama a la función iniciarSesion para verificar si las credenciales son correctas.
    
    if (flaglogin == true) {
        window.location.href = "inicio.html";  // Si el login es exitoso, redirige a la página "inicio.html".
    } else {
        // Muestra un mensaje de error si las credenciales son incorrectas.
        document.getElementById("mensaje-error").innerText = "Usuario o Contraseña incorrecta";  // Establece el mensaje de error.
        document.getElementById("mensaje-error").style.display = "block";  // Muestra el mensaje de error.
    }
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* BOTON PARA REGISTRARSE */

// Solo para datos de la PC local. Maneja el evento de clic para el botón de registro.
Registrarsebutton.addEventListener("click", (event) => {
    event.preventDefault();  // Previene el comportamiento predeterminado de enviar el formulario.

    const username = document.getElementById("user").value;  // Obtiene el valor del campo de nombre de usuario.
    const email = document.getElementById("emailR").value;  // Obtiene el valor del campo de email.
    const password = document.getElementById("passwordR").value;  // Obtiene el valor del campo de contraseña.

    const registrado = registrarusuario(username, email, password);  // Llama a la función registrarusuario para intentar registrar al usuario.

    if (registrado) {
        // Si el registro fue exitoso, crea un mensaje de éxito dinámicamente.
        const mensaje = document.createElement("div");
        mensaje.id = "mensaje-registro";  // Asigna un id al nuevo elemento.
        mensaje.style.color = "green";  // Establece el color del mensaje a verde.
        mensaje.style.marginTop = "10px";  // Añade un margen superior.
        mensaje.textContent = "Cuenta registrada, ya puede iniciar sesión.";  // Establece el texto del mensaje.

        const formRegistro = document.querySelector(".form-box.register");  // Selecciona el formulario de registro.
        formRegistro.appendChild(mensaje);  // Añade el mensaje al formulario de registro.

        // Asegúrate de ocultar cualquier mensaje de error previo.
        const mensajeError = document.getElementById("mensaje-error");
        if (mensajeError) mensajeError.style.display = "none";  // Oculta el mensaje de error si existe.
    }
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* FUNCION INICIAR SESION */

// Esta función verifica si el usuario existe y si las credenciales son correctas.
function iniciarSesion(user, pass) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtiene la lista de usuarios desde el localStorage o un array vacío si no hay usuarios.

    console.log("Usuarios registrados:", usuarios);  // Muestra en consola los usuarios registrados.

    // Busca un usuario que coincida con el nombre de usuario y la contraseña proporcionados.
    let usuarioExistente = usuarios.find(u => u.user === user && u.password === pass);

    return usuarioExistente ? true : false;  // Si el usuario existe y la contraseña es correcta, devuelve true. Sino, devuelve false.
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* FUNCION REGISTRARSE */

// Esta función registra un nuevo usuario si el nombre de usuario o el email no están ya registrados.
function registrarusuario(user, email, pass) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtiene la lista de usuarios desde el localStorage o un array vacío si no hay usuarios.

    // Verifica si ya existe un usuario con el mismo email o nombre de usuario.
    let usuarioExistente = usuarios.find(u => u.email === email || u.user === user);

    if (usuarioExistente) {
        // Si el usuario o el email ya están registrados, muestra un mensaje de error.
        document.getElementById("mensaje-error").innerText = "Error: el usuario o email ya está registrado.";
        document.getElementById("mensaje-error").style.display = "block";  // Muestra el mensaje de error.
        return false;  // Devuelve false para indicar que el registro no fue exitoso.
    }

    // Si el usuario no existe, agrega al nuevo usuario al array de usuarios.
    usuarios.push({ user, email, password: pass });

    // Guarda el array actualizado de usuarios en el localStorage.
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Usuario registrado correctamente:", { user, email, pass });  // Muestra en consola que el usuario fue registrado correctamente.
    return true;  // Devuelve true para indicar que el registro fue exitoso.
}
