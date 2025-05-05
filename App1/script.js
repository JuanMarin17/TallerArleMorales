//Desarrolla un cajero automatico que permita consultar saldo, depositar y retirar dinero. Usa un arreglo para almacenar las ultimas 5 transacciones

let transacciones = [];

saldo = 0;

let consultarSaldo = () => {
  alert(`Tu saldo es ${saldo}`);
};

let retirar = () => {
  let saldoRetirar = parseInt(
    prompt("Cuanto deseas retirar (No puede ser mayor a $500)", 0)
  );
  if (saldo === 0) {
    alert("No puedes retirar porque no tienes saldo en tu cuenta");
  } else if (saldoRetirar > saldo) {
    alert(`Saldo insuficiente tienes $${saldo} en tu cuenta`);
  } else if (saldoRetirar > 500) {
    alert("No puedes retirar mas de $500 en una sola transacción");
  } else if (saldoRetirar === saldo) {
    saldo -= saldoRetirar;
    transacciones.push(saldoRetirar * -1);
    alert(`Se retiro exitosamente te quedan $${saldo} en tu cuenta`);
  } else if (saldoRetirar < saldo && saldoRetirar <= 500) {
    saldo -= saldoRetirar;
    transacciones.push(saldoRetirar * -1);
    alert(`Se retiro exitosamente te quedan $${saldo} en tu cuenta`);
  }
};

let depositar = () => {
  let saldoDepositar = parseInt(
    prompt("Cuanto deseas depositar a tu cuenta", 0)
  );
  if(transacciones.length > 4){
    if (saldoDepositar > 0) {
      transacciones.shift();
      saldo += saldoDepositar;
      transacciones.push(saldoDepositar);
      alert(`Se deposito exitosamente, tienes $${saldo} en tu cuenta`);
    } else {
      alert("Debes depositar un valor positivo");
    }
  }else{
    if (saldoDepositar > 0) {
      saldo += saldoDepositar;
      transacciones.push(saldoDepositar);
      alert(`Se deposito exitosamente, tienes $${saldo} en tu cuenta`);
    } else {
      alert("Debes depositar un valor positivo");
    }
  }
};

let mostrarMovimientos = () =>{
  let mensaje = 'Se han hecho estas transacciones:\n'
  for (let i = 0; i < transacciones.length; i++) {
    let movimiento = transacciones[i];
    if (movimiento > 0){
      mensaje += `Se deposito $${movimiento} en tu cuenta\n`;
    } else {
      mensaje += `Se retiro $${movimiento * -1} en tu cuenta\n`;
    }
  }
  alert(mensaje);
}

while (true) {
  let opcion = parseInt(
    prompt(
      "Que consulta quieres hacer \n1) consultar saldo\n2) Depositar a tu cuenta\n3) Retirar de tu cuenta\n4) Mostrar movimientos\n5) Salir "
    )
  );
  if (opcion < 0 || opcion > 5) {
    alert("Debes escoger un valor entre 1-4");
  } else if (opcion === 1) {
    consultarSaldo();
  } else if (opcion === 2) {
    depositar();
  } else if (opcion === 3) {
    retirar();
  } else if (opcion === 4){
    mostrarMovimientos();
  }else if (opcion === 5) {
    alert("Cerrando canal");
    console.log(transacciones);
    break;
  }
}