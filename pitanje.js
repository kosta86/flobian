const kviz = (function () {
	let odgovori = [];
	let rezultatiUpitnika = {};

	function Pitanje(tekst, ponudjeniOdgovori, slika) {
		this.tekst = tekst;
		this.ponudjeniOdgovori = ponudjeniOdgovori;
		this.slika = slika;
		this.qId = this.tekst.replace(/[^a-zA-ZšŠđĐžŽčČćĆ0-9 ]/g, "").split(' ').join('_').substring(0, 64);

	/* this.tekst.split(' ').join('_').slice(0, -1); */
	}

	let pitanja = [
		new Pitanje('Da li se osećate naduto nakon jela?', ['DA', 'NE'], '1.png'),
		new Pitanje('Da je vaša nadutost teško podnošljiva ili izuzetno bolna?', ['DA', 'NE'], '2.png'),
		new Pitanje('Imate li često osećaj „kamena“ u stomaku?', ['DA', 'NE'], '3.png'),
		new Pitanje('Da li obavezno morati otkopčati dugme ili popustiti kaiš nakon jela?', ['DA', 'NE'], '4.png'),
		new Pitanje('Da li često imate gasove?', ['DA', 'NE'], '5.png'),
		new Pitanje('Da li postoje promene u učestalosti pražnjenja stolice- dijareja i/ili opstipacija?', ['DA', 'NE'], '6.png'),
		new Pitanje('Da li imate ponavljajući bol u stomaku, u proseku, najmanje 1 dan/nedeljno u poslednja 3 meseca?', ['DA', 'NE'], '7.png'),
		new Pitanje('Da li je bol povezan sa pražnjenjem?', ['DA', 'NE'], '8.png'),
		new Pitanje('Da li Vas neprijatnost u stomaku obavezuje da prestanete sa svojim normalnim aktivnostima?', ['DA', 'NE'], '9.png'),
		new Pitanje('Da li inače u toku dana osećate nervozu i to utiče i na Vaš stomak?', ['DA', 'NE'], '10.png')
	];

	ponudjeniSaveti = {
		'1-2': new RezultatUpitnika(`Stanje vaših creva nije alarmantno ,što ne znači da treba da trpite tegobe. Ma koliko bezazleno
		izgledaju,nadutost i gasovi jesu pojava koju treba lečiti. Povremeno ispoljavanje simptoma koje
		se vezuje sa određenom hranom itd. može dovesti do maskiranja pravog uzorka. Ako budete
		strpljivi i tretirate uzrok minimalno mesec dana, na putu ste ka dugoročno mirnom stomaku.
		Najčešće stomačne tegobe su upravo nadutost, gasovi, abodominalan bol i loše varenje.`, 'bolovi.png', 'flobian1'),

		'3-7': new RezultatUpitnika(`Krajnje je vreme da se pozabavite svojim stomakom. Vaše stanje je ozbiljno ali ne i nerešivo.
		Vaši odgovori ukazuju na veliku razdražljivost creva a tegobe koje osećate kazuju da se vaš
		stomak uporno žali. Ovde je sem prisutnosti simptoma nervoznog creva primećena intezivna
		frekvencija javljanja istih sa tendencijom dugotrajnosti tegoba. Naoružajte se strpljenjem, i uz
		higijensko dijetetski režim uvedite dodatni izvor energije ćelijama Vaših creva. Najčešći simptomi
		nervoznog creva jesu nadutost, pojačana produkcija gasova i osećaj „težine“ u stomaku.
		Pogldeajte koji su okidači koji pogoršavaju simptome`, 'grcevi.png', 'flobian2'),

		'8-10': new RezultatUpitnika(`Ako bismo stadijume nervoze creva opisivali bojama, Vi biste bili u crvenoj zoni. Vaši odgovori
		ukazuju na ozbiljan stepen zapuštenosti creva. Važno je da znate da za osobe sa veoma
		izraženim i upornim dugotrajnim tegobama nema opuštanja. Pred Vama je proces koji zahteva
		strpljenje, smirenost i istrajnost. Neophodno je uvesti upotrebu preparata namenjenih za
		otklanjanje uzroka nervoze creva, promeniti životne navike i kloniti se stresnih situacija. Srećno!`, 'gasovi.png', 'flobian3'),
	};

	function Upitnik(pitanja) {
		this.pitanja = pitanja;
		this.RBPitanja = 0;
	};

	Upitnik.prototype.getPitanje = function () {
		return this.pitanja[this.RBPitanja];
	};
	Upitnik.prototype.isEnded = function () {
		return this.RBPitanja ===  this.pitanja.length;
	};

	function RezultatUpitnika(text, slika, video, link) {
		this.text = text;
		this.slika = slika;
		this.video = video;
		this.link = link;
	};

	function postData(odgovoriZaSlanje) {
		var JSONAnswers = JSON.stringify(odgovoriZaSlanje);
		event.preventDefault();
		
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "./php/user_input.php", true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					var response = xhr.responseText;
					console.log(odgovoriZaSlanje);
				}
			}
			xhr.send(JSONAnswers);
		
	}

	/* function formInputToArray(formId, array) {
		let form = document.getElementById(`${formId}`);

		function Input(polje, inputValue) {
			this.polje = polje;
			this.inputValue = inputValue
		}
		
		for (let i = 0; i < form.elements.length; i++) {

			if (form.elements[i].value !== null || form.elements[i].value !== '') {
				array.push(new Input(form.elements[i].id, form.elements[i].value));
			}	
		}
	} */

	function submitBtnHandler(postData, odgovoriZaSlanje) {
		if (event.target.id === 'postDataButton') {
			/* formInputToArray('formular-prijava', odgovoriZaSlanje); */
			postData(odgovoriZaSlanje);
			console.log(odgovoriZaSlanje);
		}
	}
	

	return {
		odgovori,
		Upitnik,
		pitanja,
		ponudjeniSaveti,
		submitBtnHandler,
		postData
	};
})();



const kvizView = (function () {

	function prikaziRezultat(userOdgovori, ponudjeniSaveti) {
		let poljeRezultata = document.querySelector('#rezultat');
		let poljeUpitnika = document.querySelector('#upitnik');
		let savetiZaPrikazArr = [];
		console.log(ponudjeniSaveti)

		// obrisi polje upitnika posto je zavrsen
		poljeUpitnika.innerHTML = '';

		// iteracija odgovora korisnika i popunjavanje array-a pozitivnim odgovorima
		for (const obj of userOdgovori) {
			if (obj.odgovor === "DA") {		
				savetiZaPrikazArr.push(obj.qId);	
			}
		}

		let uniqueSavetiZaPrikazArr = [... new Set(savetiZaPrikazArr)];
		console.log(ponudjeniSaveti)

		// prikazi savet za taj problem 
		function prikaziSavet(ponudjeniSaveti) {
			let HTMLRezultat = '';
			let HTMLFormular = '';

			if (savetiZaPrikazArr.length >= 0 && savetiZaPrikazArr .length < 3) {
				HTMLRezultat += "<H1>"+ponudjeniSaveti['1-2'].text+"</H1>"

			}

			if (savetiZaPrikazArr.length > 2 && savetiZaPrikazArr .length < 8) {
				HTMLRezultat += "<H1>"+ponudjeniSaveti['3-7'].text+"</H1>";
			}

			if (savetiZaPrikazArr.length > 7 && savetiZaPrikazArr .length <= 10) {
				HTMLRezultat += "<H1>"+ponudjeniSaveti['8-10'].text+"</H1>"
			}

			HTMLFormular += `<form id="formular-prijava">
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="email-input" placeholder="Email">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="ime-input" placeholder="Password">
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" id="postDataButton" class="btn btn-primary">Sign in</button>
    </div>
  </div>
</form>`;



			return HTMLRezultat + HTMLFormular;
		}

		poljeUpitnika.style = "display: none";
		poljeRezultata.style = "display: block";
		poljeRezultata.innerHTML = prikaziSavet(ponudjeniSaveti);
	
	}

	function prikaziPitanje(upitnik) {
		let poljeSlike = document.querySelector('.card-slika');
		let poljeTekstPitanja = document.querySelector('.card-pitanje');
		let poljeOdgovora = document.querySelector('.card-odgovori');
		

		// popuni sliku pitanja
		poljeSlike.innerHTML = `<img src="./img/${upitnik.pitanja[upitnik.RBPitanja].slika}" alt="">`

		// popuni tekst pitanja
		poljeTekstPitanja.innerHTML = `<H2>${upitnik.getPitanje().tekst}<H2>`;

		//prvo obrisi vec prikazane ponudjene odgovore
		poljeOdgovora.innerHTML = "";

		// popuni ponudjene odgovore
		upitnik.getPitanje().ponudjeniOdgovori.forEach(element => {
			let odgovorButton = document.createElement("button");

			odgovorButton.innerHTML = `${element}`;
			odgovorButton.dataset.button = 'odgovor';
			odgovorButton.dataset.odgovor = `${element}`;
			poljeOdgovora.appendChild(odgovorButton);
		});
	}

	return {
		prikaziPitanje,
		prikaziRezultat
	}
})();



const kvizController = (function () {
	let poljeOdgovora = document.querySelector('.card-odgovori');
	let poljeProgresa = document.querySelector('.progress-container');
	let upitnik = new kviz.Upitnik(kviz.pitanja);
	let postData = kviz.postData;
	let submitBtnHandler = kviz.submitBtnHandler;
	let poslednjiKorak = document.getElementById('rezultat');
	
	


	// on page load
	kvizView.prikaziPitanje(upitnik);
	
	// premestiti u view
	function handleAnswerKlik() {
		console.log(upitnik.getPitanje().qId)
		const isAnswerButton = event.target.dataset.button === 'odgovor';
		const kliknutiOdgovor = event.target.dataset.odgovor;

		function pushAnswers() {
			// on click dopuni odgovori array sa pitanjem i odogovorom
			kviz.odgovori.push({
				pitanje: upitnik.getPitanje().tekst,
				odgovor: kliknutiOdgovor,
				qId: upitnik.getPitanje().qId
			})
		}

		//ako je kliknuto na odgovor
		if (isAnswerButton) {
				pushAnswers();
				// on click inkrementuj redni broj pitanja
				upitnik.RBPitanja++
				if (upitnik.isEnded()) {
					kvizView.prikaziRezultat(kviz.odgovori, kviz.ponudjeniSaveti); // prikazi stranu sa savetima za korisnika
				} else {
					kvizView.prikaziPitanje(upitnik);
				}	
		}
	}

	// event handlers
	poljeOdgovora.addEventListener('click', handleAnswerKlik); // hendler za klik na odogovor
	poslednjiKorak.addEventListener('click', submitBtnHandler.bind(this, postData, kviz.odgovori)); // hendler za klik na dugme za prijavu

	return {
		upitnik
	}
})(kviz, kvizView);






