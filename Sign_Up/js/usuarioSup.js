
function login() {
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    var nombre = document.getElementById("nombre").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/usuario/guardar", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            if (this.responseText === "true") {
                window.location.href = "/index.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        }
    }
    xhr.send(JSON.stringify({correos: correo, password: password, nombre: nombre}));
}
login(1)
