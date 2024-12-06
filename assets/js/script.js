// Variables globales para manejar el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtiene el carrito desde localStorage o inicializa vacío

// Datos dinámicos de productos
const products = [
  { id: 1, name: 'Collar + Aretes', price: 25999, img: 'cadena+aretes.jpg' },
  { id: 2, name: 'Aretes Redondos', price: 15999, img: 'artes2.jpg' },
  { id: 3, name: 'Reloj 1.1', price: 45999, img: 'Reloj2.jpg' },
  { id: 4, name: 'Relojes de Cuero', price: 20999, img: 'Reloj3.jpeg' },
  { id: 5, name: 'Manilla 1.1', price: 12500, img: 'manilla2.jpg' },
  { id: 6, name: 'Manillas con Perlas', price: 12999, img: 'manilla3.jpg' },
];

// Función para agregar producto al carrito
function addToCart(productId) {
  const product = products.find((p) => p.id === productId); // Busca el producto por ID

  if (!product) {
    console.error(`Producto con ID ${productId} no encontrado.`);
    return; // Sale de la función si no se encuentra el producto
  }

  // Añadir producto al carrito
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el carrito actualizado en localStorage

  alert(`${product.name} añadido al carrito.`);
}

// Función para cargar los productos del carrito en carrito.html
function loadCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItemsContainer || !cartTotal) return; // Evita errores si los elementos no existen en la página

  cartItemsContainer.innerHTML = ''; // Limpia el contenedor antes de añadir los elementos
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2); // Actualiza el total del carrito
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  cart.splice(index, 1); // Elimina el producto por índice
  localStorage.setItem('cart', JSON.stringify(cart)); // Actualiza localStorage
  loadCartItems(); // Recarga los elementos del carrito
}

// Función para cargar el resumen de compra en compra.html
function loadPurchaseDetails() {
  const purchaseItemsContainer = document.querySelector('.purchase-items');
  const totalPriceElement = document.getElementById('total-price');

  if (!purchaseItemsContainer || !totalPriceElement) return;

  purchaseItemsContainer.innerHTML = ''; // Limpia el contenedor antes de cargar los productos

  if (cart.length === 0) {
    purchaseItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    totalPriceElement.textContent = '0.00';
    return;
  }

  let totalPrice = 0;

  // Recorre el carrito y agrega los productos a la página
  cart.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('purchase-item');
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
    `;
    purchaseItemsContainer.appendChild(div);
    totalPrice += item.price;
  });

  // Actualiza el total
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Evento: proceder al pago (navegación a compra.html)
const proceedToCheckoutButton = document.querySelector('.proceed-to-checkout');
if (proceedToCheckoutButton) {
  proceedToCheckoutButton.addEventListener('click', () => {
    window.location.href = 'compra.html';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Función para procesar el pago
  const payButton = document.querySelector('#pay-button');
  if (payButton) {
    payButton.addEventListener('click', function () {
      // Aquí iría la lógica para procesar el pago (puedes integrar una API de pago como Stripe o PayPal)
      alert('Pago realizado con éxito.');

      // Limpiar el carrito después del pago
      localStorage.removeItem('cart');

      // Opcional: Redirigir al usuario a una página de agradecimiento
      window.location.href = 'gracias.html'; // Redirige a una página de agradecimiento
    });
  }

  // Aquí puedes colocar el resto de las funciones que manipulan el carrito
  if (document.querySelector('.cart-items')) {
    loadCartItems();
  }

  if (document.querySelector('.purchase-items')) {
    loadPurchaseDetails();
  }
});

// Agrega eventos a los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.id); // Obtiene el ID del producto desde el atributo data-id
    addToCart(productId); // Llama a la función para añadir el producto al carrito
  });
});

// Función para cargar el resumen de compra en compra.html
function loadPurchaseDetails() {
  const purchaseItemsContainer = document.querySelector('.purchase-items');
  const totalPriceElement = document.getElementById('total-price');

  if (!purchaseItemsContainer || !totalPriceElement) return;

  purchaseItemsContainer.innerHTML = ''; // Limpia el contenedor antes de cargar los productos

  if (cart.length === 0) {
    purchaseItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    totalPriceElement.textContent = '0.00';
    return;
  }

  let totalPrice = 0;

  // Recorre el carrito y agrega los productos a la página
  cart.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('purchase-item');
    div.innerHTML = `
      <div class="purchase-item-details">
        <p><strong>${item.name}</strong></p>
        <p>Precio: $${item.price.toFixed(2)}</p>
        <img src="${item.img}" alt="${item.name}" class="purchase-item-image">
      </div>
    `;
    purchaseItemsContainer.appendChild(div);
    totalPrice += item.price;
  });

  // Actualiza el total
  totalPriceElement.textContent = totalPrice.toFixed(2);
}
