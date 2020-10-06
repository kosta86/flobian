(function () {
	let poljeOdgovora = document.getElementById('odgovori');

	// on page load
	if (upitnik.isEnded()) {
		prikaziKraj();
	} else {
		prikaziPitanja();
	}

	function handleKlik(event) {
		const isButton = event.target.nodeName === 'BUTTON';

		//ako je kliknuto na odgovor(button element)
		if (isButton) {

			// popuni odgovori array sa pitanjem i odogvorom
			model.odgovori.push({
				pitanje: upitnik.getPitanje().tekst,
				odgovor: event.target.innerText
			})
			console.log(model.odgovori);

			// inkrementuj redni broj pitanja
			upitnik.RBPitanja++;

			// prikazi nova pitanja
			prikaziPitanja();

		}

	}

	view.prikaziPitanja();

	//event handlers
	poljeOdgovora.addEventListener('click', handleKlik)

	function sendToDatabase() {

		// ako je zavrsen upitnik posalji u bazu
		if (upitnik.isEnded) {
			// neki ajax post request
		}
	}
})(model, view)

