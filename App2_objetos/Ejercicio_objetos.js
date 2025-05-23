
let cola = [];

const MAX_COLA = 7;

const mostrarCola = () => {
    if (cola.length === 0) {
        alert("La cola está vacía");
    } else {
        let mensaje = "Clientes en la cola:\n";
        cola.forEach((cliente, index) => {
            mensaje += `${index + 1}. ${cliente.Nombre}, Edad: ${cliente.edad}, Cédula: ${cliente.cedula}\n`;
        });
        alert(mensaje);
    }
};

const agregarCliente = () => {
    if (cola.length >= MAX_COLA) {
        alert("La cola está llena. No se pueden agregar más clientes.");
    } else {
        let nombre = prompt("Ingresa el nombre:");
        let edad = prompt("Ingresa la edad:");
        let cedula = prompt("Ingresa la cédula:");
        let nuevoCliente = {Nombre: nombre, edad: edad, cedula: cedula};
        cola.push(nuevoCliente);
        alert(`Se agregó el cliente ${nombre} a la cola`);
    }
};

const atenderCliente = () => {
    if (cola.length === 0) {
        alert("No hay clientes para atender");
    } else {
        let clienteAtendido = cola.shift();
        alert(`Cliente ${clienteAtendido.Nombre} ha sido atendido`);
    }
};

while (true) {
    let opcion = parseInt(prompt("Elige una opción\n1. Ver cola\n2. Agregar cliente\n3. Atender cliente\n4. Salir"));
    if (opcion === 1) {
        mostrarCola();
    } else if (opcion === 2) {
        agregarCliente();
    } else if (opcion === 3) {
        atenderCliente();
    } else if (opcion === 4) {
        alert("Finalizando...");
        break;
    } else {
        alert("Opción inválida");
    }
}
