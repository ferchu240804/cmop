const cuadro=document.querySelector(".cuadro")
const loginlink=document.querySelector(".login-link")
const registerlink=document.querySelector(".register-link")

const btnPopup=document.querySelector(".btnLogin-popup")

const iconClose=document.querySelector(".icon-close")

const loginbutton=document.querySelector(".btn")
const Registrarsebutton=document.querySelector("#login-register")


registerlink.addEventListener("click", ()=>{
    cuadro.classList.add("active");
});


loginlink.addEventListener("click", ()=>{
    cuadro.classList.remove("active");
});


btnPopup.addEventListener("click", ()=>{
    cuadro.classList.add("active-popup");
});

iconClose.addEventListener("click", ()=>{
    cuadro.classList.remove("active-popup");
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/* BOTON  PARA LOGEAR   */ 


////DATOS PARA CUALQUIER DISPOSITIVO
loginbutton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("USER").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Inicio de sesión exitoso.") {
                alert("Bienvenido, " + data.user.username);
                window.location.href = "inicio.html";
            } else {
                document.getElementById("mensaje-error").innerText = data.message;
                document.getElementById("mensaje-error").style.display = "block";
            }
        })
        .catch(error => console.error("Error:", error));
});


//// SOLO PARA DATOS DE MI PC
loginbutton.addEventListener("click", (event) =>{
    event.preventDefault();



    const user=document.getElementById("USER").value;
    const password=document.getElementById("password").value;

    console.log("USERNAME: " + user + ". PASSWORD: " + password);

    flaglogin = iniciarSesion(user, password);
    if (flaglogin==true){
        window.location.href="inicio.html"
    } else {
        // Muestra el mensaje en el div
    document.getElementById("mensaje-error").innerText = "Usuario o Contraseña incorrecta";
    document.getElementById("mensaje-error").style.display = "block";  // Muestra el div

    }
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* BOTON PARA REGISTRARSE */

////DATOS PARA CUALQUIER DISPOSITIVO
Registrarsebutton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("user").value;
    const email = document.getElementById("emailR").value;
    const password = document.getElementById("passwordR").value;

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            }
        })
        .catch(error => console.error("Error:", error));
});


/////SOLO PARA DATOS DE MI PC

/*Registrarsebutton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("user").value;
    const email = document.getElementById("emailR").value;
    const password = document.getElementById("passwordR").value;

    const registrado = registrarusuario(username, email, password);

    if (registrado) {
        // Crea el elemento del mensaje dinámicamente
        const mensaje = document.createElement("div");
        mensaje.id = "mensaje-registro";
        mensaje.style.color = "green";
        mensaje.style.marginTop = "10px";
        mensaje.textContent = "Cuenta registrada, ya puede iniciar sesión.";
    
        // Inserta el mensaje en el formulario de registro
        const formRegistro = document.querySelector(".form-box.register");
        formRegistro.appendChild(mensaje);
    
        // Asegúrate de ocultar cualquier mensaje de error previo
        const mensajeError = document.getElementById("mensaje-error");
        if (mensajeError) mensajeError.style.display = "none";
    }
});*/



// ERROR
/*Registrarsebutton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("user").value;
    const email = document.getElementById("emailR").value;
    const password = document.getElementById("passwordR").value;

    console.log("USERNAME: " + username + ", EMAIL: " + email + ", PASSWORD: " + password);
    
});*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- */

/*FUNCION INICAR SESION */

function iniciarSesion(user, pass) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Obtiene los usuarios del localStorage.

    console.log("Usuarios registrados:", usuarios);

    // Verifica si existe un usuario con el nombre de usuario y contraseña proporcionados
    let usuarioExistente = usuarios.find(u => u.user === user && u.password === pass);

    return usuarioExistente ? true : false;
}


// ERROR
/*function iniciarSesion(user, pass){

    let usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("usuarios" + usuarios);

    let usuarioExistente= false;
    usuarioExistente = usuarios.find(u=> u.user==USER);

    console.log("user: " + user + ". PASSWORD: " + pass + ". usuarioExistente: " + usuarioExistente);


    if (usuarioExistente){
        if (usuarios.find(u=> u.user==USER && u.passwordR==password)){
            return true
        } else {
            return false
        } 
    
    } else {
        return false
    }
}*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* FUNCION REGISTRARSE */

function registrarusuario(user, email, pass) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // Obtiene los usuarios existentes o crea un array vacío.

    // Verifica si el email o el username ya existen
    let usuarioExistente = usuarios.find(u => u.email === email || u.user === user);

    if (usuarioExistente) {
        document.getElementById("mensaje-error").innerText = "Error: el usuario o email ya está registrado.";
        document.getElementById("mensaje-error").style.display = "block";
        return false;
    }

    // Agrega el nuevo usuario al array
    usuarios.push({ user, email, password: pass });

    // Guarda el array actualizado en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Usuario registrado correctamente:", { user, email, pass });
    return true;
}








// ERROR
/*function registrarusuario(user,email,pass){
    let usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("usuarios" + usuarios);

    let usuariosRegistrados=true;
    usuariosRegistrados=usuarios.find(u=> u.email==email);

    const usuariosRegistrado= usuarios.find(u=>u.username==username);
    if(usuarioExistente){
        document.getElementById("mensaje-error").innerText = "Error al registrarse, intenta nuevamente";
    }


    console.log("user: " + user + ". email: " + email + ".usuarioregistrado: " + usuariosRegistrado);
    if (usuariosRegistrados){
        if (usuarios.find(u=> u.username==user && u.password==pass)){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- 
----------------------------------------------------------------------------------------------------------------------------------------------------- */




/*let usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
document.getElementById("Loginform").addEventListener("submit", function(event){
    event.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;


    const usuarioExistente=usuarios.find(u=> u.email==email);
    if (usuarioExistente){
        alert("el usuarios ya esta registrado");
        return;
    }


    usuarios.push({email,password})
    localStoragesetItem("usuarios", JSON.stringify(usuarios));
    alert("usuarios registrado con exito")
    reset
})*/

