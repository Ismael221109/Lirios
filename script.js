/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

// Todas las pistas se muestran como texto en la pantalla del código.
// Ella usa su propia calculadora para resolver la operación.
const PISTAS = [
  "Pista 1: El día en que nos dimos nuestro primer beso.",
  "Pista 2: El mes de la primera vez que nos hicimos novios.",
  "Pista 3: El año en que nos conocimos.",
  "Pista 4: El año de mi nacimiento.",
  "Ahora suma todo.\nMultiplícalo por el día en que nos hicimos novios por última vez.\nMultiplícalo por el día en que nos hicimos novios por primera vez.\nY réstale 38.376."
];

// El código es una fecha FIJA: 18 de octubre de 2026.
// Se acepta en varios formatos: 18102026, 18/10/2026, 18-10-2026, 181026.
const FECHA_CODIGO = { dia: 18, mes: 10, anio: 2026 };

/* =========================================================
   LÓGICA
   ========================================================= */

const candado = document.getElementById("candado");
const contenido = document.getElementById("contenido");
const form = document.getElementById("form-codigo");
const input = document.getElementById("codigo");
const mensaje = document.getElementById("mensaje");
const listaPistas = document.getElementById("lista-pistas");

// Muestra todas las pistas como texto, desde el inicio.
PISTAS.forEach((texto) => {
  const li = document.createElement("li");
  li.textContent = texto;
  listaPistas.appendChild(li);
});

function codigosValidos() {
  const f = FECHA_CODIGO;

  const dd = String(f.dia).padStart(2, "0");
  const mm = String(f.mes).padStart(2, "0");
  const aaaa = String(f.anio);
  const aa = aaaa.slice(-2);

  return [dd + mm + aaaa, dd + mm + aa];
}

function soloNumeros(texto) {
  return texto.replace(/\D/g, ""); // quita "/", "-", espacios, etc.
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const intento = soloNumeros(input.value);

  if (codigosValidos().includes(intento)) {
    abrirPagina();
  } else {
    mensaje.textContent = "Ese no es el código… intenta de nuevo ❀";
    form.classList.remove("sacudir");
    void form.offsetWidth; // reinicia la animación
    form.classList.add("sacudir");
    input.select();
  }
});

function abrirPagina() {
  candado.classList.add("oculto");
  contenido.classList.remove("oculto");
  lanzarPetalos();
}

function lanzarPetalos() {
  const cont = document.getElementById("petalos");
  const simbolos = ["❀", "✿", "❁"];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    p.className = "petalo";
    p.textContent = simbolos[i % simbolos.length];
    p.style.left = Math.random() * 100 + "%";
    p.style.fontSize = 14 + Math.random() * 22 + "px";
    p.style.animationDuration = 8 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * 8 + "s";
    cont.appendChild(p);
  }
}
