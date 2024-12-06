// Get cart from local storage or create an empty array
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Dynamic product data
const products = [
  { id: 1, name: 'Collar + Aretes', price: 800, img: 'cadena+aretes.jpg' },
  { id: 2, name: 'Aretes Redondos', price: 600, img: 'artes2.jpg' },
  { id: 3, name: 'Reloj 1.1', price: 300, img: 'Reloj2.jpg' },
  { id: 4, name: 'Relojes de Cuero', price: 50, img: 'Reloj3.jpeg' },
  { id: 5, name: 'Manilla 1.1', price: 150, img: 'manilla2.jpg' },
  { id: 6, name: 'Manillas con Perlas', price: 30, img: 'manilla3.jpg' },
];

// Function to add product to cart
function addToCart(productId) {
  // Find the product in the products array
  const product = products.find(p => p.id === productId);

  // Check if product exists
  if (!product) {
    console.error(`Product with ID ${productId} not found.`);
    return; // Exit function if product not found
  }

  // Check for existing product in cart (optional for quantity tracking)
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++; // Increment quantity if already in cart
  } else {
    // Add new product to cart with quantity 1
    cart.push({ ...product, quantity: 1 }); // Create a copy to avoid mutation
  }

  // Update local storage with the modified cart
  localStorage.setItem('cart', JSON.stringify(cart));

  // Display success message
  alert(`${product.name} añadido al carrito.`);
}

// Add click event listener to all buttons with class "add-to-cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.id);
    addToCart(productId); // Call the function with product ID
  });
});
  