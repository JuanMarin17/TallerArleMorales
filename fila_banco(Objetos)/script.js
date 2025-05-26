class Cliente {
  constructor(nombre, tipo, motivo, preferencial, tieneCuenta) {
    this.nombre = nombre;
    this.tipo = tipo; // 'preferencial', 'general', 'sinCuenta'
    this.motivo = motivo; // 'retiro', 'deposito', 'asesoria'
    this.preferencial = preferencial; // true/false
    this.tieneCuenta = tieneCuenta; // true/false
  }
}

class Caja {
  constructor(numero, tipo) {
    this.numero = numero;
    this.tipo = tipo; // 'retiro', 'deposito', 'asesoria'
    this.libre = true;
    this.clienteActual = null;
  }
  atender(cliente) {
    this.clienteActual = cliente;
    this.libre = false;
    console.log(
      `Caja ${this.numero} (${this.tipo}) atiende a ${cliente.nombre} (${cliente.tipo}) para ${cliente.motivo}`
    );
  }
  liberar() {
    this.clienteActual = null;
    this.libre = true;
  }
}

class Banco {
  constructor() {
    // Cajas 1 y 2: retiros, 3 y 4: depósitos, 5: asesoría
    this.cajas = [
      new Caja(1, "retiro"),
      new Caja(2, "retiro"),
      new Caja(3, "deposito"),
      new Caja(4, "deposito"),
      new Caja(5, "asesoria"),
    ];
    this.filas = {
      preferencial: [],
      general: [],
      sinCuenta: [],
    };
  }

  agregarCliente(cliente) {
    if (cliente.tipo === "preferencial") {
      this.filas.preferencial.push(cliente);
    } else if (cliente.tipo === "general") {
      this.filas.general.push(cliente);
    } else {
      this.filas.sinCuenta.push(cliente);
    }
  }

  siguienteCliente(tipoAtencion) {
    // Prioridad: preferencial > general > sinCuenta
    let cliente = null;
    if (this.filas.preferencial.length > 0) {
      cliente = this.filas.preferencial.shift();
    } else if (this.filas.general.length > 0) {
      cliente = this.filas.general.shift();
    } else if (this.filas.sinCuenta.length > 0) {
      cliente = this.filas.sinCuenta.shift();
    }
    return cliente && cliente.motivo === tipoAtencion ? cliente : null;
  }

  atenderClientes() {
    // Atender retiros en cajas 1 y 2
    for (let i = 0; i < 2; i++) {
      if (this.cajas[i].libre) {
        let cliente = this.buscarCliente("retiro");
        if (cliente) this.cajas[i].atender(cliente);
      }
    }
    // Atender depósitos en cajas 3 y 4
    for (let i = 2; i < 4; i++) {
      if (this.cajas[i].libre) {
        let cliente = this.buscarCliente("deposito");
        if (cliente) this.cajas[i].atender(cliente);
      }
    }
    // Atender asesoría en caja 5
    if (this.cajas[4].libre) {
      let cliente = this.buscarCliente("asesoria");
      if (cliente) this.cajas[4].atender(cliente);
    }
  }

  buscarCliente(motivo) {
    // Prioridad: preferencial > general > sinCuenta
    for (let tipo of ["preferencial", "general", "sinCuenta"]) {
      let idx = this.filas[tipo].findIndex((c) => c.motivo === motivo);
      if (idx !== -1) {
        return this.filas[tipo].splice(idx, 1)[0];
      }
    }
    return null;
  }

  liberarCaja(numero) {
    this.cajas[numero - 1].liberar();
  }
}

// Ejemplo de uso:
const banco = new Banco();
banco.agregarCliente(new Cliente("Ana", "preferencial", "retiro", true, true));
banco.agregarCliente(new Cliente("Luis", "general", "deposito", false, true));
banco.agregarCliente(
  new Cliente("Pedro", "sin Cuenta", "asesoria", false, false)
);
banco.agregarCliente(
  new Cliente("Maria", "preferencial", "deposito", true, true)
);
banco.agregarCliente(new Cliente("Juan", "general", "retiro", false, true));

banco.atenderClientes(); // Atiende a los clientes según las reglas

// Para liberar una caja (por ejemplo, la 1):
banco.liberarCaja(1);
banco.atenderClientes(); // Atiende al siguiente en la fila
