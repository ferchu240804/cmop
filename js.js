const cuadro=document.querySelector(".cuadro")
const loginlink=document.querySelector(".login-link")
const registerlink=document.querySelector(".register-link")

const btnPopup=document.querySelector(".btnLogin-popup")

const iconClose=document.querySelector(".icon-close")

const loginbutton=document.querySelector(".btn")
const Registrarsebutton=document.querySelector(".login-register")


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



/*  PARA LOGEAR   */ 
loginbutton.addEventListener("click", (event) =>{
    event.preventDefault();



    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    console.log("EMAIL: " + email + ". PASSWORD: " + password);

    flaglogin = iniciarSesion(email, password);
    if (flaglogin==true){
        window.location.href="inicio.html"
    } else {
        // Muestra el mensaje en el div
    document.getElementById("mensaje-error").innerText = "Usuario o Contraseña incorrecta";
    document.getElementById("mensaje-error").style.display = "block";  // Muestra el div

    }
});


/* PARA REGISTRARSE */


Registrarsebutton.addEventListener("click", (event) =>{
    event.preventDefault();

    /*flaglogin=function(emial,password)*/

    const username=document.getElementById("user").value;
    const email=document.getElementById("emailR").value;
    const password=document.getElementById("passwordR").value;

    console.log( "USERNAME: " +username + "EMAIL: " + email + ". PASSWORD: " + password );

    flaglogin = registrarse(username,email, password);
    if (flaglogin==true){
        window.location.href="inicio.html"
    } else {
        // Muestra el mensaje en el div
    document.getElementById("mensaje-error").innerText = "Usuario o Contraseña incorrecta";
    document.getElementById("mensaje-error").style.display = "block";  // Muestra el div

    }
});




function iniciarSesion(user, pass){

    let usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("usuarios" + usuarios);

    let usuarioExistente= false;
    usuarioExistente = usuarios.find(u=> u.username==user);

    console.log("user: " + user + ". PASSWORD: " + pass + ". usuarioExistente: " + usuarioExistente);


    if (usuarioExistente){
        if (usuarios.find(u=> u.username==user && u.password==pass)){
            return true
        } else {
            return false
        } 
    
    } else {
        return false
    }
}




function registrarusuario(user,email,pass){
    let usuarios=JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("usuarios" + usuarios);

    let usuariosRegistrados=false;
    usuariosRegistrados=usuarios.find(u=> u.username==user);

    console.log("user: " + user + ". email: " + email + ".usuarioregistrado: " + usuariosRegistrados);
    if (usuariosRegistrados){
        if (usuarios.find(u=> u.username==user && u.password==pass)){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}




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

