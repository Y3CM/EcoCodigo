console.log("EcoCodigo");

const canva = document.getElementById("mycanvas");
const ctx = canva.getContext("2d");

let residuos = [
  { type: "Aprovechables", x: 50, y: 100, width: 75, height: 75 },
  { type: "No Aprovechables", x: 150, y: 100, width: 75, height: 75 },
  { type: "Organicos", x: 250, y: 100, width: 75, height: 75 },
];

const canecas = [
  { type: "Blanca", x: 500, y: 100, width: 100, height: 100, color:"gray"},
  { type: "Verde", x: 500, y: 250, width: 100, height: 100, color:"green"},
  { type: "Negra", x: 500, y: 400, width: 100, height: 100, color:"black"},
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
      loadImage("resources/images/cascaraPlatano.webp", "cascaraPlatano"),
      loadImage("resources/images/cascaras-huevo.png", "cascacarHuevo"),
      loadImage("resources/images/papel.webp", "papel"),
      loadImage("resources/images/bolsa.png", "bolsa"),
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

  residuos.forEach((residuo) => {
    if (images[residuo.type]) {
      ctx.drawImage(images[residuo.type], residuo.x, residuo.y, residuo.width, residuo.height);
    }
  });

  canecas.forEach((caneca) => {
    if (images[caneca.type]) {
      ctx.drawImage(images[caneca.type], caneca.x, caneca.y, caneca.width, caneca.height);
      ctx.strokeRect(caneca.x, caneca.y, caneca.width, caneca.height);
    ctx.font = "16px Arial";
    ctx.fillStyle = `${caneca.color}`; 

   
    const textX = caneca.x + caneca.width / 2; 
    const textY = caneca.y + caneca.height + 20; 

    
    ctx.textAlign = "center";
    ctx.fillText(caneca.type, textX, textY);

    }
  });

  if (selecResiduo) {
    if (images[selecResiduo.type]) {
      ctx.drawImage(
        images[selecResiduo.type],
        selecResiduo.x,
        selecResiduo.y,
        selecResiduo.width,
        selecResiduo.height
      );
    }
  }


  ctx.font = "20px comic";
  ctx.textAlign = "left";
  ctx.fillStyle = "green";
  ctx.fillText(`Aciertos: ${correctCount}`, 20, 30);
  ctx.fillStyle = "red";
  ctx.fillText(`Errores: ${incorrectCount}`, 20, 60);

  if (residuos.length === 0) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    alert("¡Felicidades! Has terminado de seleccionar todos los residuos.")
    alert(`
      Aciertos: ${correctCount}
      Errores: ${incorrectCount} `)
    window.location.reload()
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

canva.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  residuos.forEach((residuo) => {
    if (
      isInside(
        { x: residuo.x, y: residuo.y, width: residuo.width, height: residuo.height },
        mouseX,
        mouseY
      )
    ) {
      selecResiduo = { ...residuo };
    }
  });
});

canva.addEventListener("mousemove", (e) => {
  if (selecResiduo) {
    selecResiduo.x = e.offsetX - selecResiduo.width / 2;
    selecResiduo.y = e.offsetY - selecResiduo.height / 2;
    draw();
  }
});

canva.addEventListener("mouseup", (e) => {
  if (selecResiduo) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    let matchedCaneca = false;

    canecas.forEach((caneca) => {
      if (
        isInside(
          { x: caneca.x, y: caneca.y, width: caneca.width, height: caneca.height },
          mouseX,
          mouseY
        )
      ) {
        if (selecResiduo.type === getResiduoTypeForCaneca(caneca.type)) {
          correctCount++;
          residuos = residuos.filter((residuo) => residuo.type !== selecResiduo.type); 
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
  }
});

const getResiduoTypeForCaneca = (canecaType) => {
  switch (canecaType) {
    case "Blanca":
      return "Aprovechables";
    case "Verde":
      return "Organicos";
    case "Negra":
      return "No Aprovechables";
    default:
      return null;
  }
};

loadImages();
