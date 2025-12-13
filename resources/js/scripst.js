console.log("EcoCodigo");
 
const login = localStorage.getItem("login");
const user = JSON.parse(localStorage.getItem("users"));


if (login && user) {
  saludo.textContent = `Bienvenido ${user.nombre} ${user.apellido}`;
} else {
  window.location.href = "login.html";
}



const canva = document.getElementById("mycanvas");
const ctx = canva.getContext("2d");

const resizeCanvas = () => {
  canva.width = window.innerWidth;
  canva.height = window.innerHeight * 0.75;
  
};

window.addEventListener("resize", () => {
  resizeCanvas();
  draw();
});


let residuos = [
  { type: "Aprovechables", x: 50, y: 100, width: 75, height: 75 },
  { type: "No Aprovechables", x: 150, y: 100, width: 75, height: 75 },
  { type: "Organicos", x: 250, y: 100, width: 75, height: 75 },
  { type: "CascaraPlatano", x: 350, y: 100, width: 75, height: 75 },
  { type: "CascarasHuevo", x: 450, y: 100, width: 75, height: 75 },
  { type: "Papel", x: 550, y: 100, width: 75, height: 75 },
  { type: "Bolsa", x: 650, y: 100, width: 75, height: 75 },
 // { type: "comida", x: 50, y: 100, width: 75, height: 75 },
  { type: "Bolsas", x: 150, y: 100, width: 75, height: 75 },
  { type: "envolturas", x: 350, y: 100, width: 75, height: 75 },
  { type: "botella", x: 250, y: 100, width: 75, height: 75 },
  { type: "vidrio", x: 350, y: 100, width: 75, height: 75 },
  { type: "porcelana", x: 150, y: 100, width: 75, height: 75 },
  { type: "papelRollo", x: 450, y: 100, width: 75, height: 75 },
  { type: "botellaPlastica", x: 550, y: 100, width: 75, height: 75 },
  { type: "restos", x: 650, y: 100, width: 75, height: 75 },
  { type: "restosOrganicos", x: 50, y: 100, width: 75, height: 75 },
  { type: "reciclable", x: 150, y: 100, width: 75, height: 75 },
  { type: "ceramica", x: 250, y: 100, width: 75, height: 75 },
  { type: "manzana", x: 450, y: 100, width: 75, height: 75 },
  { type: "pilas", x: 550, y: 100, width: 75, height: 75 },
  { type: "vaso", x: 650, y: 100, width: 75, height: 75 },
  { type: "cristal", x: 50, y: 100, width: 75, height: 75 },
];
residuos.forEach((r, i) => {
  r.x = 30 + (i % 6) * 90;
  r.y = 80 + Math.floor(i / 6) * 90;
});

const canecas = [
  {
    type: "Blanca",
    width: 90,
    height: 90,
    color: "gray",
    x: () => canva.width * 0.2,
    y: () => canva.height * 0.75,
  },
  {
    type: "Verde",
    width: 90,
    height: 90,
    color: "green",
    x: () => canva.width * 0.5,
    y: () => canva.height * 0.75,
  },
  {
    type: "Negra",
    width: 90,
    height: 90,
    color: "black",
    x: () => canva.width * 0.8,
    y: () => canva.height * 0.75,
  },
];


const images = {};
let selecResiduo = null;
let correctCount = 0;
let incorrectCount = 0;

const loadImage = (src, name) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      images[name] = img;
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Error cargando imagen ${src}`));
    img.src = src;
  });
};

const loadImages = async () => {
  try {
    await Promise.all([
      loadImage("resources/images/aprovechables.jpg", "Aprovechables"),
      loadImage("resources/images/no_aprovechable.png", "No Aprovechables"),
      loadImage("resources/images/Residuos-organicos.png", "Organicos"),
      loadImage("resources/images/cascaraPlatano.webp", "CascaraPlatano"),
      loadImage("resources/images/cascaras-huevo.png", "CascarasHuevo"),
      loadImage("resources/images/papel.webp", "Papel"),
      loadImage("resources/images/bolsa.png", "Bolsa"),
      //loadImage("resources/images/comidaRes.jpg","comida"),
      loadImage("resources/images/2B5C2BC7-1C84-4E1D-9599-75E526F28A7B.jpeg","Bolsas"),
      loadImage("resources/images/botella.webp", "botella"),
      loadImage("resources/images/vidrio.jpg", "vidrio"),
      loadImage("resources/images/elite.jpg", "papelRollo"),
      loadImage("resources/images/botellaPlastica.jpg", "botellaPlastica"),
      loadImage("resources/images/restos.avif", "restos"),
      loadImage("resources/images/organicos.jpg", "restosOrganicos"),
      loadImage("resources/images/reciclable.avif", "reciclable"),
      loadImage("resources/images/ceramica.jpg", "ceramica"),
      loadImage("resources/images/envolturas.png", "envolturas"),
      loadImage("resources/images/manzana.png", "manzana"),
      loadImage("resources/images/pilas.png", "pilas"),
      loadImage("resources/images/vaso-plastico.jpg", "vaso"),
      loadImage("resources/images/porcelana.png", "porcelana"),
      loadImage("resources/images/Vidrio-cristal.webp", "cristal"),
      loadImage("resources/images/caneca-blanca.jpg", "Blanca"),
      loadImage("resources/images/caneca-negra.webp", "Negra"),
      loadImage("resources/images/caneca-verde.jpg", "Verde"),
    ]);
    draw();
  } catch (error) {
    console.error(error);
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canva.width, canva.height);

  // Dibujar canecas
  canecas.forEach((caneca) => {
    if (images[caneca.type]) {
      ctx.drawImage(
        images[caneca.type],
        caneca.x(),
        caneca.y(),
        caneca.width,
        caneca.height
      );

      ctx.strokeRect(caneca.x(), caneca.y(), caneca.width, caneca.height);

      ctx.font = "16px Arial";
      ctx.fillStyle = caneca.color;
      ctx.textAlign = "center";
      ctx.fillText(
        caneca.type,
        caneca.x() + caneca.width / 2,
        caneca.y() + caneca.height + 18
      );
    }
  });

  // Dibujar residuos
  residuos.forEach((residuo) => {
    if (images[residuo.type]) {
      ctx.drawImage(
        images[residuo.type],
        residuo.x,
        residuo.y,
        residuo.width,
        residuo.height
      );
    }
  });

  // Dibujar residuo seleccionado
  if (selecResiduo && images[selecResiduo.type]) {
    ctx.drawImage(
      images[selecResiduo.type],
      selecResiduo.x,
      selecResiduo.y,
      selecResiduo.width,
      selecResiduo.height
    );
  }

  // Marcadores
  ctx.font = "18px Arial";
  ctx.textAlign = "left";
  ctx.fillStyle = "green";
  ctx.fillText(`Aciertos: ${correctCount}`, 20, 30);

  ctx.fillStyle = "red";
  ctx.fillText(`Errores: ${incorrectCount}`, 20, 55);

  // Fin del juego
  if (residuos.length === 0) {
    setTimeout(() => {
      alert("¡Felicidades! Has terminado de seleccionar todos los residuos.");
      alert(`Aciertos: ${correctCount}\nErrores: ${incorrectCount}`);
      window.location.reload();
    }, 300);
  }
};

const isInside = (rect, x, y) => {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
};

const getPointerPos = (e) => {
  const rect = canva.getBoundingClientRect();

  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }

  return {
    x: e.offsetX,
    y: e.offsetY,
  };
};



const startDrag = (e) => {
  e.preventDefault();
  const { x, y } = getPointerPos(e);

  residuos.forEach((residuo) => {
    if (
      isInside(
        {
          x: residuo.x,
          y: residuo.y,
          width: residuo.width,
          height: residuo.height,
        },
        x,
        y
      )
    ) {
      selecResiduo = { ...residuo };
    }
  });
};

const drag = (e) => {
  if (!selecResiduo) return;
  e.preventDefault();

  const { x, y } = getPointerPos(e);
  selecResiduo.x = x - selecResiduo.width / 2;
  selecResiduo.y = y - selecResiduo.height / 2;
  draw();
};

const endDrag = (e) => {
  if (!selecResiduo) return;

  const { x, y } = getPointerPos(e);
  let matchedCaneca = false;

  canecas.forEach((caneca) => {
    if (
      isInside(
        {
          x: caneca.x(),
          y: caneca.y(),
          width: caneca.width,
          height: caneca.height,
        },
        x,
        y
      )
    ) {
      if (residuoPorCaneca(caneca.type).includes(selecResiduo.type)) {
        correctCount++;
        residuos = residuos.filter((r) => r.type !== selecResiduo.type);
      } else {
        incorrectCount++;
      }
      matchedCaneca = true;
    }
  });

  if (matchedCaneca) {
    selecResiduo = null;
    draw();
  }
};

canva.addEventListener("mousedown", startDrag);
canva.addEventListener("mousemove", drag);
canva.addEventListener("mouseup", endDrag);

canva.addEventListener("touchstart", startDrag, { passive: false });
canva.addEventListener("touchmove", drag, { passive: false });
canva.addEventListener("touchend", endDrag);


const residuoPorCaneca = (canecaType) => {
  switch (canecaType) {
    case "Blanca":
      return [
        "Aprovechables",
        "Papel",
        "Bolsa",
        "Bolsas",
        "botella",
        "vidrio",
        "papelRollo",
        "botellaPlastica",
        "reciclable",
        "vaso",
        "cristal",
      ];
    case "Verde":
      return [
        "Organicos",
        "CascaraPlatano",
        "CascarasHuevo",
        "restosOrganicos",
        "restos",
        "manzana",
      ];
    case "Negra":
      return [
        "No Aprovechables",
        "comida",
        "ceramica",
        "envolturas",
        "pilas",
        "porcelana",
      ];
    default:
      return [];
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch((err) => console.error("SW error", err));
}


loadImages();

