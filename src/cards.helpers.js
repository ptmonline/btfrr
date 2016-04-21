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
 //  shuffle(pilot)
 //  //Distribueix cartes
 //  user1 = pilot.slice(0, 12);
 //  ordenarCartesPerValor(user1);
 //  user2 = pilot.slice(12, 24);
 //  ordenarCartesPerValor(user2);
 //  user3 = pilot.slice(24, 36);
 //  ordenarCartesPerValor(user3);
 //  user4 = pilot.slice(36, 48);
 //  ordenarCartesPerValor(user4);
  //
 //   if (cartaDeSortida === user1Sortida){
 //      repartirAndEscollir(user1, 'tu')
 //   }else if(cartaDeSortida === user2Sortida){
 //      repartirAndEscollir(user2, 'esquerra')
 //   }else if(cartaDeSortida === user3Sortida){
 //      repartirAndEscollir(user3, 'dreta')
 //   }else{
 //      repartirAndEscollir(user4, 'dalt')
 //   }
 //   setTimeout(function(){
 //     myCards();
 //   },2000)
 // }
