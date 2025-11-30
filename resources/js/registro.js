let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("email");
let pass = document.getElementById("password");
let btn = document.getElementById("btn");

const existe = (array, email) => {
  let valor = false;
  array.forEach((item) => {
    if (item.correo == email) {
      valor = true;
      return;
    }
  });
  return valor;
};

btn.addEventListener("click", () => {
  let users = [];
  let usersReg = localStorage.users;

  if (usersReg != null) {
    users = JSON.parse(usersReg);
  }

  if (existe(users, correo.value)) {
    msj.setAttribute("class", "error");
    msj.innerHTML = `el correo ${correo.value} ya existe`;
  } else {
    if (
      nombre.value === "" ||
      apellido.value === "" ||
      correo.value === "" ||
      pass.value === ""
    ) {
      msj.setAttribute("class", "error");
      msj.innerHTML = "Algunos campos están vacíos";
    } else {
      let objeto = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        password: pass.value,
      };
      users.push(objeto);
      localStorage.setItem("users", JSON.stringify(users));
      msj.setAttribute("class", "success");
      msj.innerHTML = `usuario registrado correctamente`;
      nombre.value = "";
      apellido.value = "";
      correo.value = "";
      pass.value = "";
    }
  }
});
