let poljeOdgovora = document.getElementById('odgovori');
const odgovori = [];
prikaziPitanja();

//event handlers
poljeOdgovora.addEventListener('click', function(event) {
  const isButton = event.target.nodeName === 'BUTTON';

  //ako je kliknuto na odgovor(button element)
  if (isButton) {

    // popuni odgovori array sa pitanjem i odogvorom
    odgovori.push({
      pitanje: upitnik.getPitanje().tekst,
      odgovor: event.target.innerText
    })

    // inkrementuj redni broj pitanja
    upitnik.RBPitanja++;

    // prikazi nova pitanja
    prikaziPitanja();

  }

})

let sendToDatabase() {
  
  // ako je zavrsen upitnik posalji u bazu
  if (upitnik.isEnded) {
    // neki ajax post request
  }
} 
