let cola = [];
const MAX_COLA = 7;

const mostrarCola = () => {
  if (cola.length === 0) {
    alert("La cola está vacía");
  } else {
    let mensaje = "Clientes en la cola:\n";
    cola.forEach((cliente, index) => {
      mensaje += `${index + 1}. ${cliente}\n`;
    });
    alert(mensaje);
  }
};
const agregarCliente = (nombre) => {
  if (cola.length >= MAX_COLA) {
    alert("La cola está llena. No se pueden agregar más clientes.");
  } else cola.push(nombre);
  alert(`Se agrego el cliente ${nombre} a la cola`);
};
const atenderCliente = () => {
  if (cola.length === 0) {
    alert("No hay clientes para atender.");
  } else {
    let clienteAtendido = cola.shift();
    alert(`Cliente ${clienteAtendido} ha sido atendido.`);
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
    let nombre = prompt("Ingresa el nombre");
    agregarCliente(nombre);
  } else if (opcion === 3) {
    atenderCliente();
  } else if (opcion === 4) {
    alert("Finalizando...");
    break;
  } else {
    alert("Opcion invalida");
  }
}
