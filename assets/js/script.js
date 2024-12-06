let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Manejo de productos dinámico
const products = [
  { id: 1, name: 'collar + aretes', price: 800, img: 'cadena+aretes.jpg' },
  { id: 2, name: 'Aretes Redondos', price: 600, img: 'artes2.jpg' },
  { id: 3, name: 'Reloj 1.1', price: 300, img: 'Reloj2.jpg' },
  { id: 4, name: 'Relojes de cuero', price: 50, img: 'Reloj3.jpeg' },
  { id: 5, name: 'Manilla 1.1', price: 150, img: 'manilla2.jpg' },
  { id: 6, name: 'Manillas con perlas', price: 30, img: 'manilla3.jpg' },
];
  

// Agregar producto al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.dataset.id);
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} añadido al carrito.`);
  });
});
  