const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const displayHora = document.querySelector('.display-hora');

function min_sec_to_deg(n){
	let grado = ((n/60)*360)+90;
	return grado;
}

function setDate(){
	const ahora = new Date();
	const segundos = ahora.getSeconds();
	const minutos = ahora.getMinutes();
	const hora = ahora.getHours();

	const segundosGrados = min_sec_to_deg(segundos);
	const minutosGrados = min_sec_to_deg(minutos);
	const horasGrados = (((hora/12)*360)+90);

	secondHand.style.transform = `rotate(${segundosGrados}deg)`;
	minHand.style.transform = `rotate(${minutosGrados}deg)`;
	hourHand.style.transform = `rotate(${horasGrados}deg)`;

	displayHora.innerHTML = hora + ':' + minutos + ':' + segundos;

	//console.log(hora, minutos, segundos);
}

setInterval(setDate, 1000);