class Producto {
  constructor(id, nombre, fecha, precioInicial) {
    this.id = id;
    this.nombre = nombre;
    this.fecha = fecha;
    this.precioInicial = precioInicial;
    this.ofertas = [];
  }

  agregarOferta(oferta) {
    this.ofertas.push(oferta);
  }

  mostrarOfertas() {
    if (this.ofertas.length === 0) {
      return "No hay ofertas para este producto.";
    }
    return this.ofertas
      .map(
        (oferta, i) =>
          `${i + 1}. ${oferta.persona} ofreció $${oferta.valor} el ${
            oferta.fecha
          }`
      )
      .join("\n");
  }

  ofertaGanadora() {
    if (this.ofertas.length === 0) return null;
    return this.ofertas.reduce((max, oferta) =>
      oferta.valor > max.valor ? oferta : max
    );
  }
}

class Oferta {
  constructor(persona, fecha, valor) {
    this.persona = persona;
    this.fecha = fecha;
    this.valor = valor;
  }
}

let productos = [];

// Menú principal
while (true) {
  let opcion = prompt(
    "Subasta\n1. Registrar producto\n2. Ver productos\n3. Hacer oferta\n4. Ver ofertas de un producto\n5. Ver oferta ganadora\n6. Salir"
  );
  if (opcion === "6") break;

  if (opcion === "1") {
    // Registrar producto
    let id = prompt("ID del producto:");
    let nombre = prompt("Nombre del producto:");
    let fecha = prompt("Fecha de subasta (dd/mm/aaaa):");
    let precioInicial = parseFloat(prompt("Precio inicial:"));
    productos.push(new Producto(id, nombre, fecha, precioInicial));
    alert("Producto registrado.");
  } else if (opcion === "2") {
    // Ver productos
    if (productos.length === 0) {
      alert("No hay productos registrados.");
    } else {
      let lista = productos
        .map(
          (p) =>
            `${p.id}. ${p.nombre} | Fecha: ${p.fecha} | Precio inicial: $${p.precioInicial}`
        )
        .join("\n");
      alert("Productos registrados:\n" + lista);
    }
  } else if (opcion === "3") {
    // Hacer oferta
    if (productos.length === 0) {
      alert("No hay productos para ofertar.");
      continue;
    }
    let id = prompt(
      "Ingrese el ID del producto por el que desea ofertar:\n" +
        productos.map((p) => `${p.id}: ${p.nombre}`).join("\n")
    );
    let producto = productos.find((p) => p.id == id);
    if (!producto) {
      alert("Producto no encontrado.");
      continue;
    }
    let persona = prompt("Nombre de la persona que oferta:");
    let fecha = prompt("Fecha de la oferta (dd/mm/aaaa):");
    let valor = parseFloat(prompt("Valor ofrecido:"));
    if (isNaN(valor) || valor < producto.precioInicial) {
      alert("La oferta debe ser un número y mayor o igual al precio inicial.");
      continue;
    }
    producto.agregarOferta(new Oferta(persona, fecha, valor));
    alert("Oferta registrada.");
  } else if (opcion === "4") {
    // Ver ofertas de un producto
    if (productos.length === 0) {
      alert("No hay productos.");
      continue;
    }
    let id = prompt(
      "Ingrese el ID del producto para ver sus ofertas:\n" +
        productos.map((p) => `${p.id}: ${p.nombre}`).join("\n")
    );
    let producto = productos.find((p) => p.id == id);
    if (!producto) {
      alert("Producto no encontrado.");
      continue;
    }
    alert(`Ofertas para ${producto.nombre}:\n` + producto.mostrarOfertas());
  } else if (opcion === "5") {
    // Ver oferta ganadora
    if (productos.length === 0) {
      alert("No hay productos.");
      continue;
    }
    let id = prompt(
      "Ingrese el ID del producto para ver la oferta ganadora:\n" +
        productos.map((p) => `${p.id}: ${p.nombre}`).join("\n")
    );
    let producto = productos.find((p) => p.id == id);
    if (!producto) {
      alert("Producto no encontrado.");
      continue;
    }
    let ganadora = producto.ofertaGanadora();
    if (!ganadora) {
      alert("No hay ofertas para este producto.");
    } else {
      alert(
        `Oferta ganadora para ${producto.nombre}:\n${ganadora.persona} ofreció $${ganadora.valor} el ${ganadora.fecha}`
      );
    }
  }
}
