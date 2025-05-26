let prendas = [];
let calzado = [];

class Productos {
  constructor(
    codigo,
    descripcion,
    preciodeCompra,
    precioDeVenta,
    cantidadEnBodega,
    CantidadMinBodega,
    cantidadMaxBodega,
    porcentajedeDescuento
  ) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.preciodeCompra = preciodeCompra;
    this.precioDeVenta = precioDeVenta;
    this.cantidadEnBodega = cantidadEnBodega;
    this.CantidadMinBodega = CantidadMinBodega;
    this.cantidadMaxBodega = cantidadMaxBodega;
    this.porcentajedeDescuento = porcentajedeDescuento;
  }

  solicitarProducto() {
    if (this.cantidadEnBodega <= this.CantidadMinBodega) return true;
    else return false;
  }

  totalPagar(cantidad, precioProveedor) {
    this.cantidadEnBodega += cantidad;
    return cantidad * precioProveedor;
  }
}

class Prendas extends Productos {
  tipo;
  talla;
  planchar;
  constructor(
    codigo,
    descripcion,
    preciodeCompra,
    precioDeVenta,
    cantidadEnBodega,
    CantidadMinBodega,
    cantidadMaxBodega,
    porcentajedeDescuento,
    tipo,
    talla,
    planchar
  ) {
    super(
      codigo,
      descripcion,
      preciodeCompra,
      precioDeVenta,
      cantidadEnBodega,
      CantidadMinBodega,
      cantidadMaxBodega,
      porcentajedeDescuento
    );
    this.tipo = tipo;
    this.talla = talla;
    this.planchar = planchar;
  }

  verCantidad() {
    return `Hay ${this.cantidadEnBodega} ${tipo} en el inventario`;
  }
}

class Calzado extends Productos {
  tipo;
  talla;
  constructor(
    codigo,
    descripcion,
    preciodeCompra,
    precioDeVenta,
    cantidadEnBodega,
    CantidadMinBodega,
    cantidadMaxBodega,
    porcentajedeDescuento,
    tipo,
    talla
  ) {
    super(
      codigo,
      descripcion,
      preciodeCompra,
      precioDeVenta,
      cantidadEnBodega,
      CantidadMinBodega,
      cantidadMaxBodega,
      porcentajedeDescuento
    );
    this.tipo = tipo;
    this.talla = talla;
  }

  verCantidad() {
    return `Hay ${this.cantidadEnBodega} ${tipo} en el inventario`;
  }
}

let consultarPrenda = (codigo) => {
  let prendaEncontrada = prendas.find((prenda) => prenda.codigo == codigo);
  if (prendaEncontrada) {
    mensaje = `Prenda encontrada: ${prendaEncontrada.tipo} talla: ${prendaEncontrada.talla}, stock: ${prendaEncontrada.cantidadEnBodega}, cantidad minima: ${prendaEncontrada.CantidadMinBodega}, cantidad maxima: ${prendaEncontrada.cantidadMaxBodega}, precio de compra: ${prendaEncontrada.preciodeCompra}\n`;
    let opcion = prompt(mensaje + "1) Hay que pedir?\n2) Pedir al proveedor");
    if (opcion === "1") {
      if (prendaEncontrada.solicitarProducto()) {
        alert("Si hay que pedir producto al proveedor.");
      } else {
        alert("No es necesario pedir producto al proveedor.");
      }
    } else if (opcion === "2") {
      let cantidad = parseInt(
        prompt("Ingrese la cantidad a solicitar al proveedor:")
      );
      let precioProveedor = parseFloat(
        prompt("Ingrese el precio de compra del proveedor:")
      );
      let total = prendaEncontrada.totalPagar(cantidad, precioProveedor);
      alert(`Se ha solicitado ${cantidad} unidades. Total a pagar: $${total}`);
    }
  } else {
    console.log("Prenda no encontrada.");
  }
};

let consultarCalzado = (codigo) => {
  let calzadoEncontrado = calzado.find((item) => item.codigo == codigo);
  if (calzadoEncontrado) {
    let mensaje = `Calzado encontrado: ${calzadoEncontrado.tipo} talla: ${calzadoEncontrado.talla}, stock: ${calzadoEncontrado.cantidadEnBodega}, cantidad minima: ${calzadoEncontrado.CantidadMinBodega}, cantidad maxima: ${calzadoEncontrado.cantidadMaxBodega}, precio de compra: ${calzadoEncontrado.preciodeCompra}\n`;
    let opcion = prompt(mensaje + "1) Hay que pedir?\n2) Pedir al proveedor");
    if (opcion === "1") {
      if (calzadoEncontrado.solicitarProducto()) {
        alert("Si hay que pedir producto al proveedor.");
      } else {
        alert("No es necesario pedir producto al proveedor.");
      }
    } else if (opcion === "2") {
      let cantidad = parseInt(
        prompt("Ingrese la cantidad a solicitar al proveedor:")
      );
      let precioProveedor = parseFloat(
        prompt("Ingrese el precio de compra del proveedor:")
      );
      let total = calzadoEncontrado.totalPagar(cantidad, precioProveedor);
      alert(`Se ha solicitado ${cantidad} unidades. Total a pagar: $${total}`);
    }
  } else {
    alert("Calzado no encontrado.");
  }
};

while (true) {
  let opcion = prompt(
    "Ingrese el tipo de producto que desea agregar:\n1. Prendas\n2. Calzado\n3. Salir"
  );

  if (opcion === "3") {
    break;
  }

  if (opcion === "1") {
    let opcionPrendas = prompt(
      "Que quieres hacer?\n1.Agregar una prenda\n2.Ver prendas en inventario"
    );
    if (opcionPrendas === "1") {
      let codigo = prompt("Ingrese el código de la prenda:");
      let descripcion = prompt("Ingrese la descripción de la prenda:");
      let preciodeCompra = parseFloat(
        prompt("Ingrese el precio de compra de la prenda:")
      );
      let precioDeVenta = parseFloat(
        prompt("Ingrese el precio de venta de la prenda:")
      );
      let cantidadEnBodega = parseInt(
        prompt("Ingrese la cantidad en bodega de la prenda:")
      );
      let CantidadMinBodega = parseInt(
        prompt("Ingrese la cantidad mínima en bodega de la prenda:")
      );
      let cantidadMaxBodega = parseInt(
        prompt("Ingrese la cantidad máxima en bodega de la prenda:")
      );
      let porcentajedeDescuento = parseFloat(
        prompt("Ingrese el porcentaje de descuento de la prenda:")
      );
      let tipo = prompt("Ingrese el tipo de prenda:");
      let talla = prompt("Ingrese la talla de la prenda:");
      let planchar = confirm("¿La prenda necesita ser planchada?");

      const prendasObj = new Prendas(
        codigo,
        descripcion,
        preciodeCompra,
        precioDeVenta,
        cantidadEnBodega,
        CantidadMinBodega,
        cantidadMaxBodega,
        porcentajedeDescuento,
        tipo,
        talla,
        planchar
      );
      prendas.push(prendasObj);
    } else if (opcionPrendas === "2") {
      let mensaje = "Este es el inventario de prendas:\n";
      prendas.forEach((prenda) => {
        mensaje += `${prenda.codigo}. ${prenda.tipo} talla: ${prenda.talla}, stock: ${prenda.cantidadEnBodega}, precio: ${prenda.precioDeVenta}, descuento: ${prenda.porcentajedeDescuento}\n`;
      });
      let consultarPrendaCodigo = prompt(
        mensaje + "Consultar mas a detalle (inserte el codigo)",
        0
      );
      consultarPrenda(consultarPrendaCodigo);
    }
  } else if (opcion === "2") {
    let opcionCalzado = prompt(
      "¿Qué quieres hacer?\n1. Agregar calzado\n2. Ver calzado en inventario"
    );
    if (opcionCalzado === "1") {
      let codigo = prompt("Ingrese el código del calzado:");
      let descripcion = prompt("Ingrese la descripción del calzado:");
      let preciodeCompra = parseFloat(
        prompt("Ingrese el precio de compra del calzado:")
      );
      let precioDeVenta = parseFloat(
        prompt("Ingrese el precio de venta del calzado:")
      );
      let cantidadEnBodega = parseInt(
        prompt("Ingrese la cantidad en bodega del calzado:")
      );
      let CantidadMinBodega = parseInt(
        prompt("Ingrese la cantidad mínima en bodega del calzado:")
      );
      let cantidadMaxBodega = parseInt(
        prompt("Ingrese la cantidad máxima en bodega del calzado:")
      );
      let porcentajedeDescuento = parseFloat(
        prompt("Ingrese el porcentaje de descuento del calzado:")
      );
      let tipo = prompt("Ingrese el tipo de calzado:");
      let talla = prompt("Ingrese la talla del calzado:");

      const calzados = new Calzado(
        codigo,
        descripcion,
        preciodeCompra,
        precioDeVenta,
        cantidadEnBodega,
        CantidadMinBodega,
        cantidadMaxBodega,
        porcentajedeDescuento,
        tipo,
        talla
      );
      calzado.push(calzados);
    } else if (opcionCalzado === "2") {
      let mensaje = "Este es el inventario de calzado:\n";
      calzado.forEach((item) => {
        mensaje += `${item.codigo}. ${item.tipo} talla: ${item.talla}, stock: ${item.cantidadEnBodega}, precio: ${item.precioDeVenta}, descuento: ${item.porcentajedeDescuento}\n`;
      });
      let consultarCalzadoCodigo = prompt(
        mensaje + "Consultar más a detalle (inserte el código)",
        0
      );
      consultarCalzado(consultarCalzadoCodigo);
    }
  } else {
    alert("Opción no válida, por favor intente nuevamente.");
  }
}
