class Habitacion {
  constructor(tipo, esFumador) {
    this.tipo = tipo; 
    this.esFumador = esFumador;
    this.ocupada = false;
    this.reserva = null;
  }

  capacidadMaxima() {
    if (this.tipo === 'individual') return 2;
    if (this.tipo === 'doble') return 4;
    if (this.tipo === 'familiar') return 6;
    return 0;
  }

  puedeAceptarMascota() {
    return this.tipo === 'familiar';
  }

  reservar(reserva) {
    if (this.ocupada) {
      console.log("Habitación ya ocupada");
    }
    if (reserva.numeroPersonas > this.capacidadMaxima()) {
      console.log("Número de personas excede la capacidad.");
      return false;
    }
    if (reserva.tieneMascota && !this.puedeAceptarMascota()) {
      console.log("Solo se aceptan mascotas en habitaciones familiares.");
      return false;
    }
    this.ocupada = true;
    this.reserva = reserva;
    return true;
  }

  liberar() {
    this.ocupada = false;
    this.reserva = null;
  }
}

class Reserva {
  constructor(nombre, pais, numeroPersonas, periodoEstadia, tieneMascota) {
    this.nombre = nombre;
    this.pais = pais;
    this.numeroPersonas = numeroPersonas;
    this.periodoEstadia = periodoEstadia;
    this.tieneMascota = tieneMascota;
  }
}

class Hotel {
  constructor() {
    this.habitaciones = [];

    ['individual', 'doble', 'familiar'].forEach(tipo => {
      for (let i = 0; i < 3; i++) {
        this.habitaciones.push(new Habitacion(tipo, true));
        this.habitaciones.push(new Habitacion(tipo, false));
      }
    });
  }

  realizarReserva(nombre, pais, numeroPersonas, periodo, tieneMascota, tipo, esFumador) {
    const nuevaReserva = new Reserva(nombre, pais, numeroPersonas, periodo, tieneMascota);

    const habitacionDisponible = this.habitaciones.find(h =>
      h.tipo === tipo &&
      h.esFumador === esFumador &&
      !h.ocupada &&
      h.capacidadMaxima() >= numeroPersonas &&
      (!tieneMascota || h.puedeAceptarMascota())
    );

    if (habitacionDisponible) {
      habitacionDisponible.reservar(nuevaReserva);
      console.log("Reserva realizada exitosamente.");
    } else {
      console.log("No hay habitaciones disponibles que cumplan con los requisitos.");
    }
  }

  estadisticas() {
    const reservas = this.habitaciones.filter(h => h.ocupada).map(h => h.reserva);
    console.log("Estadísticas de reservas:");
    console.log("---------------------------");
    reservas.forEach((r, i) => {
      console.log(`Reserva ${i + 1}:`);
      console.log(`Nombre: ${r.nombre}`);
      console.log(`País: ${r.pais}`);
      console.log(`Número de personas: ${r.numeroPersonas}`);
      console.log(`Periodo: ${r.periodoEstadia}`);
      console.log(`Trae mascota: ${r.tieneMascota ? "Sí" : "No"}`);
      console.log("---------------------------");
    });

    const totalPersonas = reservas.reduce((sum, r) => sum + r.numeroPersonas, 0);
    console.log(`Total de personas ocupando el hotel: ${totalPersonas}`);
  }
}

const miHotel = new Hotel();

miHotel.realizarReserva("Ana Gómez", "Colombia", 2, "3 noches", false, "individual", false);
miHotel.realizarReserva("Luis Pérez", "México", 5, "2 noches", true, "familiar", true);
miHotel.realizarReserva("Carla Ríos", "Argentina", 3, "1 noche", false, "doble", false);

miHotel.estadisticas();
