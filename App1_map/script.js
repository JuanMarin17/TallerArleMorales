let transacciones = new Map();
let transaccionId = 0;
let saldo = 0;

let consultarSaldo = () => {
    alert(`Tu saldo es $${saldo}`);
};

let registrarTransaccion = (monto) => {
    if (transacciones.size >= 5) {
        // Elimina la primera transacción (la más antigua)
        const primeraClave = transacciones.keys().next().value;
        transacciones.delete(primeraClave);
    }
    transacciones.set(transaccionId++, monto);
};

let retirar = () => {
    let saldoRetirar = parseInt(
        prompt("¿Cuánto deseas retirar? (No puede ser mayor a $500)", 0)
    );
    if (saldo === 0) {
        alert("No puedes retirar porque no tienes saldo en tu cuenta");
    } else if (saldoRetirar > saldo) {
        alert(`Saldo insuficiente. Tienes $${saldo} en tu cuenta`);
    } else if (saldoRetirar > 500) {
        alert("No puedes retirar más de $500 en una sola transacción");
    } else if (saldoRetirar > 0) {
        saldo -= saldoRetirar;
        registrarTransaccion(-saldoRetirar);
        alert(`Se retiró exitosamente. Te quedan $${saldo} en tu cuenta`);
    } else {
        alert("Ingresa una cantidad válida para retirar");
    }
};

let depositar = () => {
    let saldoDepositar = parseInt(
        prompt("¿Cuánto deseas depositar a tu cuenta?", 0)
    );
    if (saldoDepositar > 0) {
        saldo += saldoDepositar;
        registrarTransaccion(saldoDepositar);
        alert(`Se depositó exitosamente. Tienes $${saldo} en tu cuenta`);
    } else {
        alert("Debes depositar un valor positivo");
    }
};

let mostrarMovimientos = () => {
    let mensaje = "Se han hecho estas transacciones:\n";
    for (let [id, movimiento] of transacciones) {
        if (movimiento > 0) {
            mensaje += `Se depositó $${movimiento} en tu cuenta\n`;
        } else {
            mensaje += `Se retiró $${-movimiento} de tu cuenta\n`;
        }
    }
    alert(mensaje);
};

while (true) {
    let opcion = parseInt(
        prompt(
            "¿Qué consulta quieres hacer?\n1) Consultar saldo\n2) Depositar a tu cuenta\n3) Retirar de tu cuenta\n4) Mostrar movimientos\n5) Salir"
        )
    );
    if (opcion < 1 || opcion > 5) {
        alert("Debes escoger un valor entre 1 y 5");
    } else if (opcion === 1) {
        consultarSaldo();
    } else if (opcion === 2) {
        depositar();
    } else if (opcion === 3) {
        retirar();
    } else if (opcion === 4) {
        mostrarMovimientos();
    } else if (opcion === 5) {
        alert("Cerrando canal");
        console.log(Array.from(transacciones.entries()));
        break;
    }
}

