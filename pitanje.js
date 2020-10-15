var model = (function () {
	const odgovori = [];

	function Pitanje(tekst, ponudjeniOdgovori, slika) {
		this.tekst = tekst;
		this.ponudjeniOdgovori = ponudjeniOdgovori;
		this.slika = slika;
	}

	Pitanje.prototype.upisiOdgovor = function (buttonDataset) {
		
	}

	let pitanja = [
		new Pitanje('Da li se osećate naduto nakon jela?', ['DA', 'NE'], '1.png'),
		new Pitanje('Da je vaša nadutost teško podnošljiva ili izuzetno bolna?', ['DA', 'NE'], '2.png'),
		new Pitanje('Imate li često osećaj „kamena“ u stomaku?', ['DA', 'NE'], '3.png'),
		new Pitanje('Da li obavezno morati otkopčati dugne ili popustiti kaiš nakon jela?', ['DA', 'NE'], '4.png'),
		new Pitanje('Da li često imate gasove?', ['DA', 'NE'], '5.png'),
		new Pitanje('Da li postoje promene u učestalosti pražnjenja stolice- dijareja i/ili opstipacija?', ['DA', 'NE'], '6.png'),
		new Pitanje('Da li imate ponavljajući bol u stomaku, u proseku, najmanje 1 dan/nedeljno u poslednja 3 meseca?', ['DA', 'NE'], '7.png'),
		new Pitanje('Da li je bol povezan sa pražnjenjem?', ['DA', 'NE'], '8.png'),
		new Pitanje('Da li Vas neprijatnost u stomaku obavezuje da prestanete sa svojim normalnim aktivnostima?', ['DA', 'NE'], '9.png'),
		new Pitanje('Da li inače u toku dana osećate nervozu i to utiče i na Vaš stomak?', ['DA', 'NE'], '10.png')
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
	function prikaziRezultat() {
		document.getElementById('upitnik-mob').innerHTML = '<H1>Uspesno ste zavrsili upitnik<H1>';
	}

	function prikaziPitanje(upitnik) {

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
			var odgovorButton = document.createElement("button");
			odgovorButton.innerHTML = `${element}`;
			odgovorButton.dataset.button = 'odgovor';
			odgovorButton.dataset.odgovor = `${element}`;
			/* button.dataset.checked = false; */
			poljeOdgovora.appendChild(odgovorButton);
		});

	}

	return {
		prikaziPitanje,
		prikaziRezultat
	}
})();



var controller = (function () {
	let poljeOdgovora = document.querySelector('.card-odgovori');
	let poljeProgresa = document.querySelector('.progress-container');
	let upitnik = new model.Upitnik(model.pitanja);

	// event handlers
	poljeOdgovora.addEventListener('click', handleAnswerKlik); // napravi ovu callback funkciju 

	// on page load
	view.prikaziPitanje(upitnik);
	upitnik.RBPitanja++;

	function handleAnswerKlik() {
		const isAnswerButton = event.target.dataset.button === 'odgovor';
		const kliknutiOdgovor = event.target.dataset.odgovor;
		
		//ako je kliknuto na odgovor
		if (isAnswerButton) {
			console.log(model.odgovori)
			if (upitnik.isEnded()) {
				view.prikaziRezultat(); // prikazi stranu sa savetima za korisnika
			} else {
				// on click prikazi pitanja
				view.prikaziPitanje(upitnik);
				// on click dopuni odgovori array sa pitanjem i odogvorom
				model.odgovori.push({
					pitanje: upitnik.getPitanje().tekst,
					odgovor: kliknutiOdgovor
				})
				// on click inkrementuj redni broj pitanja
				upitnik.RBPitanja++;
			}
		}
	}

})(model, view);






