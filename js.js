const cuadro=document.querySelector(".cuadro")
const loginlink=document.querySelector(".login-link")
const registerlink=document.querySelector(".register-link")

const btnPopup=document.querySelector(".btnLogin-popup")

const iconClose=document.querySelector(".icon-close")


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