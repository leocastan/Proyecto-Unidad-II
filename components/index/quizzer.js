var kid = localStorage.getItem("kid");
	document.getElementById("kidLabel").innerHTML =  kid;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

// inicializamos un array de arrays con la preguntas del juego. 
var questions = [
	[
		"https://www.youtube.com/embed/SHtoe0WgtSQ",
		"../../assets/img/Nube.png",
		"../../assets/img/Auto.png",
		"../../assets/img/Tortuga.png",
		"../../assets/img/Fresa.png",
		1
	],
	[
		"https://www.youtube.com/embed/YF8-i5ZuAB4",
		"../../assets/img/Pato.png",
		"../../assets/img/Manzana.png",
		"../../assets/img/Sapo.png",
		"../../assets/img/Murcielago.png",
		0
	],
	[
		"https://www.youtube.com/embed/_r_H3rhMduc",
		"../../assets/img/Murcielago.png",
		"../../assets/img/Dientes.png",
		"../../assets/img/Cerdo.png",
		"../../assets/img/Pato.png",
		1
	],
	[
		"https://www.youtube.com/embed/7RGnteX8GEk",
		"../../assets/img/Zanahoria.png",
		"../../assets/img/Dientes.png",
		"../../assets/img/Uvas.png",
		"../../assets/img/Auto.png",
		0
	],
	[
		"https://www.youtube.com/embed/TrTuIXrG9qk",
		"../../assets/img/Murcielago.png",
		"../../assets/img/Calabaza.png",
		"../../assets/img/Sol.png",
		"../../assets/img/Pulpo.png",
		0
	],
	[
		"https://www.youtube.com/embed/WN9poYU8vio",
		"../../assets/img/Pulpo.png",
		"../../assets/img/Delfin.png",
		"../../assets/img/Sol.png",
		"../../assets/img/Fresa.png",
		0
	],
	[
		"https://www.youtube.com/embed/Ed6qCCqbTj4",
		"../../assets/img/Sapo.png",
		"../../assets/img/Murcielago.png",
		"../../assets/img/Pato.png",
		"../../assets/img/Fresa.png",
		3
	],
	[
		"https://www.youtube.com/embed/3l3lkPkuhmk",
		"../../assets/img/Fresa.png",
		"../../assets/img/Murcielago.png",
		"../../assets/img/Cerdo.png",
		"../../assets/img/Dientes.png",
		2
	],
	[
		"https://www.youtube.com/embed/bWRL4s-fWno",
		"../../assets/img/Pulpo.png",
		"../../assets/img/Murcielago.png",
		"../../assets/img/Tortuga.png",
		"../../assets/img/Zanahoria.png",
		2
	],
];

// Aquí utilizamos UnderscoreJS para generar un template de pregunta.
var questionTemplate = _.template(" \
	<div class='card question'><span class='question'><iframe width='500' height='275' src='<%= question %>' title='YouTube video player' frameborder='0' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1'><img src='<%= a %>' width='140' height='100'></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2'><img src='<%= b %>' width='140' height='100'></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3'><img src='<%= c %>' width='140' height='100'></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4'><img src='<%= d %>' width='140' height='100'></label> \
        </li> \
      </ul> \
    </div> \
");

// Definimos las variables de estado del juego y los valores iniciales (como el tiempo de respuesta de cada pregunta).
var points,
	pointsPerQuestion,
	currentQuestion,
	questionTimer,
	timeForQuestion = 180, // segundos
	timeLeftForQuestion; 
// Manipulacion de elementos con JQuery.
$(function() {
	// Uso de jQuery para escuchar el evento click del botón de Comenzar y Volver a jugar.
	$('button.start').click(start);
	$('.play_again button').click(restart);
	$('.save_bdd button').click(save);

	// La función restart inicializa los valores de las variables de estado del juego.
	function restart() {
		points = 0;
		pointsPerQuestion = 10;
		currentQuestion = 0;
		timeLeftForQuestion = timeForQuestion;
	// Se oculta la pantalla de finalizar y un mensaje que dice "Se acabó el tiempo".
		$('.finish.card').hide();
		$('div.start').show();
		$('.times_up').hide();
		$('.poster-20.card').hide();
		$('.poster-40.card').hide();
		$('.poster-60.card').hide();
		$('.poster-80.card').hide();
		$('.poster-100.card').hide();

		generateCards();
		updateTime();
		updatePoints();
	}

	//  La función start se ejecuta cuando el jugador hace click en comenzar.
	function start() {
		$('div.start').fadeOut(200, function() {
			moveToNextQuestion();
		});
	}

	// Esta es una de las funciones clave del juego, encargada de generar las preguntas. 
	function generateCards() {
		$('.questions').html('');
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			var html = questionTemplate({
				question: q[0],
				index: i,
				a: q[1],
				b: q[2],
				c: q[3],
				d: q[4]
			});
			$('.questions').append(html);
		};

                // Indicamos que nos interesa el evento change de los inputs dentro de los elementos con clase question y card (cada una de las preguntas).
		$('.question.card input').change(optionSelected);
	}

	// Esta función cambia el estado del juego para pasar de una pregunta a la siguiente.
	function moveToNextQuestion() {
		currentQuestion += 1;
		if (currentQuestion > 1) {
			$('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
		}

		// Se muestra la siguiente pregunta.
		showQuestionCardAtIndex(currentQuestion);
		setupQuestionTimer();
	}

	// Esta función inicializa el temporizador para responder una pregunta.
	function setupQuestionTimer() {
		if (currentQuestion > 1) {
			clearTimeout(questionTimer);
		}
		// Cada 1 segundo, nuestro temporizador llamará a la función countdownTick(). 
		questionTimer = setTimeout(countdownTick, 1000);
	}

	// Mostramos la tarjeta de pregunta correspondiente al índice que la función recibe por parámetro.
	function showQuestionCardAtIndex(index) { // staring at 1
		var $card = $('.question.card:nth-child(' + index + ')').show();
	}

	// La función countdownTick() se ejecuta cada un segundo, y actualiza el tiempo restante para responder en la pantalla del jugador.
	function countdownTick() {
		timeLeftForQuestion -= 1;
		updateTime();
		if (timeLeftForQuestion == 0) { 
			return finish();
		}
		questionTimer = setTimeout(countdownTick, 800);
	}

	// Actualiza el tiempo restante en pantalla, utilizando la función html(). 
	function updateTime() {
		$('.countdown .time_left').html(timeLeftForQuestion + 's');
	}

	// Actualiza los puntos en pantalla.
	function updatePoints() {
		$('.points span.points').html(points + ' puntos');
	}

	// Esta función se ejecuta cuando el jugador escoge una respuesta.
	function optionSelected() {
		var selected = parseInt(this.value);
		var correct = questions[currentQuestion-1][5];

		if (selected == correct) {
			points += pointsPerQuestion;
			updatePoints();
			correctAnimation();
		} else {
			wrongAnimation();
		}

		if (currentQuestion == questions.length) {
			clearTimeout(questionTimer);
			return finish();
		}
		moveToNextQuestion();
	}

	// Animación de respuesta correcta e incorrecta.
	function correctAnimation() {
		animatePoints('right');
	}

	// Animación de respuesta correcta e incorrecta.
	function wrongAnimation() {
		animatePoints('wrong');
	}

	// Esta función anima el puntaje en pantalla.
	function animatePoints(cls) {
		$('header .points').addClass('animate ' + cls);
		setTimeout(function() {
			$('header .points').removeClass('animate ' + cls);
		}, 500);
	}

	// Cuando el juego termina, esta función es ejecutada.
	function finish() {
		if (timeLeftForQuestion == 0) {
			$('.times_up').show();
		}
		$('p.final_points').html(points + ' puntos!!');
		$('.question.card:visible').hide();
		$('.finish.card').show();
		if (points>=0 && points<=20) {
			$('.poster-20.card').show();
		}else if(points>20 && points<=40){
			$('.poster-40.card').show();
		}else if(points>40 && points<=60){
			$('.poster-60.card').show();
		}else if(points>60 && points<=80){
			$('.poster-80.card').show();
		}else if(points>80){
			$('.poster-100.card').show();
		}
		
	}
	restart();	
});

function save(){
	alert('Datos guardados correctamente.');
	var url = new URL('http://localhost:3000/game/add/');
	var data = {
		puntos:points,
		user:kid,
		segundos:180-timeLeftForQuestion,
		fecha:today
	}
	const element = document.querySelector('#post-request .article-id');
	const requestOptions = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(data)
	};
	fetch(url, requestOptions)
	.then(response => response.json())
	.then(data => element.innerHTML = data.id );
	if (window.navigate) {
		window.navigate ("/components/home/home.html");
	  }else {
		location.assign ("/components/home/home.html");
	  }
}

