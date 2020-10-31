const kviz = (function () {
	let odgovori = [];
	let rezultatiUpitnika = {};

	function Pitanje(tekst, ponudjeniOdgovori, slika) {
		this.tekst = tekst;
		this.ponudjeniOdgovori = ponudjeniOdgovori;
		this.slika = slika;
		this.qId = this.tekst.replace(/[^a-zA-ZšŠđĐžŽčČćĆ0-9 ]/g, "").split(' ').join('_').substring(0, 64);
	}

	let pitanja = [
		new Pitanje('Da li se osećate naduto nakon jela?', ['DA', 'NE'], '1.png'),
		new Pitanje('Da li je vaša nadutost teško podnošljiva ili izuzetno bolna?', ['DA', 'NE'], '2.png'),
		new Pitanje('Imate li često osećaj „kamena“ u stomaku?', ['DA', 'NE'], '3.png'),
		new Pitanje('Da li obavezno morate otkopčati dugme ili popustiti kaiš nakon jela?', ['DA', 'NE'], '4.png'),
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
		this.brojDaOdgovora = 0;
	};

	Upitnik.prototype.getPitanje = function () {
		return this.pitanja[this.RBPitanja];
	};
	Upitnik.prototype.isEnded = function () {
		return this.RBPitanja === this.pitanja.length;
	};

	function RezultatUpitnika(text, slika, video, link) {
		this.text = text;
		this.slika = slika;
		this.video = video;
		this.link = link;
	};

	function postData(odgovoriZaSlanje, linkKaSkriptu) {
		var JSONAnswers = JSON.stringify(odgovoriZaSlanje);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", linkKaSkriptu, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var response = xhr.responseText;
			}
		}
		xhr.send(JSONAnswers);
	}

	function brojPozitivnihOdogovora(userOdgovori) {
		let pozitivniOdgovori = 0;
		// iteracija odgovora korisnika i popunjavanje array-a pozitivnim odgovorima
		for (const obj of userOdgovori) {
			if (obj.odgovor === "DA") {
				pozitivniOdgovori++;
			}
		}
		return pozitivniOdgovori;
	}

	function formInputToArray(formId, array) {
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

		array.push({brojPozitivnihOdgovora: brojPozitivnihOdogovora(kviz.odgovori)})
	}


	function submitBtnHandler(postData, odgovoriZaSlanje) {
		const imeInput = document.getElementById('ime_input');
		const emailInput = document.getElementById('email_input');
		const telefonInput = document.getElementById('telefon_input');


		function checkInputs() {
			const imeValue = imeInput.value;
			const emailValue = emailInput.value.trim();
			const telefonValue = telefonInput.value.trim();


			if (imeValue === '') {
				setErrorFor(imeInput, 'Polje ne može biti prazno');
			} else if (!isName(imeValue)) {
				setErrorFor(imeInput, 'Ime moze sadrzati samo slova');
			} else {
				setSuccessFor(imeInput);
			}

			if (emailValue === '') {
				setErrorFor(emailInput, 'Polje ne može biti prazno');
			} else if (!isEmail(emailValue)) {
				setErrorFor(emailInput, 'Email adresa nije validna');
			} else {
				setSuccessFor(emailInput);
			}

			if (telefonValue === '') {
				setErrorFor(telefonInput, 'Polje ne može biti prazno');
			} else if (!isTelephone(telefonValue)) {
				setErrorFor(telefonInput, 'Proverite broj telefona koji ste uneli');
			} else {
				setSuccessFor(telefonInput);
			}
		}

		function setErrorFor(input, message) {
			const formControl = input.parentElement;
			const small = formControl.querySelector('small');
			formControl.className = 'form-controller error';
			small.innerText = message;
		}

		function setSuccessFor(input) {
			const formControl = input.parentElement;
			formControl.className = 'form-controller success';
		}

		function isEmail(email) {
			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		}

		function isName(name) {
			return /^[A-Za-z\s]+$/.test(name);
		}

		function isTelephone(telephone) {
			return /^[- +()]*[0-9][- +()0-9]*/.test(telephone)
		}
		checkInputs();

		if (imeInput.parentElement.classList.contains('success') && emailInput.parentElement.classList.contains('success') && telefonInput.parentElement.classList.contains('success')) {
			formInputToArray('formular-prijava', odgovoriZaSlanje);
			postData(odgovoriZaSlanje, 'php/send_mail.php');
			postData(odgovoriZaSlanje, 'php/send_to_db.php');
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
	let mobContainer = document.querySelector('.mob-container')
	let rezultatWrapper = document.getElementById('rezultat-wrapper');
	let tekstRezultata = document.getElementById('tvoj-rezultat-polje');
	let poljeFormulara = document.getElementById('prikljuci-se-form');
	let poljeUpitnika = document.getElementById('upitnik');
	let savetiZaPrikazArr = [];
	let rezultatTekst = '';
	let rezultatVideo;

	 let scrolldiv = function() {  
		poljeFormulara.scrollIntoView(); 
	} 
	
	function prikaziRezultat(userOdgovori, ponudjeniSaveti) {
		// obrisi polje upitnika posto je zavrsen
		poljeUpitnika.innerHTML = '';

		// iteracija odgovora korisnika i popunjavanje array-a pozitivnim odgovorima
		for (const obj of userOdgovori) {
			if (obj.odgovor === "DA") {
				savetiZaPrikazArr.push(obj.qId);
			}
		}

		// prikazi savet za taj problem 
		function prikaziSavet(ponudjeniSaveti) {
			if (savetiZaPrikazArr.length >= 0 && savetiZaPrikazArr.length < 3) {

				rezultatTekst = `${ponudjeniSaveti['1-2'].text}`;
			}

			if (savetiZaPrikazArr.length > 2 && savetiZaPrikazArr.length < 8) {

				rezultatTekst = `${ponudjeniSaveti['3-7'].text}`;
			}

			if (savetiZaPrikazArr.length > 7 && savetiZaPrikazArr.length <= 10) {

				rezultatTekst = `${ponudjeniSaveti['8-10'].text}`;
			}

			let HTMLRezultat = `
			<div class="container">
				<div id="tvoj-rezultat">
					<div class="row">
						<div id="tvoj-rezultat-polje" class="col-12 col-sm-6 py-3 px-4">
							<h2 class="mb-3">TVOJ REZULTAT</h2>
							<p>${rezultatTekst}</p>
							<button id="scroll-btn" type="button">UČESTVUJ U IZAZOVU</button>
						</div>
						<div id="tvoj-rezultat-video" class="col-12 col-sm-6" style="overflow:hidden;position: relative;"><iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="100%" height="100%" type="text/html" src="https://www.youtube.com/embed/DBXH9jJRaDk?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe><div style="position: absolute;bottom: auto;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"><small style="line-height: 1.8;font-size: 0px;background: #fff;"> <a href="https://egymp3.com/" rel="nofollow">Egymp3</a> </small></div><style>.newst{position:relative;text-align:right;height:420px;width:520px;} #gmap_canvas img{max-width:none!important;background:none!important}</style></div><br /></div>
					</div>
				
				<div id="saznaj-vise" class="mt-1 mt-md-0 pb-3">
					<h3 class="my-3">Saznaj više</h3>
					<div class="row px-2">
						<div class="col-3 saznaj-vise-ikonice">
							<img id="saznaj-vise-1" src="img/gasovi.jpg" alt="ikonica gasovi">
						</div>
						<div class="col-3 saznaj-vise-ikonice">
							<img id="saznaj-vise-2" src="img/grcevi.jpg" alt="ikonica grcevi">
						</div>
						<div class="col-3 saznaj-vise-ikonice">
							<img id="saznaj-vise-3" src="img/nadutost.jpg" alt="ikonica nadutost">
						</div>
						<div class="col-3 saznaj-vise-ikonice">
							<img id="saznaj-vise-4" src="img/tezina.jpg" alt="ikonica tezina">
						</div>
					</div>
				</div>
				<div id="izazov">
					<div class="row">
						<div id="izazov-tekst" class="col-12 col-sm-6 py-4 py-lg-5 py-md-5 px-4">
							<h1 class="mb-3">UČESTVUJ U IZAZOVU</h1>
							<p>Priključi se <span>FLOBIAN izazovu</span>, poruči kutiju, isprati sve instrukcije i za <span>40 DANA</span> tvoji rezultati su tu. U sklopu izazova dobijaš:</p>
							<ul>
								<li>KONSULTACIJE SA STRUČNJAKOM</li>
								<li>TOKOM TERAPIJE 33% GRATIS</li>
								<li>GARANCIJA ILI VRAĆAMO NOVAC</li>
							</ul>
						</div>
						<div id="izazov-slika" class="col-12 col-sm-6 py-4 py-md-5 px-4">
							<img src="img/flobian-kutije.png" alt="tezina">
						</div>
						<div id="dalje" class="col-12 pt-4 pb-2 px-4">
							<img src="img/strelice-dole.png" alt="tezina">
						</div>
					</div>
				</div>
				<div id="prikljuci-se" class="py-md-5">
					<div class="row">
						<div id="prikljuci-se-form" class="col-12 px-5 py-3">
							<div class="form-container">
								<h2 class="mb-md-5">PRIKLJUČI SE</h2>
								<form id="formular-prijava" class="flobian-form">
									<div class="form-controller">
										<input type="text" placeholder="Ime i prezime" id="ime_input" />
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
									<div class="form-controller">
										<input type="text" placeholder="E-mail" id="email_input" />
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
									<div class="form-controller">
										<input type="text" placeholder="Broj telefona" id="telefon_input" />
										<i class="fas fa-check-circle"></i>
										<i class="fas fa-exclamation-circle"></i>
										<small>Error message</small>
									</div>
									<button id="postDataButton" class="mt-md-3">PRIJAVI SE</button>
								</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`;
			
			return HTMLRezultat;
		}

		poljeUpitnika.style = "display: none";
		mobContainer.style = "display: none";
		rezultatWrapper.style = "display: block";
		rezultatWrapper.innerHTML = prikaziSavet(ponudjeniSaveti);

	}

	function prikaziPitanje(upitnik) {
		let poljeSlike = document.querySelector('.card-slika');
		let poljeTekstPitanja = document.querySelector('.card-pitanje');
		let poljeOdgovora = document.querySelector('.card-odgovori');
		let progressContainer = document.getElementById('progress-container');
		let poljeUpitnika = document.getElementById('upitnik');


		// progress span
		progressContainer.innerHTML = `<span>${upitnik.RBPitanja + 1}/10</span>`;

		// obrisi staru pozadinu ako postoji
		if (poljeUpitnika.firstElementChild.tagName === 'IMG') { 
			poljeUpitnika.firstElementChild.remove()
		} 

		poljeSlike.innerHTML = `<img src="./img/${upitnik.pitanja[upitnik.RBPitanja].slika}" alt="">`;

		// ubaci novu pozadinu
		poljeUpitnika.insertAdjacentHTML('afterBegin', `<img id="background-image" class="" src="img/desk/desk_${upitnik.RBPitanja + 1}.jpg" alt="">`); 
		
		// popuni tekst pitanja
		poljeTekstPitanja.innerHTML = `<p>${upitnik.getPitanje().tekst}</p>`;

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
		prikaziRezultat,
		poljeFormulara,
		scrolldiv
	}
})();



const kvizController = (function () {
	let poljeOdgovora = document.querySelector('.card-odgovori');
	let poljeProgresa = document.querySelector('.progress-container');
	let upitnik = new kviz.Upitnik(kviz.pitanja);
	let postData = kviz.postData;
	let submitBtnHandler = kviz.submitBtnHandler;
	let poslednjiKorak = document.getElementById('rezultat-wrapper');
	let form = document.getElementById('formular-prijava');




	// on page load
	kvizView.prikaziPitanje(upitnik);

	// premestiti u view
	function handleAnswerKlik() {
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
	poljeOdgovora.addEventListener('click', handleAnswerKlik); // hendler za klik na odgovor

	poslednjiKorak.addEventListener('submit', event => {       // hendler za klik na dugme za submit */
		event.preventDefault();
		submitBtnHandler(postData, kviz.odgovori);
	})

	return {
		upitnik
	}
})(kviz, kvizView);






