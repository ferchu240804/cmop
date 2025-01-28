async function RegistrarBDD(user,email,pass){
    const res=await fetch("hhttp://localhost:3000/registrar", {
        method:"POST", //metodo de post para enviar datos
        headers:{
            "content-Type":"application/json", //indica que enviamos json para que pueda leer los datos
        },
        body:JSON.stringify({ //convertimos los datos a json
            Username:user,
            Email:email,
            Password:pass
        }),
    });
    
    const resJson=await res.json();    // esperamos la repuesta que viene en json
    return resJson; //retornamos lo que devuelvo resjson para que lo podamos ver
}
