// Seleccionar los botones y campos del formulario
const btnRegister = document.getElementById("login-register"); // Botón de registro
const btnLogin = document.querySelector(".btn"); // Botón de login
const mensajeError = document.getElementById("mensaje-error"); // Div para mostrar mensajes de error

// Evento para el botón de registro
btnRegister.addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página

    // Obtener los valores de los campos
    const username = document.getElementById("user").value.trim();
    const email = document.getElementById("emailR").value.trim();
    const password = document.getElementById("passwordR").value.trim();

    // Validar campos vacíos
    if (!username || !email || !password) {
        mostrarError("Por favor completa todos los campos.");
        return;
    }

    // Llamar a la función para registrar en la base de datos
    try {
        const response = await fetch("http://localhost:3000/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Username: username, Email: email, Password: password }),
        });

        const result = await response.json();

        if (result.success) {
            mostrarExito("Usuario registrado correctamente.");
        } else {
            mostrarError(result.message);
        }
    } catch (error) {
        mostrarError("Error al conectar con el servidor.");
        console.error("Error en el registro:", error);
    }
});

// Evento para el botón de inicio de sesión
btnLogin.addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar que el formulario recargue la página

    // Obtener los valores de los campos
    const email = document.getElementById("USER").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar campos vacíos
    if (!email || !password) {
        mostrarError("Por favor completa todos los campos.");
        return;
    }

    // Llamar a la función para iniciar sesión
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (result.success) {
            mostrarExito("Inicio de sesión exitoso. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "inicio.html"; // Redirigir al usuario
            }, 2000);
        } else {
            mostrarError(result.message);
        }
    } catch (error) {
        mostrarError("Error al conectar con el servidor.");
        console.error("Error en el inicio de sesión:", error);
    }
});

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    mensajeError.innerText = mensaje;
    mensajeError.style.color = "red";
    mensajeError.style.display = "block";
}

// Función para mostrar mensajes de éxito
function mostrarExito(mensaje) {
    mensajeError.innerText = mensaje;
    mensajeError.style.color = "green";
    mensajeError.style.display = "block";
}
