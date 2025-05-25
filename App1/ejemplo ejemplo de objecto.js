let transacciones = [];
let saldo = 0;

let consultarSaldo = () => {
  alert(`Tu saldo es $${saldo}`);
};

let registrarTransaccion = (tipo, monto) => {
  const transaccion = {
    tipo: tipo,
    monto: monto,
    fecha: new Date().toLocaleString()
  };
  if (transacciones.length >= 5) {
    transacciones.shift(); // elimina la más antigua
  }
  transacciones.push(transaccion);
};

let retirar = () => {
  let saldoRetirar = parseInt(prompt("¿Cuánto deseas retirar? (máx $500)", 0));
  if (saldo === 0) {
    alert("No tienes saldo.");
  } else if (saldoRetirar > saldo) {
    alert(`Saldo insuficiente. Solo tienes $${saldo}`);
  } else if (saldoRetirar > 500) {
    alert("No puedes retirar más de $500");
  } else if (saldoRetirar > 0) {
    saldo -= saldoRetirar;
    registrarTransaccion("retiro", saldoRetirar);
    alert(`Retiro exitoso. Nuevo saldo: $${saldo}`);
  } else {
    alert("Cantidad no válida");
  }
};

let depositar = () => {
  let saldoDepositar = parseInt(prompt("¿Cuánto deseas depositar?", 0));
  if (saldoDepositar > 0) {
    saldo += saldoDepositar;
    registrarTransaccion("depósito", saldoDepositar);
    alert(`Depósito exitoso. Nuevo saldo: $${saldo}`);
  } else {
    alert("Debes ingresar un monto positivo");
  }
};

let verTransacciones = () => {
  if (transacciones.length === 0) {
    alert("No hay transacciones registradas");
    return;
  }

  let historial = "Últimas transacciones:\n";
  transacciones.forEach((t, index) => {
    historial += `${index + 1}. ${t.tipo.toUpperCase()} de $${t.monto} el ${t.fecha}\n`;
  });
  alert(historial);
};
