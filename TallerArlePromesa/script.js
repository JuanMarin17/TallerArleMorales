const manoJugador = document.getElementById("mano");
const manoBanca = document.getElementById("manoBanca");
const hit = document.querySelector(".hit");
const stand = document.querySelector(".stand");
const puntajeJuego = document.getElementById("puntaje");
const anuncio = document.getElementById("anuncio");
const pAnuncio = document.getElementById("pAnuncio");
const reiniciar = document.getElementById("reiniciar");
function crearBaraja() {
  const palos = ["♠️", "♦️", "♥️", "♣️"];
  const numeros = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  const baraja = [];

  for (let palo of palos) {
    for (let numero of numeros) {
      baraja.push({ numero, palo });
    }
  }

  return baraja.sort(() => Math.random() - 0.5);
}

function valorCarta(carta) {
  if (["J", "Q", "K"].includes(carta.numero)) return 10;
  if (carta.numero === "A") return 11;
  return parseInt(carta.numero);
}

function calcularPuntaje(mano) {
  let total = 0;
  let ases = 0;

  for (let carta of mano) {
    total += valorCarta(carta);
    if (carta.numero === "A") ases++;
  }

  // Ajustar Ases si el total es mayor a 21
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }

  return total;
}

// Mostrar cartas como texto
function mostrarMano(mano) {
  manoJugador.innerHTML = "";
  let carts = mano.map((c) => `${c.numero}${c.palo}`);
  carts.forEach((cart) => {
    manoJugador.innerHTML += `<div class="cart-jugador">${cart}</div>`;
  });
}
function mostrarManoBanca(mano) {
  manoBanca.innerHTML = "";
  let carts = mano.map((c) => `${c.numero}${c.palo}`);
  carts.forEach((cart) => {
    manoBanca.innerHTML += `<div class="cart-banca">${cart}</div>`;
  });
}

// Turno del jugador
function turnoJugador(baraja) {
  return new Promise((resolve) => {
    const mano = [baraja.pop(), baraja.pop()];
    let puntaje = calcularPuntaje(mano);
    puntajeJuego.innerText = "Tu puntaje es: " + puntaje;

    mostrarMano(mano);

    function preguntar() {
      if (puntaje >= 21) {
        return resolve({ mano, puntaje });
      }

      function fHit() {
        const nueva = baraja.pop();
        mano.push(nueva);
        puntaje = calcularPuntaje(mano);
        puntajeJuego.innerText = "Tu puntaje es: " + puntaje;
        manoJugador.innerHTML += `<div class="cart-jugador">${nueva.numero}${nueva.palo}</div>`;
        if (puntaje >= 21) {
          hit.disabled = true;
          stand.disabled = true;
          return resolve({ mano, puntaje });
        }
      }

      function fStand() {
        hit.disabled = true;
        stand.disabled = true;
        resolve({ mano, puntaje });
      }

      hit.disabled = false;
      stand.disabled = false;

      hit.onclick = fHit;
      stand.onclick = fStand;
    }

    preguntar();
  });
}

// Turno de la banca
function turnoBanca(baraja) {
  return new Promise((resolve) => {
    const mano = [baraja.pop(), baraja.pop()];
    let puntajeBanca = calcularPuntaje(mano);
    mostrarManoBanca(mano);

    while (puntajeBanca < 17) {
      const nueva = baraja.pop();
      mano.push(nueva);
      puntajeBanca = calcularPuntaje(mano);
      mostrarManoBanca(mano);
    }

    resolve({ mano, puntajeBanca });
  });
}

// Juego principal
async function jugarBlackjack() {
  const juegoTitulo = document.getElementById("juego");
  juegoTitulo.innerText = "🎲 Bienvenido a Blackjack (con baraja completa)";

  const baraja = crearBaraja();

  const jugador = await turnoJugador(baraja);
  if (jugador.puntaje > 21) {
    anuncio.style.display = "flex";
    pAnuncio.innerText = "💥 Te pasaste de 21. Pierdes.";
    return;
  }

  const banca = await turnoBanca(baraja);

  if (banca.puntajeBanca > 21 || jugador.puntaje > banca.puntajeBanca) {
    anuncio.style.display = "flex";
    pAnuncio.innerText = "🏆 ¡Ganaste!";
  } else if (jugador.puntaje < banca.puntajeBanca) {
    anuncio.style.display = "flex";
    pAnuncio.innerText = "😞 La banca gana.";
  } else {
    anuncio.style.display = "flex";
    pAnuncio.innerText = "🤝 Empate.";
  }
}

// Reiniciar juego
reiniciar.addEventListener("click", () => {
  manoJugador.innerHTML = "";
  manoBanca.innerHTML = "";
  puntajeJuego.innerText = "";
  anuncio.style.display = "none";
  jugarBlackjack();
});

// Iniciar juego
jugarBlackjack();
