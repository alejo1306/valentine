const btnNo = document.getElementById("randomBtn");
const btnSi = document.querySelector(".botones button");
const contenedor = document.querySelector(".botones");
const imagen = document.getElementById("imagenValentine");


btnSi.addEventListener("click", () => {

  // 🔥 Ocultar botones
  document.querySelector(".botones").style.display = "none";

  // 🔥 Ocultar imagen principal (gatoarmado o la que esté visible)
  document.getElementById("imagenValentine").style.display = "none";

  // 🔥 Ocultar el título SVG
  document.getElementById("tituloValentine").style.display = "none";

  // 🔥 Mostrar overlay
  const overlay = document.getElementById("celebracionOverlay");
  overlay.style.display = "flex";

  lanzarFuegos();
  iniciarLluviaDeGatos();
});

  // 🔥 Ocultar imagen principal
function iniciarLluviaDeGatos() {

  const imagenesCelebracion = [
    "img/gatoenamorado1.jpg",
    "img/gatoenamorado2.jpg",
    "img/gatoenamorado3.png",
    "img/gatoenamorado4.jpg"
  ];

  setInterval(() => {

    const gato = document.createElement("img");
    gato.src = imagenesCelebracion[Math.floor(Math.random() * imagenesCelebracion.length)];

    gato.style.position = "fixed";
    gato.style.width = "100px";
    gato.style.left = Math.random() * window.innerWidth + "px";
    gato.style.top = "-120px";
    gato.style.zIndex = "1";
    gato.style.pointerEvents = "none";

    document.body.appendChild(gato);

    let posicion = -120;
    const velocidad = Math.random() * 3 + 2;

    const caer = setInterval(() => {
      posicion += velocidad;
      gato.style.top = posicion + "px";

      if (posicion > window.innerHeight) {
        clearInterval(caer);
        gato.remove();
      }
    }, 16);

  }, 300); // cada 300ms cae un gato nuevo
}


const imagenes = [
  "img/gatoenamorado1.jpg",
  "img/gatoduren.jpg",
  "img/gatoenmesa.jpg",
  "img/gatolloron.jpg",
  "img/gatomolesto.jpg",
  "img/gatoponido.jpg"
];

const imagenFinal = "img/gatoarmado.jpg";

let intentos = 0;

btnNo.addEventListener("click", () => {
  intentos++;
  

  // 🔁 Cambiar imagen mientras haya disponibles
  if (intentos < imagenes.length) {
    imagen.src = imagenes[intentos];
  } else {
    // 💀 Llegó al límite
    imagen.src = imagenFinal;
    btnNo.style.display = "none";
    return; // detenemos aquí para que no intente moverse
  }

  // 🏃 Movimiento aleatorio del botón
  const maxX = contenedor.clientWidth - btnNo.offsetWidth;
  const maxY = contenedor.clientHeight - btnNo.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
});

function lanzarFuegos() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  function crearExplosion(x, y) {
    for (let i = 0; i < 60; i++) {
      particles.push({
        x,
        y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 4 + 2,
        alpha: 1
      });
    }
  }

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.015;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${p.alpha})`;
      ctx.fill();

      if (p.alpha <= 0) {
        particles.splice(index, 1);
      }
    });

    requestAnimationFrame(animar);
  }

  setInterval(() => {
    crearExplosion(
      Math.random() * canvas.width,
      Math.random() * canvas.height / 2
    );
  }, 700);

  animar();
}
