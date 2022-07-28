   
var profesor = localStorage.getItem("user");
    var url = new URL('http://localhost:3000/kid/get/'+profesor);

var audio = new Audio('../../assets/media/bg.mp3');
    audio.volume = 0.01;	
    audio.play();

var kids = [[]];

    fetch(url)
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        for (x of json) {
            var name = x.k_nombre;
            var age = x.k_edad;
            var prof = x.k_profesor;
            var foto = x.k_foto;
            kids.push([name, age, prof, foto]);
        }
    }) //    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
console.log(kids);

function saveUser(username){
    localStorage.setItem("kid", username);
    if (window.navigate) {
        window.navigate ("/components/index/index.html");
    }
    else {
        location.assign ("/components/index/index.html");
    }
}


   