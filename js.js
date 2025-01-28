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


/* BOTON PARA LOGEAR 

// Solo para datos de la PC local. Maneja el evento de clic para el botón de login.
loginbutton.addEventListener("click", (event) => {
    event.preventDefault();  // Previene la acción predeterminada del botón, que sería enviar el formulario.

    const user = document.getElementById("USER").value;  // Obtiene el valor del campo de usuario del formulario de login.
    const password = document.getElementById("password").value;  // Obtiene el valor del campo de contraseña del formulario de login.

    console.log("USERNAME: " + user + ". PASSWORD: " + password);  // Muestra en consola el usuario y la contraseña ingresados.

    flaglogin = verificarLogin(user, password);  // Llama a la función iniciarSesion para verificar si las credenciales son correctas.
    
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

/* BOTON PARA REGISTRARSE 

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
        document.getElementById("mensaje-error").style.display = "none"; 
    }
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* REGISTRO LOCAL 

// Esta función maneja el registro de nuevos usuarios, guardándolos en el almacenamiento local (localStorage).
function registrarusuario(user, email, pass) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtiene los usuarios del almacenamiento local o una lista vacía.

    let usuarioExistente = usuarios.find(u => u.email === email || u.user === user);  // Verifica si el usuario o el email ya existen.

    if (usuarioExistente) {  // Si el usuario ya existe, muestra un mensaje de error.
        document.getElementById("mensaje-error").innerText = "Error: el usuario o email ya está registrado.";  // Establece el mensaje de error.
        document.getElementById("mensaje-error").style.display = "block";  // Muestra el mensaje de error.
        return false;  // Impide el registro si el usuario ya existe.
    }

    // Enviar los datos al servidor usando fetch
    fetch('http://localhost:3000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Asegúrate de que el contenido enviado sea de tipo JSON.
        },
        body: JSON.stringify({ Username: user, Email: email, Password: pass })  // Los datos a enviar como JSON.
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {  // Si la respuesta del servidor es exitosa, muestra un mensaje de éxito.
            const mensaje = document.createElement("div");
            mensaje.id = "mensaje-registro";
            mensaje.style.color = "green";
            mensaje.style.marginTop = "10px";
            mensaje.textContent = "Cuenta registrada, ya puede iniciar sesión.";

            const formRegistro = document.querySelector(".form-box.register");
            formRegistro.appendChild(mensaje);
        } else {
            // Si hubo algún error en el servidor, muestra un mensaje de error.
            document.getElementById("mensaje-error").innerText = "Error al registrar el usuario. Intenta de nuevo.";
            document.getElementById("mensaje-error").style.display = "block";
        }
    })
    .catch(error => {
        // Si ocurre un error en la solicitud, muestra un mensaje de error.
        console.error("Error en la solicitud:", error);
        document.getElementById("mensaje-error").innerText = "Error en la conexión con el servidor.";
        document.getElementById("mensaje-error").style.display = "block";
    });

    // Si todo está bien, devuelve true para indicar que el registro fue exitoso.
    return true;
}


// BOTON PARA LOGEAR

loginbutton.addEventListener("click", (event) => {
    event.preventDefault();  // Previene la acción predeterminada del botón, que sería enviar el formulario.

    const user = document.getElementById("USER").value;  // Obtiene el valor del campo de usuario del formulario de login.
    const password = document.getElementById("password").value;  // Obtiene el valor del campo de contraseña del formulario de login.

    console.log("USERNAME: " + user + ". PASSWORD: " + password);  // Muestra en consola el usuario y la contraseña ingresados.

    // Verificar si el usuario está registrado
    const loginExitoso = verificarLogin(user, password);  // Llama a la función verificarLogin para comprobar las credenciales.
    
    if (loginExitoso) {
        window.location.href = "inicio.html";  // Si el login es exitoso, redirige a la página "inicio.html".
    } else {
        // Muestra un mensaje de error si las credenciales son incorrectas.
        document.getElementById("mensaje-error").innerText = "Usuario o Contraseña incorrecta";  // Establece el mensaje de error.
        document.getElementById("mensaje-error").style.display = "block";  // Muestra el mensaje de error.
    }
});

// Función para verificar si el usuario y la contraseña son correctos
function verificarLogin(username, password) {
    // Obtener los usuarios del almacenamiento local (o de una base de datos si es necesario)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtiene los usuarios del almacenamiento local o una lista vacía.

    // Buscar si el usuario ingresado existe en la lista de usuarios
    const usuarioEncontrado = usuarios.find(u => u.user === username && u.password === password);

    // Si el usuario fue encontrado, retorna true; si no, retorna false
    return usuarioEncontrado ? true : false;
}

// FUNCION PARA INICIAR SESIÓN
loginbutton.addEventListener("click", (event) => {
    event.preventDefault();  // Previene la acción predeterminada del botón, que sería enviar el formulario.

    const user = document.getElementById("USER").value;  // Obtiene el valor del campo de usuario del formulario de login.
    const password = document.getElementById("password").value;  // Obtiene el valor del campo de contraseña del formulario de login.

    console.log("USERNAME: " + user + ". PASSWORD: " + password);  // Muestra en consola el usuario y la contraseña ingresados.

    // Realizar una solicitud al backend para verificar el login
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Asegúrate de que el contenido enviado sea de tipo JSON.
        },
        body: JSON.stringify({ Username: user, Password: password })  // Los datos a enviar como JSON.
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {  // Si la respuesta del servidor es exitosa, redirige al usuario.
            window.location.href = "inicio.html";  // Redirige a la página "inicio.html" si el login es exitoso.
        } else {
            // Muestra un mensaje de error si el login no es exitoso.
            document.getElementById("mensaje-error").innerText = data.message;  // Muestra el mensaje del servidor.
            document.getElementById("mensaje-error").style.display = "block";  // Muestra el mensaje de error.
        }
    })
    .catch(error => {
        // Si ocurre un error en la solicitud, muestra un mensaje de error.
        console.error("Error en la solicitud:", error);
        document.getElementById("mensaje-error").innerText = "Error en la conexión con el servidor.";
        document.getElementById("mensaje-error").style.display = "block";
    });
});


function iniciarSesion(user, pass) {
    // Validar si los campos están vacíos
    if (!user || !pass) {
        // Mostrar un mensaje en pantalla si falta completar algún campo
        document.getElementById("mensaje-error").innerText = "Por favor, completa todos los campos.";
        document.getElementById("mensaje-error").style.display = "block";
        return; // Salir de la función sin enviar la solicitud
    }

    // Si los campos están completos, envía la solicitud al servidor
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Asegúrate de enviar datos en formato JSON
        },
        body: JSON.stringify({
            email: user, // Ajusta las claves según lo que espera tu backend
            password: pass,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirigir si el inicio de sesión es exitoso
                window.location.href = "inicio.html";
            } else {
                // Mostrar el mensaje de error devuelto por el servidor
                document.getElementById("mensaje-error").innerText = data.message;
                document.getElementById("mensaje-error").style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            document.getElementById("mensaje-error").innerText = "Error en la conexión con el servidor.";
            document.getElementById("mensaje-error").style.display = "block";
        });
}
*/