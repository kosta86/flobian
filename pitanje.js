function Pitanje(tekst, ponudjeniOdgovori) {
  this.tekst = tekst;
  this.ponudjeniOdgovori = ponudjeniOdgovori;
}

Pitanje.prototype.kliknutiOdgovori = function (kliknutiOdgovori) {
  return kliknutiOdgovori;
}

let pitanja = [
  new Pitanje('Koliko godina imate', ['<15', '15-35', '35+']),
  new Pitanje('Da li se bavite sportom', ['da aktivno', 'ne', 'ponekad', 'profesionalni sportista']),
  new Pitanje('Da li imate zdravstvenih problema', ['da', 'ne', 'ne znam']),
  new Pitanje('Koliko tecnosti unosite dnevno', ['<0,5L', '0,5-1L', '1-2L', '>2L'])
]



function Upitnik(pitanja) {
  this.pitanja = pitanja;
  this.RBPitanja = 0;
}

Upitnik.prototype.getPitanje = function() {
  return this.pitanja[this.RBPitanja];
}
Upitnik.prototype.isEnded = function() {
  return this.pitanja.length === this.RBPitanja;
}

var upitnik = new Upitnik(pitanja);

