var model = (function () {
	const odgovori = [];

	function Pitanje(tekst, ponudjeniOdgovori) {
		this.tekst = tekst;
		this.ponudjeniOdgovori = ponudjeniOdgovori;
	}

	Pitanje.prototype.kliknutiOdgovori = function (kliknutiOdgovori) {
		return kliknutiOdgovori;
	}

	let pitanja = [
		new Pitanje('Da li je vaša nadutost teško podnošljiva ili izuzetno bolna', ['DA', 'NE']),
		new Pitanje('Da li se bavite sportom', ['da aktivno', 'ne', 'ponekad', 'profesionalni sportista']),
		new Pitanje('Da li imate zdravstvenih problema', ['da', 'ne', 'ne znam']),
		new Pitanje('Koliko tecnosti unosite dnevno', ['<0,5L', '0,5-1L', '1-2L', '>2L']),
		new Pitanje('Koliko tecnosti unosite dnevno', ['<0,5L', '0,5-1L', '1-2L', '>2L'])
	]


	function Upitnik(pitanja) {
		this.pitanja = pitanja;
		this.RBPitanja = 0;
	}

	Upitnik.prototype.getPitanje = function () {
		return this.pitanja[this.RBPitanja];
	}
	Upitnik.prototype.isEnded = function () {
		return this.RBPitanja === this.pitanja.length;
	}

	let upitnik = new Upitnik(pitanja);


	return {
		odgovori,
		upitnik,
		pitanja
	}
})();



var view = (function () {
	function prikaziKraj() {
		document.getElementById('upitnik').innerHTML = '<H1>Uspesno ste zavrsili upitnik<H1>';
	}

	function prikaziPitanja(upitnik) {

		let poljeTekstPitanja = document.querySelector('.card-pitanje');
		let poljeOdgovora = document.querySelector('.card-odgovori');

		// popuni tekst pittanja
		poljeTekstPitanja.innerHTML = `<H2>${upitnik.getPitanje().tekst}<H2>`;

		//prvo obrisi vec prikazane ponudjene odgovore
		poljeOdgovora.innerHTML = "";

		// popuni ponudjene odgovore
		upitnik.getPitanje().ponudjeniOdgovori.forEach(element => {
			var button = document.createElement("button");
			button.innerHTML = `${element}`;
			poljeOdgovora.appendChild(button);
		});

	}

	return {
		prikaziPitanja,
		prikaziKraj
	}
})();



var controller = (function () {
	let poljeOdgovora = document.querySelector('.card-odgovori');

	if (model.upitnik.isEnded()) {
		view.prikaziKraj();

		function sendToDatabase() {
			// neki ajax post request
		}
	} else {

		// on page load
		view.prikaziPitanja(model.upitnik);

		// event handlers
		poljeOdgovora.addEventListener('click', handleKlik)
	}


	function handleKlik(event) {
		
		const isButton = event.target.nodeName === 'BUTTON';

		//ako je kliknuto na odgovor(button element)
		if (isButton) {

			// popuni odgovori array sa pitanjem i odogvorom
			model.odgovori.push({
				pitanje: model.upitnik.getPitanje().tekst,
				odgovor: event.target.innerText
			})

			// inkrementuj redni broj pitanja
			model.upitnik.RBPitanja++;

			// prikazi nova pitanja
			view.prikaziPitanja(model.upitnik);
			
		}

		console.log(model.upitnik.RBPitanja === model.pitanja.length);
	}

		


	

})(model, view);






