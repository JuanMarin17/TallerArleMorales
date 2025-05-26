const banco = {
  clientes: {
    "12345678": {
      pin: "1234",
      cuentas: {
        cuentaAhorros: 300000,
        cuentaCorriente: 150000,
      }
    },
    "87654321": {
      pin: "4321",
      cuentas: {
        cuentaAhorros: 500000,
        cuentaCorriente: 200000,
      }
    }
  },
  validarPin(doc, pin) {
    return this.clientes[doc] && this.clientes[doc].pin === pin;
  },
  registrarCliente(doc, pin, saldoAhorros, saldoCorriente) {
    if (this.clientes[doc]) {
      return false;
    }
    this.clientes[doc] = {
      pin,
      cuentas: {
        cuentaAhorros: saldoAhorros,
        cuentaCorriente: saldoCorriente,
      }
    };
    return true;
  }
};

let cajeroEncendido = true;

function encenderCajero() {
  cajeroEncendido = true;
  console.log("🔵 Cajero encendido.");
  menuPrincipal();
}

function apagarCajero() {
  cajeroEncendido = false;
  console.log("🔴 Cajero apagado.");
}

function menuPrincipal() {
  if (!cajeroEncendido) {
    console.log(" El cajero está apagado.");
    return;
  }

  let continuar = true;
  while (continuar) {
    const opcion = prompt(`
===== BIENVENIDO AL CAJERO =====
Seleccione una opción:
1. Iniciar sesión
2. Registrar nuevo cliente
3. Apagar cajero
`);

    switch (opcion) {
      case "1":
        iniciarCajero();
        break;
      case "2":
        registrarNuevoCliente();
        break;
      case "3":
        apagarCajero();
        continuar = false;
        break;
      default:
        alert("Opción inválida.");
    }
  }
}

function registrarNuevoCliente() {
  const doc = prompt("Ingrese nuevo documento de identidad:");
  if (banco.clientes[doc]) {
    alert(" El documento ya está registrado.");
    return;
  }

  const pin = prompt("Ingrese un PIN de 4 dígitos:");
  const saldoAhorros = parseInt(prompt("Ingrese saldo inicial para cuenta de ahorros:"));
  const saldoCorriente = parseInt(prompt("Ingrese saldo inicial para cuenta corriente:"));

  const registrado = banco.registrarCliente(doc, pin, saldoAhorros, saldoCorriente);
  if (registrado) {
    alert(" Registro exitoso. Ya puede iniciar sesión.");
  } else {
    alert(" No se pudo registrar.");
  }
}

function iniciarCajero() {
  const doc = prompt("Ingrese su documento de identidad:");
  let intentos = 0;
  let pinCorrecto = false;

  while (intentos < 3) {
    const pin = prompt("Ingrese su PIN de 4 dígitos:");
    if (banco.validarPin(doc, pin)) {
      pinCorrecto = true;
      break;
    } else {
      intentos++;
      alert(" PIN incorrecto. Intente de nuevo.");
    }
  }

  if (!pinCorrecto) {
    alert(" Demasiados intentos fallidos. Salida del sistema.");
    return;
  }

  const cliente = banco.clientes[doc];

  let continuar = true;
  while (continuar) {
    const opcion = prompt(`
Usuario ${doc}, Bienvenido al cajero.
===== CAJERO AUTOMÁTICO =====
Seleccione una opción:
1. Retiro
2. Depósito
3. Transferencia
4. Consultar saldo
5. Salir
`);

    switch (opcion) {
      case "1":
        retiro(cliente);
        break;
      case "2":
        deposito(cliente);
        break;
      case "3":
        transferencia(cliente);
        break;
      case "4":
        consultarSaldo(cliente);
        break;
      case "5":
        alert("👋 Gracias por usar el cajero.");
        continuar = false;
        break;
      default:
        alert("Opción inválida.");
    }
  }
}

function obtenerCuentaDesdeOpcion(opcion) {
  switch (opcion) {
    case "1":
      return "cuenta ahorros";
    case "2":
      return "cuenta corriente";
    default:
      alert(" Opción no válida.");
      return null;
  }
}

function retiro(cliente) {
  const opcion = prompt("¿Desde qué cuenta desea retirar?\n1. Ahorros\n2. Corriente:");
  const cuenta = obtenerCuentaDesdeOpcion(opcion);
  if (!cuenta || !cliente.cuentas[cuenta]) return;

  const monto = parseInt(prompt("Ingrese el monto a retirar (múltiplos de 50000):"));
  if (monto % 50000 !== 0) return alert("Monto no válido. Solo múltiplos de 50000.");
  if (cliente.cuentas[cuenta] < monto) return alert("Fondos insuficientes.");

  cliente.cuentas[cuenta] -= monto;
  alert(` Retiro exitoso. Puede tomar $${monto} de la bandeja principal.`);
}

function deposito(cliente) {
  const opcion = prompt("¿A qué cuenta desea depositar?\n1. Ahorros\n2. Corriente");
  const cuenta = obtenerCuentaDesdeOpcion(opcion);
  if (!cuenta || !cliente.cuentas[cuenta]) return;

  const monto = parseInt(prompt("Ingrese el monto a depositar:"));
  const tipo = prompt("¿El depósito es en efectivo o cheque?");

  cliente.cuentas[cuenta] += monto;
  alert(` Depósito de $${monto} (${tipo}) realizado con éxito.`);
}

function transferencia(cliente) {
  const desdeOpcion = prompt("¿Desde qué cuenta desea transferir?\n1. Ahorros\n2. Corriente:");
  const haciaOpcion = prompt("¿Hacia qué cuenta desea transferir?\n1. Ahorros\n2. Corriente:");

  const desde = obtenerCuentaDesdeOpcion(desdeOpcion);
  const hacia = obtenerCuentaDesdeOpcion(haciaOpcion);

  if (!desde || !hacia || !cliente.cuentas[desde] || !cliente.cuentas[hacia]) return;
  if (desde === hacia) return alert(" No puede transferir a la misma cuenta.");

  const monto = parseInt(prompt("Ingrese el monto a transferir:"));
  if (cliente.cuentas[desde] < monto) return alert("Fondos insuficientes.");

  cliente.cuentas[desde] -= monto;
  cliente.cuentas[hacia] += monto;

  alert(` Transferencia de $${monto} de ${desde} a ${hacia} realizada con éxito.`);
}

function consultarSaldo(cliente) {
  let mensaje = " Saldo de sus cuentas:\n";
  for (let cuenta in cliente.cuentas) {
    mensaje += `- ${cuenta}: $${cliente.cuentas[cuenta]}\n`;
  }
  alert(mensaje);
}

const encendido = confirm("¿Desea encender el cajero?");
if (encendido) {
  encenderCajero();
} else {
  apagarCajero();
}
