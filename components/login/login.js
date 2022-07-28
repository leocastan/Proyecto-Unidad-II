var data = null;
function go(){
    var pass = document.form.password.value;
    var user = document.form.username.value;

    var url = new URL('http://localhost:3000/user/get/'+user+'/'+pass);
    fetch(url)
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
      if (json[0]) {
        localStorage.setItem("user", user);
        if (window.navigate) {
          window.navigate ("/components/home/home.html");
        }else {
          location.assign ("/components/home/home.html");
        }
      }else{
        alert("Usuario y/o contraseña incorrecto!")
      }
    }) //    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errore
}



