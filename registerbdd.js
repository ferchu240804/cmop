Registrarsebutton.addEventListener("click", async (event) => {
    event.preventDefault(); //evita el el comportamiento predeterminado del type="submit" que indica recargar la pagina

    const username=document.getElementById("user").value; //obtiene el valor que se encuentra escrito en el label o input del html donde se guarda con el id "user"
    const email=document.getElementById("emailR").value;
    const password=document.getElementById("passwordR").value;

    try {
        const registrado=await RegistrarBDD(Username, email, password); //llama la funcion registro y le indica que tiene q agarrar 3 parametros

        if(registrado.success){
            const mensaje=document.createElement("div");
            mensaje.id="menssaje-registro";
            mensaje.style.color="green";
            mensaje.style.marginTop="10px";
            mensaje.textContent=registrado.message; //muestra el mensaje de que puedo registrarse correctamente

            const formRegistro=document.querySelector(".form-box.register");
            formRegistro.appendChild(mensaje); //añade el mensaje al formulario de registro

            const mensajeError=document.getElementById("mensaje-error");
            if (mensajeError) mensajeError.style.display= "none"; // no muestra el msj de error si existe
       } else {
        // si hubo un error mostrara el msj nuevamente
        document.getElementById("mensaje-error").innerText=registrado.message;
        document.getElementById("mensaje-error").style.display="block";

       }

    } catch (error){
        console.error("Error al registrar usuario:", error);
        document.getElementById("mensaje-error").innerText = "Hubo un error al registrar el usuario.";
        document.getElementById("mensaje-error").style.display = "block";
    }
});