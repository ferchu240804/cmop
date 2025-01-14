// Lista de productos
const products = [
    {
        name: "Manzana",
        price: 2.50,
        description: "Fruta fresca y deliciosa.",
        image: "manzanaa.png"
    },
    {
        name: "Plátano",
        price: 3.50,
        description: "Energético y saludable.",
        image: "platano.png"
    },
    {
        name: "Leche",
        price: 6.99,
        description: "Rica en calcio, ideal para tus huesos.",
        image: "leche.png"
    },
    {
        name: "Pan",
        price: 5.49,
        description: "X KILO, Perfecto para acompañar tus comidas.",
        image: "pan.png"
    },
    {
        name: "Queso",
        price: 6.50,
        description: "Suave y cremoso, ideal para sándwiches.",
        image: "queso.png"
    },
    {
        name: "Iphone XR",
        price: 259.99,
        description: "lo más nuevo en tecnología",
        image: "iphone XR.png"
    },
];

// Obtener saldo inicial desde sessionStorage o establecer un valor predeterminado
let saldoRestante = parseFloat(sessionStorage.getItem('saldoRestante')) || 10000000;

// Crear el contenedor de saldo
const saldoContainer = document.createElement('div');

// Añadir el saldo al DOM
saldoContainer.id = 'saldoContainer';
saldoContainer.style.position = 'absolute';
saldoContainer.style.top = '10px';
saldoContainer.style.left = '10px';
saldoContainer.style.backgroundColor = '#fff';
saldoContainer.style.padding = '10px';
saldoContainer.style.border = '1px solid #ccc';
saldoContainer.style.borderRadius = '5px';
saldoContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
saldoContainer.style.fontFamily = 'Arial, sans-serif';
saldoContainer.innerHTML = `<strong>Saldo restante:</strong> $${saldoRestante.toLocaleString()}`;
document.body.appendChild(saldoContainer);

// Crear el contenedor de mensajes
const messageContainer = document.createElement('div');
messageContainer.id = 'messageContainer';
messageContainer.style.position = 'fixed';
messageContainer.style.bottom = '20px';
messageContainer.style.right = '20px';
messageContainer.style.backgroundColor = '#4caf50';
messageContainer.style.color = '#fff';
messageContainer.style.padding = '10px 20px';
messageContainer.style.borderRadius = '5px';
messageContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
messageContainer.style.fontFamily = 'Arial, sans-serif';
messageContainer.style.display = 'none'; // Oculto por defecto
document.body.appendChild(messageContainer);

// Mostrar mensaje temporal
const showMessage = (message) => {
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000); // Ocultar después de 3 segundos
};

// Elementos del DOM
const searchBar = document.getElementById('searchBar');
const productContainer = document.getElementById('productContainer');

// Actualizar saldo en el DOM y en sessionStorage
const actualizarSaldo = (nuevoSaldo) => {
    saldoRestante = nuevoSaldo;
    sessionStorage.setItem('saldoRestante', saldoRestante); // Guardar en sessionStorage
    saldoContainer.innerHTML = `<strong>Saldo restante:</strong> $${saldoRestante.toLocaleString()}`;
};

// Mostrar productos
const displayProducts = (productList) => {
    productContainer.innerHTML = '';
    if (productList.length === 0) {
        productContainer.innerHTML = `<p>No se encuentra el producto.</p>`;
        return;
    }
    productList.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="buy-btn">Comprar</button>
        `;
        const buyBtn = productCard.querySelector('.buy-btn');
        buyBtn.addEventListener('click', () => {
            if (saldoRestante >= product.price) {
                actualizarSaldo(saldoRestante - product.price);
                showMessage(`Has comprado ${product.name} por $${product.price.toFixed(2)}.`);
            } else {
                showMessage('No tienes suficiente saldo para comprar este producto.');
            }
        });
        productContainer.appendChild(productCard);
    });
};

// Filtrar productos por búsqueda
const filterProducts = (query) => {
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filtered);
};

// Evento de búsqueda
searchBar.addEventListener('input', (e) => {
    const query = e.target.value;
    filterProducts(query);
});

// Mostrar todos los productos al cargar
displayProducts(products);
