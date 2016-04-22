//Barreixa cartes
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Ordenar cartes per pal
function ordenarCartesPerValor(user){
  user.sort(function(a, b){
    if(a.pal < b.pal) return -1;
    if(a.pal > b.pal) return 1;
    return 0;
  })
}

//Setting attributes helper
function setAttributes(el, attrs) {
   for(var key in attrs) {
     el.setAttribute(key, attrs[key]);
   }
 }

 //Netejar cartes de la taula
 function cleanTapete(){
   var cleaner, palsId = ['dreta', 'esquerra', 'dalt', 'tu'];
   for (var t = 0; t < palsId.length; t++){
     cleaner = document.getElementById(palsId[t]);
     cleaner.innerHTML = '';
     cleaner.setAttribute('data-card' , '')
     cleaner.setAttribute('class' , 'tapetejugada carta')
   }
 }

//Netejar informacio de partida
function cleanInfo(){
  triomfPos.innerHTML = '';
  triomfSel.innerHTML = '';
  basaSortidaGuanyador.innerHTML = '';
  puntuacioTeamA.innerHTML ='';
  puntuacioTeamB.innerHTML ='';
  seleccionatBasa.innerHTML='';
}
