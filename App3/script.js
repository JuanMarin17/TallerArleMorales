/* Desarrolla una máquina expendedora que permita al usuario insertar una moneda (valor fijo de $1) y seleccionar 
un producto mediante un código numérico. La máquina tiene un inventario de 5 productos almacenados en 
arreglos (nombres y cantidades). Si hay stock y el pago es correcto, entrega el producto y actualiza el 
inventario. */

let inventario = [
  { 
    dulce: "chicle", 
    cantidad: 12 
  },
  { 
    dulce: "galleta Oreo", 
    cantidad: 6 
  },
  { 
    dulce: "Gusanito", 
    cantidad: 10 
  },
  { 
    dulce: "Gomitas", 
    cantidad: 8 
  },
  { 
    dulce: "Chocorramo", 
    cantidad: 4 
  },
];

let validacion = (o) => {
  o = parseInt(o);
  if (o < 1 || o > 5) {
    alert("Error, tienes que elegir un numero del 1 al 5");
  } else {
    let indice = o - 1;
    if (inventario[indice].cantidad > 0) {
      let moneda = parseInt(prompt("Ingrese una moneda de $1 'Escribe 1'"));
      if (moneda < 0) {
        alert("Debes de ingresar un numero valido");
      } else {
        if (moneda > 1) {
          inventario[indice].cantidad--;
          alert(`Gracias por tu compra te devolvemos ${moneda - 1}`);
        } else {
          inventario[indice].cantidad--;
          alert("Gracias por tu compra");
        }
      }
    } else {
      alert("No hay ese producto");
    }
  }
};

while (true) {
  mensaje = "Maquina expendedora solo un dolar $1 🍫\n";
  for (let i = 0; i < inventario.length; i++) {
    const dulce = inventario[i].dulce;
    const cantidad = inventario[i].cantidad;
    mensaje += `${i + 1}. ${dulce} - cantidad: ${cantidad}\n`;
  }
  let opcion = prompt(
    mensaje + "¿Qué deseas comprar? Indica el número o escribe 'salir'",
    0
  );
  if (opcion === "") {
    alert("Debes introducir el codigo numerico del dulce");
  } else if (opcion === "salir") {
    alert("Gracias por su estadia");
    break;
  } else {
    validacion(opcion);
  }
}
