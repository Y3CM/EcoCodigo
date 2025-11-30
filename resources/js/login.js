let user = document.getElementById("user");
let pass = document.getElementById("password");
let btn = document.getElementById("login");

const existe = (array, mail) => {
  let valor = null;
  array.forEach((element) => {
    if (element.correo == mail) {
      valor = element;
      return;
    }
  });
  return valor;
};

btn.addEventListener("click", () => {
  let login = [];
  let userReg = localStorage.users;
  userReg = JSON.parse(userReg);
  if (existe(userReg, user.value) != null) {
    userReg.forEach((element) => {
      if (element.correo == user.value && element.password == pass.value) {
        let objeto = {
          correo: element.correo,
          password: element.password,
        };
        login.push(objeto);
        localStorage.login = JSON.stringify(login);
        window.location.href = "index.html";
      } else {
        error.setAttribute("class", "error");
        error.innerHTML = "Error, Usuario o contraseña incorrecta";
      }
    });
  } else {
    error.setAttribute("class", "error");
    error.innerHTML = "Usuario no registrado";
  }
});
