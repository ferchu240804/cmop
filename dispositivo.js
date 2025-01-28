// Lista de productos disponibles, cada producto es un objeto con varias propiedades.
const products = [
    {
        name: "Iphone XR", // Nombre del producto
        price: 259.99, // Precio del producto
        description: "", // Descripción del producto
        image: "iphone XR.png" // Ruta de la imagen del producto
    },
    {
        name: "", 
        price: 3.50, 
        description: "",
        image: "" 
    },
    {
        name: "", 
        price: 6.99, 
        description: "", 
        image: "" 
    },
    {
        name: "", 
        price: 5.49, 
        description: "", 
        image: "" 
    },
    {
        name: "", 
        price: 6.50, 
        description: "", 
        image: "" 
    },

];

// Obtener el saldo inicial del usuario desde sessionStorage. Si no existe, asignar un valor predeterminado de 10,000,000.
let saldoRestante = parseFloat(sessionStorage.getItem('saldoRestante')) || 10000000;

// Crear un contenedor div donde se mostrará el saldo restante.
const saldoContainer = document.createElement('div');

// Configuración de estilos del contenedor de saldo
saldoContainer.id = 'saldoContainer'; // Asignamos un ID al contenedor para poder referirnos a él luego.
saldoContainer.style.position = 'absolute'; // Establecemos la posición del contenedor como absoluta.
saldoContainer.style.top = '10px'; // Colocamos el contenedor en la parte superior de la pantalla (a 10px desde el borde superior).
saldoContainer.style.left = '10px'; // Colocamos el contenedor a 10px desde el borde izquierdo de la pantalla.
saldoContainer.style.backgroundColor = '#fff'; // Establecemos el fondo blanco para el contenedor.
saldoContainer.style.padding = '10px'; // Añadimos un poco de espacio (padding) interno al contenedor.
saldoContainer.style.border = '1px solid #ccc'; // Añadimos un borde gris claro al contenedor.
saldoContainer.style.borderRadius = '5px'; // Redondeamos las esquinas del contenedor.
saldoContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Añadimos una sombra sutil para darle profundidad al contenedor.
saldoContainer.style.fontFamily = 'Arial, sans-serif'; // Establecemos la fuente para el texto del contenedor.
saldoContainer.innerHTML = `<strong>Saldo restante:</strong> $${saldoRestante.toLocaleString()}`; // Agregamos el contenido dentro del contenedor, mostrando el saldo inicial.

document.body.appendChild(saldoContainer); // Agregamos el contenedor con el saldo al DOM (en la página web).

// Crear un contenedor para mostrar mensajes temporales (confirmaciones o errores).
const messageContainer = document.createElement('div');

// Configuración de estilos del contenedor de mensajes.
messageContainer.id = 'messageContainer'; // Asignamos un ID al contenedor de mensajes.
messageContainer.style.position = 'fixed'; // Establecemos la posición como fija para que se mantenga visible en todo momento.
messageContainer.style.bottom = '20px'; // Colocamos el contenedor a 20px desde el borde inferior de la página.
messageContainer.style.right = '20px'; // Colocamos el contenedor a 20px desde el borde derecho de la página.
messageContainer.style.backgroundColor = '#4caf50'; // Establecemos un fondo verde para el contenedor de mensajes (color de éxito).
messageContainer.style.color = '#fff'; // Establecemos el color del texto a blanco para contrastar con el fondo verde.
messageContainer.style.padding = '10px 20px'; // Añadimos un poco de espacio interno en el contenedor.
messageContainer.style.borderRadius = '5px'; // Redondeamos las esquinas del contenedor.
messageContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Añadimos una sombra para darle profundidad.
messageContainer.style.fontFamily = 'Arial, sans-serif'; // Establecemos la fuente para el texto del contenedor.
messageContainer.style.display = 'none'; // Inicialmente, ocultamos el contenedor de mensajes (se mostrará solo cuando sea necesario).
document.body.appendChild(messageContainer); // Agregamos el contenedor de mensajes al DOM de la página.


// Función que muestra un mensaje en pantalla por un tiempo limitado (3 segundos).
const showMessage = (message) => {
    messageContainer.textContent = message; // Asignamos el mensaje al contenedor de mensajes.
    messageContainer.style.display = 'block'; // Mostramos el contenedor (cambiamos el display de 'none' a 'block').
    setTimeout(() => {
        messageContainer.style.display = 'none'; // Ocultamos el contenedor después de 3 segundos.
    }, 3000); // El mensaje se oculta después de 3000 milisegundos (3 segundos).
};

// Referencia a los elementos del DOM para la barra de búsqueda y el contenedor de productos.
const searchBar = document.getElementById('searchBar'); // Obtenemos el elemento de la barra de búsqueda por su ID.
const productContainer = document.getElementById('productContainer'); // Obtenemos el contenedor donde se mostrarán los productos.


// Función que actualiza el saldo tanto en la interfaz como en sessionStorage.
const actualizarSaldo = (nuevoSaldo) => {
    saldoRestante = nuevoSaldo; // Asignamos el nuevo saldo.
    sessionStorage.setItem('saldoRestante', saldoRestante); // Guardamos el saldo actualizado en sessionStorage.
    saldoContainer.innerHTML = `<strong>Saldo restante:</strong> $${saldoRestante.toLocaleString()}`; // Actualizamos el contenido en el DOM con el nuevo saldo.
};

// Función para mostrar los productos disponibles en el contenedor de productos.
const displayProducts = (productList) => {
    productContainer.innerHTML = ''; // Limpiamos el contenedor de productos antes de agregar los nuevos productos.
    
    // Si no se encuentran productos, mostramos un mensaje diciendo que no se encontró el producto.
    if (productList.length === 0) {
        productContainer.innerHTML = `<p>No se encuentra el producto.</p>`;
        return; // Salimos de la función si no hay productos que mostrar.
    }

    // Recorremos la lista de productos y creamos una tarjeta por cada uno.
    productList.forEach((product) => {
        const productCard = document.createElement('div'); // Creamos un contenedor div para cada tarjeta de producto.
        productCard.classList.add('product-card'); // Añadimos una clase CSS para darle estilo a cada tarjeta de producto.
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="buy-btn">Comprar</button>
        `;


/*-------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------- */
// EXPLICACION DE LA LINEA "115" AL "121"
   // Asignamos el contenido HTML de la tarjeta del producto.
/*  
   productCard.innerHTML = `
   <img src="${product.image}" alt="${product.name}"> <!-- Imagen del producto -->
   <h3>${product.name}</h3> <!-- Nombre del producto -->
   <p>${product.description}</p> <!-- Descripción del producto -->
   <p class="price">$${product.price.toFixed(2)}</p> <!-- Precio del producto, con dos decimales -->
   <button class="buy-btn">Comprar</button> <!-- Botón para comprar el producto -->
`;*/

/*------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------- ------*/


  // Obtenemos el botón de compra dentro de la tarjeta y agregamos un evento de clic.
  const buyBtn = productCard.querySelector('.buy-btn'); // Buscamos el botón de compra.
  buyBtn.addEventListener('click', () => { // Agregamos un escuchador de evento para el clic en el botón de compra.
      if (saldoRestante >= product.price) { // Verificamos si el saldo es suficiente para comprar el producto.
          actualizarSaldo(saldoRestante - product.price); // Restamos el precio del producto al saldo y actualizamos el saldo.
          showMessage(`Has comprado ${product.name} por $${product.price.toFixed(2)}.`); // Mostramos un mensaje de confirmación.
      } else { // Si no hay suficiente saldo.
          showMessage('No tienes suficiente saldo para comprar este producto.'); // Mostramos un mensaje de error.
      }
  });

  productContainer.appendChild(productCard); // Añadimos la tarjeta de producto al contenedor de productos en el DOM.
});
};

// Función que filtra los productos según el texto de búsqueda ingresado.
const filterProducts = (query) => {
// Filtramos los productos buscando si el nombre del producto contiene el texto de búsqueda (sin importar mayúsculas o minúsculas).
const filtered = products.filter((product) =>
  product.name.toLowerCase().includes(query.toLowerCase())
);

// Mostramos los productos filtrados.
displayProducts(filtered);
};

// Agregamos un evento para escuchar los cambios en el campo de búsqueda (cada vez que el usuario escribe algo).
searchBar.addEventListener('input', (e) => {
const query = e.target.value; // Obtenemos el valor ingresado por el usuario.
filterProducts(query); // Filtramos los productos con el texto ingresado.
});

// Mostramos todos los productos al cargar la página por primera vez.
displayProducts(products);