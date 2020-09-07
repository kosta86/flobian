let prikaziKraj = function () {
  document.getElementById('upitnik').innerHTML = '<H1>Uspesno ste zavrsili upitnik<H1>';
}

let prikaziPitanja = function () {
  if (upitnik.isEnded()) {
    prikaziKraj();
  } else {
    let poljeTekstPitanja = document.getElementById('pitanje');
    let poljeOdgovora = document.getElementById('odgovori');

    // popuni tekst pittanja
    poljeTekstPitanja.innerHTML = `<H1>${upitnik.getPitanje().tekst}<H1>`;

    //prvo obrisi ponudjene odgovore
    poljeOdgovora.innerHTML = "";

    // popuni ponudjene odgovore
    upitnik.getPitanje().ponudjeniOdgovori.forEach(element => {
      var button = document.createElement("button");
      button.innerHTML = `${element}`;
      poljeOdgovora.appendChild(button);
    });
  }
}




