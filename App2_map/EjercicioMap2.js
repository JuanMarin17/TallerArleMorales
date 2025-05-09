let cola = new Map();
const MAX_COLA = 7;

const mostrarCola = () => {
  if (cola.size === 0) {
    alert("La cola esta vacia");
  } else {
    let lista = "";
    cola.forEach((cliente, identificacion) => {
      lista += ` ${identificacion}, ${cliente}`;
    });
    alert(lista);
  }
};

const agregarCliente = (identificacion, cliente) => {
  if (!identificacion || !cliente) {
    alert("Error al ingresar el usuario");
    return;
  }

  if (cola.has(identificacion)) {
    alert("Ya existe un cliente con esa identificación");
    return;
  }

  if (cola.size >= MAX_COLA) {
    alert("La cola está llena, no se pueden agregar más clientes");
    return;
  }

  cola.set(identificacion, cliente);
  alert(`Se agregó el cliente ${cliente} con identificación ${identificacion}`);
};

const atenderCliente = () => {
  if (cola.size === 0) {
    alert("No hay clientes los cuales se puedan atender");
  } else {
    let primeraClave = cola.keys().next().value;
    let clienteAtendido = cola.get(primeraClave);
    cola.delete(primeraClave);
    alert(
      `El cliente ${clienteAtendido} con identificación ${primeraClave} ha sido atendido`
    );
  }
};

while (true) {
  let opcion = parseInt(
    prompt(
      "Elige una opcion\n 1. Ver cola \n 2.Agregar Cliente \n 3. Atender cliente \n 4. Salir  "
    )
  );
  if (opcion === 1) {
    mostrarCola();
  } else if (opcion === 2) {
    let identificacion = prompt("Ingresa tu numero de identificacion");
    let cliente = prompt("Ingresa el nombre");
    agregarCliente(identificacion, cliente);
  } else if (opcion === 3) {
    atenderCliente();
  } else if (opcion === 4) {
    alert("Finalizando...");
    break;
  } else {
    alert("Opcion invalida");
  }
}