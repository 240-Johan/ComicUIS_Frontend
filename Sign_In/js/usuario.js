
var nombres = document.getElementById('nombre').value;
var password = document.getElementById('password').value;
var usuario = {
  nombres: nombres,
  password: password
};

var jsonData = JSON.stringify(usuario);

var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8080/usuario/guardar', true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log('Datos de usuario guardados.');
  } else {
    console.log('Error al guardar los datos del usuario.');
  }
};

xhr.send(jsonData);
