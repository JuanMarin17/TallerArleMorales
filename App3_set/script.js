let dulces = new Set();

dulces.add({ dulce: "chicle", cantidad: 12 });
dulces.add({ dulce: "galleta Oreo", cantidad: 6 });
dulces.add({ dulce: "Gusanito", cantidad: 10 });
dulces.add({ dulce: "Gomitas", cantidad: 10 });
dulces.add({ dulce: "Chocorramo", cantidad: 4 });

let validacion = (o) => {
  o = parseInt(o);
  let arrayDulces = Array.from(dulces);
  if (o < 1 || o > 5) {
    alert("Error, tienes que elegir un numero del 1 al 5");
  } else {
    let indice = o - 1;
    let item = arrayDulces[indice];
    if (item.cantidad > 0) {
      let moneda = parseInt(prompt("Ingrese una moneda de $1 'Escribe 1'"));
      if (moneda < 0) {
        alert("Debes de ingresar un numero valido");
      } else {
        if (moneda > 1) {
          item.cantidad--;
          alert(`Gracias por tu compra te devolvemos ${moneda - 1}`);
        } else {
          item.cantidad--;
          alert("Gracias por tu compra");
        }
      }
    } else {
      alert("No hay ese producto");
    }
  }
};

while (true) {
  let num = 1;
  let mensaje = "Maquina expendedora solo un dolar $1 🍫\n";
  for (let dul of dulces) {
    mensaje += `${num}. ${dul.dulce} cantidad ${dul.cantidad}\n`;
    num++;
  }
  let opcion = prompt(
    mensaje +
      "Elije una opcion, ingresa su indice numerico (1,2,3 ...)\n" +
      "O presiona salir",
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
