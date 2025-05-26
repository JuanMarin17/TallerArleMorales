const estadisticas = {
  totalUsuarios: 0,
  porFecha: {},
  transferencias: 0,
};

function obtenerFecha() {
  return new Date().toISOString().slice(0, 10);
}

function atender(modulo, segmento, fecha = obtenerFecha()) {
  if (!estadisticas.porFecha[fecha]) {
    estadisticas.porFecha[fecha] = {
      llamada: { Estudiante: 0, Docente: 0 },
      oficina: { Estudiante: 0, Docente: 0 },
    };
  }

  estadisticas.porFecha[fecha][modulo][segmento]++;
  estadisticas.totalUsuarios++;

  console.log(`${segmento} atendido por ${modulo} en ${fecha}`);
}

function transferir(segmento, deModulo, aModulo, fecha = obtenerFecha()) {
  const dia = estadisticas.porFecha[fecha];
  if (!dia || dia[deModulo][segmento] <= 0) {
    return console.warn(" No hay usuarios para transferir.");
  }

  dia[deModulo][segmento]--;
  dia[aModulo][segmento]++;
  estadisticas.transferencias++;

  console.log(
    ` ${segmento} transferido de ${deModulo} a ${aModulo} en ${fecha}`
  );
}

function mostrarEstadisticas() {
  console.log(" Estadísticas de Atención:");
  console.log(` Total usuarios atendidos: ${estadisticas.totalUsuarios}`);
  console.log(` Total transferencias: ${estadisticas.transferencias}`);
  console.log(" Atenciones por fecha y segmento:");

  for (let fecha in estadisticas.porFecha) {
    console.log(`\n Fecha: ${fecha}`);
    const modulos = estadisticas.porFecha[fecha];

    for (let modulo in modulos) {
      const segmentos = modulos[modulo];
      console.log(`   Módulo: ${modulo}`);
      for (let segmento in segmentos) {
        console.log(`     ${segmento}: ${segmentos[segmento]}`);
      }
    }
  }
}

atender("llamada", "Estudiante");
atender("oficina", "Docente");
atender("llamada", "Docente");
atender("oficina", "Estudiante");
transferir("Estudiante", "llamada", "oficina");
transferir("Docente", "oficina", "llamada");
mostrarEstadisticas();
