var model = (function () {
	const odgovori = [];

	function Pitanje(tekst, ponudjeniOdgovori, slika) {
		this.tekst = tekst;
		this.ponudjeniOdgovori = ponudjeniOdgovori;
		this.slika = slika;
	}

	Pitanje.prototype.kliknutiOdgovori = function (kliknutiOdgovori) {
		return kliknutiOdgovori;
	}

	let pitanja = [
		new Pitanje('Da li je vaša nadutost teško podnošljiva ili izuzetno bolna', ['DA', 'NE'], 'card_slika.png'),
		new Pitanje('Da li se bavite sportom', ['DA', 'NE'], 'flobian-desk.png'),
		new Pitanje('Da li imate zdravstvenih problema', ['DA', 'NE'], 'flobian-mob.png'),
		new Pitanje('Da li ste dobro', ['DA', 'NE'], 'card_slika.png'),
		new Pitanje('Koliko tecnosti unosite dnevno', ['DA', 'NE'], 'card_slika.png')
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




	return {
		odgovori,
		Upitnik,
		pitanja
	}
})();



var view = (function () {
	function prikaziKraj() {
		document.getElementById('upitnik-mob').innerHTML = '<H1>Uspesno ste zavrsili upitnik<H1>';
	}

	function prikaziPitanja(upitnik) {

		let poljeSlike = document.querySelector('.card-slika');
		let poljeTekstPitanja = document.querySelector('.card-pitanje');
		let poljeOdgovora = document.querySelector('.card-odgovori');

		console.log(upitnik)
		// popuni sliku pitanja
		poljeSlike.innerHTML = `<img src="./img/${upitnik.pitanja[upitnik.RBPitanja].slika}" alt="">`

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
	let upitnik = new model.Upitnik(model.pitanja);

	// event handlers
	poljeOdgovora.addEventListener('click', handleKlik)

	// on page load
	view.prikaziPitanja(upitnik);
	upitnik.RBPitanja++;

	function handleKlik(event) {
		const isButton = event.target.nodeName === 'BUTTON';

		//ako je kliknuto na odgovor(button element)
		if (isButton) {

			if (upitnik.isEnded()) {
				console.log((upitnik.isEnded()))
				view.prikaziKraj();

				function sendToDatabase() {
					// neki ajax post request
				}
			} else {
				// on click
				view.prikaziPitanja(upitnik);

				// popuni odgovori array sa pitanjem i odogvorom
				model.odgovori.push({
					pitanje: upitnik.getPitanje().tekst,
					odgovor: event.target.innerText
				})

				// on click inkrementuj redni broj pitanja
				upitnik.RBPitanja++;
				console.log((upitnik.isEnded()))
			}







		}



	}






})(model, view);






