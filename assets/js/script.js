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

// Agrega eventos a los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.id); // Obtiene el ID del producto desde el atributo data-id
    addToCart(productId); // Llama a la función para añadir el producto al carrito
  });
});

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
  const purchaseDetails = document.querySelector('.purchase-details');

  if (!purchaseDetails) return; // Evita errores si el elemento no existe

  purchaseDetails.innerHTML = ''; // Limpia el contenedor previamente
  let total = 0;

  cart.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
    `;
    purchaseDetails.appendChild(div);
    total += item.price;
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  purchaseDetails.appendChild(totalDiv);
}

// Evento: proceder al pago (navegación a compra.html)
const proceedToCheckoutButton = document.querySelector('.proceed-to-checkout');
if (proceedToCheckoutButton) {
  proceedToCheckoutButton.addEventListener('click', () => {
    window.location.href = 'compra.html';
  });
}

// Carga dinámica en las páginas según los elementos disponibles
if (document.querySelector('.cart-items')) {
  loadCartItems();
}

if (document.querySelector('.purchase-details')) {
  loadPurchaseDetails();
}
