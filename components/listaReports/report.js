var url = new URL('http://localhost:3000/game/get/');
    fetch(url)
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => {
        let value = '';
        json.forEach((post) => {
            value += `<li class="games">Nombre: ${post.user} - ${post.puntos} puntos. Realizada el: ${post.fecha} en ${post.segundos} seg.</li>`;
        });
        document.body.innerHTML = value;
    }) //    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errore