// PRODUCTOS

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

// CARRITO 

function addToCartClicked(event) {    
    const button = event.target;
    const producto = button.closest('.producto');  
    const nombreProducto = producto.querySelector('.producto-nombre').textContent;
    localStorage.setItem(nombreProducto,nombreProducto)      
  }
