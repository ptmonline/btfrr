(function(){
  var user1 = [], user2 = [], user3 = [], user4 = [];
  var user1Sortida, user2Sortida, user3Sortida, user4Sortida;
  var tapete = document.getElementById('user1');
  var triomf;
  var winner = [];
  var pilot = [
    {valor:1, pal:'oros', puntuacio: 4},{valor:2, pal:'oros', puntuacio: 0},{valor:3, pal:'oros', puntuacio: 0},
    {valor:4, pal:'oros', puntuacio: 0},{valor:5, pal:'oros', puntuacio: 0},{valor:6, pal:'oros', puntuacio: 0},
    {valor:7, pal:'oros', puntuacio: 0},{valor:8, pal:'oros', puntuacio: 0},{valor:9, pal:'oros', puntuacio: 5},
    {valor:10, pal:'oros', puntuacio: 1},{valor:11, pal:'oros', puntuacio: 2},{valor:12, pal:'oros', puntuacio: 3},
    {valor:1, pal:'copes', puntuacio: 4},{valor:2, pal:'copes', puntuacio: 0},{valor:3, pal:'copes', puntuacio: 0},
    {valor:4, pal:'copes', puntuacio: 0},{valor:5, pal:'copes', puntuacio: 0},{valor:6, pal:'copes', puntuacio: 0},
    {valor:7, pal:'copes', puntuacio: 0},{valor:8, pal:'copes', puntuacio: 0},{valor:9, pal:'copes', puntuacio: 5},
    {valor:10, pal:'copes', puntuacio: 1},{valor:11, pal:'copes', puntuacio: 2},{valor:12, pal:'copes', puntuacio: 3},
    {valor:1, pal:'bastos', puntuacio: 4},{valor:2, pal:'bastos', puntuacio: 0},{valor:3, pal:'bastos', puntuacio: 0},
    {valor:4, pal:'bastos', puntuacio: 0},{valor:5, pal:'bastos', puntuacio: 0},{valor:6, pal:'bastos', puntuacio: 0},
    {valor:7, pal:'bastos', puntuacio: 0},{valor:8, pal:'bastos', puntuacio: 0},{valor:9, pal:'bastos', puntuacio: 5},
    {valor:10, pal:'bastos', puntuacio: 1},{valor:11, pal:'bastos', puntuacio: 2},{valor:12, pal:'bastos', puntuacio: 3},
    {valor:1, pal:'espasses', puntuacio: 4},{valor:2, pal:'espasses', puntuacio: 0},{valor:3, pal:'espasses', puntuacio: 0},
    {valor:4, pal:'espasses', puntuacio: 0},{valor:5, pal:'espasses', puntuacio: 0},{valor:6, pal:'espasses', puntuacio: 0},
    {valor:7, pal:'espasses', puntuacio: 0},{valor:8, pal:'espasses', puntuacio: 0},{valor:9, pal:'espasses', puntuacio: 5},
    {valor:10, pal:'espasses', puntuacio: 1},{valor:11, pal:'espasses', puntuacio: 2},{valor:12, pal:'espasses', puntuacio: 3},
   ]

   //Iniciar sortida
   function repartirCartaInitial(){
     var sortida = ['oros', 'espasses', 'copes', 'bastos'],
         sortidaInicial = document.getElementById('seleccio-init'),
         cartaDeSortida = pilot.slice(Math.floor(Math.random() * 48))[0];

     shuffle(sortida);
     user1Sortida = sortida[0];
     user2Sortida = sortida[1];
     user3Sortida = sortida[2];
     user4Sortida = sortida[3];
     document.getElementById('tu').innerHTML = user1Sortida
     document.getElementById('dreta').innerHTML = user3Sortida
     document.getElementById('dalt').innerHTML = user4Sortida
     document.getElementById('esquerra').innerHTML = user2Sortida

     shuffle(pilot);

     cartaDeSortida = cartaDeSortida.pal;
     sortidaInicial.innerHTML = cartaDeSortida;
     sortidaInicial.className = 'carta __' + cartaDeSortida;

     if (cartaDeSortida === user1Sortida){
       console.log('user 1 is the winner')
       repartirAndEscollir(user1)
      }else if(cartaDeSortida === user2Sortida){
         console.log('user 2 is the winner')
         repartirAndEscollir(user2)
      }else if(cartaDeSortida === user3Sortida){
         console.log('user 3 is the winner')
         repartirAndEscollir(user3)
      }else{
         console.log('user 4 is the winner')
         repartirAndEscollir(user4)
      }
      setTimeout(function(){
        myCards();
      },2000)

   }


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

   function repartirAndEscollir(guanyador){
     console.log('guanyador es: '+guanyador)
     shuffle(pilot)
     //Distribueix cartes
     user1 = pilot.slice(0, 12);
     ordenarCartesPerValor(user1);
     user2 = pilot.slice(12, 24);
     ordenarCartesPerValor(user2);
     user3 = pilot.slice(24, 36);
     ordenarCartesPerValor(user3);
     user4 = pilot.slice(36, 48);
     ordenarCartesPerValor(user4);

     //Escolleig triomf (????)
     var counts = {};
     user3.forEach(function(x) {
       counts[x.pal] = (counts[x.pal] || 0)+1;
       console.log(counts)
       if(counts[x.pal] >= 4 ){
         console.log(x.pal);
         var triomfSel = document.getElementById("seleccionat");
         triomfSel.previousElementSibling.style.display = "none";
         triomfSel.setAttribute('class', 'pals __' + x.pal);
         triomfSel.innerHTML = x.pal;
         triomf = x.pal;
         console.log(triomf)
       }
     });

     //Carta de sortida
     setTimeout(function(){
       var firstcard = user3[Math.floor(Math.random() * 12)];
       startPlay(user3,'dreta', firstcard.valor, firstcard.puntuacio, firstcard.pal, user3.indexOf(firstcard))
     }, 4000)

   }


   //Ordenar cartes per valor
   function ordenarCartesPerValor(user){
     user.sort(function(a, b){
       if(a.pal < b.pal) return -1;
       if(a.pal > b.pal) return 1;
       return 0;
     })
   }

   //Produeix la teva carta
   function myCards(){
     console.log(user1.length)
     for(var x = 0; x < user1.length; x++){
       var card;
       card = document.createElement('div');
       card.innerHTML = user1[x].valor;
       setAttributes(card, {
         'data-pal': user1[x].pal,
         'data-val': user1[x].valor,
         'data-punt': user1[x].puntuacio,
         'class' : 'carta __' + user1[x].pal
       })
       tapete.appendChild(card);
       card.addEventListener('click', function(){
         var val, punt, pal;
         val = this.getAttribute('data-val');
         punt = this.getAttribute('data-punt');
         pal = this.getAttribute('data-pal')
         showCard(user1, 'tu', val, punt, pal, null);
         this.remove();
       })
     }
   }

   //Setting attributes helper
   function setAttributes(el, attrs) {
      for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    }

   //Ensenya carta jugada
   function showCard(player, position, value, punt, pal, removedcard){
     var userSelected;
     for(var t = 0; t < player.length; t++){
       console.log(player[t].valor + ' ' + player[t].pal)
     }
     player.splice(removedcard, 1);
     winner[position] = punt;
     console.log(winner)
     userSelected = document.getElementById(position);
     userSelected.innerHTML === '' ? userSelected.innerHTML = value : userSelected.innerHTML = '', userSelected.innerHTML = value;
     setAttributes(userSelected, {
       'data-card': value,
       'class': 'carta __' + pal
     })
     switch(position){
       case 'tu':
         nextHand(user3, 'dreta', value, punt, pal)
         break;
       case 'dreta':
         nextHand(user3, 'dalt', value, punt, pal)
         break;
       case 'dalt':
         nextHand(user3, 'esquerra', value, punt, pal)
         break;
     }
   }

   function nextHand(user, position, value, punt, pal){
     setTimeout(function(){
       startPlay(user,position, value, punt, pal)
     }, 2000);
   }


   function startPlay(user, position, value, punt, pal){
     var newCard, _removecard, randomVal, randomValAndPal, _val ;
     newCard = user.filter(function(el){
        if(el.pal == pal && el.puntuacio > punt){
          return (el.pal == pal && el.puntuacio > punt)
        }else{
          return (el.pal == pal && el.valor < value)
        }
      });

     _removecard;
     randomVal = Math.floor(Math.random() * newCard.length);
     randomValAndPal = Math.floor(Math.random() * user.length)
     _val = newCard[randomVal]
     if(_val){
       _removecard = user.indexOf(_val);
       showCard(user, position, _val.valor, _val.puntuacio, _val.pal , _removecard);
     }else{
       _val = user[randomValAndPal];
       _removecard = user.indexOf(_val);
       showCard(user, position, _val.valor, _val.puntuacio, _val.pal , _removecard);
     }
   };

   (function init(){
     repartirCartaInitial();
   })();

})();
