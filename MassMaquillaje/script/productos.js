const obtenerProductos = async () => {
  const res = await fetch("../script/productos.json");
  const data = await res.json();
  const productos = data.productos;
  return productos;
};



// MOSTRAR PRODUCTOS

const mostrarProductos = (productos, centro) => {
  let mostrar = productos.map(
    ({
      nombre,
      imagen,
      precio
    }) =>
    `<div class="producto">
        <div class="producto-encabezado">
            <img src="${imagen}" alt="">
        </div>
        <div class="producto-pie">
            <h3>${nombre}</h3>
            <div class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            <div class="producto-precio">
                <h4>$${precio}</h4>
            </div>
        </div>
        <ul>
            <li>
                <a href="#">
                    <i class="fas fa-grin-hearts"></i>
                </a>
            </li>
            <li>
                <a class="addToCart" href="#">
                    <i class="fas fa-shopping-cart"></i>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-sync"></i>
                </a>
            </li>
        </ul>             
    </div>`
  )

  mostrar = mostrar.join("");
  centro.innerHTML = mostrar;
}
// Filtro
const contenedorOrdenar = document.querySelector(".ordenar-categoria");
const centroProductos = document.querySelector(".centro-producto");
const filtrarBtn = [...document.querySelectorAll(".boton-filtrar")]

if (contenedorOrdenar) {
  contenedorOrdenar.addEventListener("click", async e => {
    const target = e.target.closest(".seccion-titulo")
    if (!target) return;
    const id = target.dataset.id;
    const productos = await obtenerProductos();

    if (id) {
      filtrarBtn.forEach(btn => {
        btn.classList.remove("active");
      });
      target.classList.add("active");
      const menu = productos.filter(producto => producto.categoria === id);
      centroProductos.classList.add("animate__animated", "animate__backInUp");
      setTimeout(() => {
        centroProductos.classList.remove("animate__animated", "animate__backInUp");
      }, 1000);
      mostrarProductos(menu, centroProductos);
    }
  });
}
const filterArray = async tipo => {
  const productos = await obtenerProductos();
  return productos.filter(producto => producto.categoria === tipo)
}
const tienda = document.querySelector(".centro-tienda")
const ultimos = document.querySelector(".centro-ultimo")
const vistos = document.querySelector(".vistos")

window.addEventListener("DOMContentLoaded", async () => {
  const productos = await obtenerProductos()
  const productoDefault = await filterArray("rostro")
  const ultimosProductos = await filterArray("ultimos")
  const productosVistos = await filterArray("vistos")
  mostrarProductos(ultimosProductos, ultimos)
  mostrarProductos(productoDefault, centroProductos)
  mostrarProductos(productos, tienda)
  mostrarProductos(productosVistos, vistos)
})