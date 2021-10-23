// Selectores
const monedaUno = document.getElementById("moneda-uno");
const monedaDos = document.getElementById("moneda-dos");
const cantidadUno = document.getElementById("cantidad-uno");
const cantidadDos = document.getElementById("cantidad-dos");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Obtener el tipo de Cambio y acyualizar el DOM
function calculate() {
  const moneda_uno = monedaUno.value;
  const moneda_dos = monedaDos.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/db9dd06ef07d2112693c914d/latest/${moneda_uno}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[moneda_dos];

      rateEl.innerText = `1 ${moneda_uno} = ${rate} ${moneda_dos}`;

      cantidadDos.value = (cantidadUno.value * rate).toFixed(2);
    });
}

// Event listener
monedaUno.addEventListener("change", calculate);
cantidadUno.addEventListener("input", calculate);
monedaDos.addEventListener("change", calculate);
cantidadDos.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = monedaUno.value;
  monedaUno.value = monedaDos.value;
  monedaDos.value = temp;

  calculate();
});

calculate();
