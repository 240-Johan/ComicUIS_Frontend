// Obtener los valores de los campos de entrada
var nombres = document.getElementById('nombre').value;
var password = document.getElementById('password').value;

// Crear un objeto con los datos del usuario
var usuario = {
  nombres: nombres,
  password: password
};

// Convertir el objeto a JSON
var jsonData = JSON.stringify(usuario);

// Crear una solicitud HTTP POST
var xhr = new XMLHttpRequest();
xhr.open('POST', 'localhost:8080/usuario/guardar', true);
xhr.setRequestHeader('Content-type', 'application/json');

// Manejar la respuesta de la solicitud
xhr.onload = function() {
  if (xhr.status === 200) {
    // La solicitud se completó con éxito
    console.log('Datos de usuario guardados.');
  } else {
    // Ocurrió un error en la solicitud
    console.log('Error al guardar los datos del usuario.');
  }
};

// Enviar la solicitud con los datos del usuario
xhr.send(jsonData);
