// interactividad
document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach(tarjeta => {
    const textoDescripcion = tarjeta.getAttribute("data-descripcion");

    //elemento para la descripción emergente
    const descripcion = document.createElement("div");
    descripcion.classList.add("descripcion-hover");
    descripcion.textContent = textoDescripcion;

    tarjeta.appendChild(descripcion);

    // Eventos de mouseover y mouseout
    tarjeta.addEventListener("mouseover", () => {
      tarjeta.classList.add("mostrando");
    });

    tarjeta.addEventListener("mouseout", () => {
      tarjeta.classList.remove("mostrando");
    });
  });
});
