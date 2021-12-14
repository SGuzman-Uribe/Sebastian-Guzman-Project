const obtenerProductos = async () => {
    const res = await fetch("../script/productos.json");
    const data = await res.json();
    const productos = data.productos;
    return productos;
  };  

// MOSTRAR PRODUCTOS
  
const mostrarProductos = (productos, centro) => {   

    let mostrar = productos.map(
        ({nombre,imagen,precio}) =>
        `<div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagen} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${nombre}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${precio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`
    )
    mostrar = mostrar.join("");
    centro.innerHTML = mostrar;

    updateShoppingCartTotal();

    const removeShoppingCartButtons = document.querySelectorAll('.buttonDelete');
    removeShoppingCartButtons.forEach((removeCartButton) => {
        removeCartButton.addEventListener('click', removeShoppingCartItem);});

}

function actualizarVentana(){
    const tienda = document.querySelector(".shoppingCartItemsContainer")
    let arrayCarrito = []
    window.addEventListener("DOMContentLoaded", async () => {
        const productos = await obtenerProductos()
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);
            const productoFiltrado = productos.filter(producto => producto.nombre === clave)
            let obj = toObject(productoFiltrado)
            arrayCarrito.push(obj)
        } 
        arrayCarrito = JSON.stringify(arrayCarrito);    
        let jsonProductos = JSON.parse(arrayCarrito);  
        mostrarProductos(jsonProductos, tienda)
    })


    const toObject = (arr) => {
        let obj = {}    
        for (let i = 0; i < arr.length; ++i){
            obj = arr[i];        
        }    
        return obj;
    }
}

// Actualizar total

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');  
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
        '.shoppingCartItemPrice'
      );
      const shoppingCartItemPrice = Number(
        shoppingCartItemPriceElement.textContent.replace('$', '')
      );
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
        '.shoppingCartItemQuantity'
      );
      const shoppingCartItemQuantity = Number(
        shoppingCartItemQuantityElement.value
      );
      total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = ` ${total.toFixed(3)}`;
  }

  
// Boton eliminar



/*
const removeShoppingCartButtons = document.querySelectorAll('.buttonDelete');
removeShoppingCartButtons.addEventListener('click', removeShoppingCartItem);
*/

/*
const removeShoppingCartButtons = document.querySelectorAll('.buttonDelete');
removeShoppingCartButtons.forEach((removeCartButton) => {
    removeCartButton.addEventListener('click', removeShoppingCartItem);
});*/

function removeShoppingCartItem(event) {
    console.log("Entro")
    const button = event.target;
    const producto = button.closest('.shoppingCartItem');  
    const nombreProducto = producto.querySelector('.shoppingCartItemTitle').textContent;
    console.log(nombreProducto)
    localStorage.removeItem(nombreProducto)
    actualizarVentana()
    updateShoppingCartTotal();
}





/* CARRITO 

// Boton comprar
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

function addToCartClicked(event) {    
    const button = event.target;
    const producto = button.closest('.producto');  
    const nombreProducto = producto.querySelector('.producto-nombre').textContent;
    localStorage.setItem(nombreProducto,nombreProducto)      
  }



// Actualizar

shoppingCartRow
.querySelector('.shoppingCartItemQuantity')
.addEventListener('change', quantityChanged);



function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}

*/


actualizarVentana()