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
		new Pitanje('Da li je vaša nadutost teško podnošljiva ili izuzetno bolna', ['DA', 'NE'], '1.png'),
		new Pitanje('Da li se bavite sportom', ['DA', 'NE'], '2.png'),
		new Pitanje('Da li imate zdravstvenih problema', ['DA', 'NE'], '3.png'),
		new Pitanje('Da li ste dobro', ['DA', 'NE'], '4.png'),
		new Pitanje('Koliko tecnosti unosite dnevno', ['DA', 'NE'], '5.png')
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
			var button = document.createElement("button");
			button.innerHTML = `${element}`;
			button.dataset.checked = false;
			poljeOdgovora.appendChild(button);
		});

	}

	return {
		prikaziPitanje,
		prikaziKraj
	}
})();



var controller = (function () {
	let poljeOdgovora = document.querySelector('.card-odgovori');
	let poljePrevNext = document.querySelector('.prev-next-container');
	let upitnik = new model.Upitnik(model.pitanja);

	// event handlers
	poljePrevNext.addEventListener('click', handlePrevNextKlik.bind(this, poljeOdgovora, poljePrevNext));
	poljeOdgovora.addEventListener('click', handleAnswerKlik.bind(this, poljeOdgovora ,poljePrevNext)); // napravi ovu callback funkciju 

	// on page load
	view.prikaziPitanje(upitnik);
	upitnik.RBPitanja++;

	function handlePrevNextKlik(poljeOdgovora, poljePrevNext) {
		const isNextButton = event.target.dataset.button === 'NEXT';
		const isPrevButton = event.target.dataset.button === 'PREV';
		/* const kliknutiOdgovor = (function() {
			let odgovor = Array.from(poljeOdgovora.childNodes).filter(el=> el.dataset.checked === "true");
			return odgovor[0].innerText;
		})() */
		


		//ako je kliknuto na next dugme
		if (isNextButton) {
			if (upitnik.isEnded()) {
				view.prikaziKraj();
				console.log(model.odgovori)
				// funkcija za slanje odgovora u bazu
				function sendToDatabase() {
					// neki ajax post request
				}
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

	function handleAnswerKlik(poljeOdgovora, poljePrevNext) {
		let clickedButton = event.target;

		function toggleChecked() {
			let ponudjeniOdgovori = poljeOdgovora.childNodes;
			ponudjeniOdgovori.forEach(el => {
				if (clickedButton === el && el.dataset.checked === "false") {
					el.classList.add("checked");
					el.dataset.checked = "true";
					
				} else {
					el.classList.remove("checked");
					el.dataset.checked = "false";
				}
			})
		}

		if (event.target.nodeName === "BUTTON") {
			toggleChecked(poljeOdgovora);
		}
	}






})(model, view);






