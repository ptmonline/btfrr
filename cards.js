(function(){
  var user1, user2, user3, user4, //4 jugadors -- user1 = tu!
      user1Sortida, user2Sortida, user3Sortida, user4Sortida, // carta assignada al principi per escollir qui reparteix
      _triomf, _paldejugada, card, userSelected, premi, flagMeWinner, // cariables per triomf, pal de jugada, carta i premi
      teamOne = 0, teamTwo = 0, // equip 1 (tu i jugador de dalt) equip dos (jugador esquerra i jugado dreta)
      tapete = document.getElementById('user1'), // varibal per tapete
      triomfSel = document.getElementById("seleccionat"), // variable per el contenidor on apraeix el triomf al taulei
      triomfPals = document.getElementsByClassName('pals'), // variables per les caselles per escollir pal
      count = 0, //contador de voltes
      winner = {}, // objecta on es llegeix la putuacio de cada jugada
      jugadorDeInici, // jugador -> company o contrari
      pilot = [ //baralla
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
      ];

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
     sortidaInicial.className = 'tapetejugada carta __' + cartaDeSortida;

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

      if (cartaDeSortida === user1Sortida){
         repartirAndEscollir(user1, 'tu')
      }else if(cartaDeSortida === user2Sortida){
         repartirAndEscollir(user2, 'esquerra')
      }else if(cartaDeSortida === user3Sortida){
         repartirAndEscollir(user3, 'dreta')
      }else{
         repartirAndEscollir(user4, 'dalt')
      }
      setTimeout(function(){
        myCards();
      },2000)
    }

   //Escollir triomf (????)
   function repartirAndEscollir(user, position){
     console.log('guanyador es: '+user)
     user == user4 ? jugadorDeInici = 'company' : jugadorDeInici = 'contrari'
     console.log('JUGADOR DE INICI: ' + jugadorDeInici)
     if(user != user1){
       var counts = {};
       user.forEach(function(x) {
         counts[x.pal] = (counts[x.pal] || 0)+1;
         if(counts[x.pal] >= 4 ){
           createTriomfSign(x.pal)
         }
       });
       sortidaDeCartaGuanyadora(user, position)
     }else{
       for(var t = 0; t < triomfPals.length; t++){
         triomfPals[t].addEventListener('click', function(){
           var pal = this.innerHTML.toLowerCase();
           createTriomfSign(pal)
         })
       }
     }
   }

   //Carta de sortida
   function sortidaDeCartaGuanyadora(user, position){
     flagMeWinner = false;
     if(user.length != 0){
       setTimeout(function(){
         var firstcard = user[Math.floor(Math.random() * user.length)];
         _paldejugada = firstcard.pal;
         console.log('Carata de sortida pa es: '+ _paldejugada)
         console.log('EL PAL DE SORTIDA ES '+ _paldejugada)
         showCard(user,position, firstcard.valor, firstcard.puntuacio, firstcard.pal, user.indexOf(firstcard))
       }, 4000)
     }else{
       console.log('G A M E  O V E R ! ! ! !')
     }
   }

   //Create triomf sign
   function createTriomfSign(pal){
     triomfSel.previousElementSibling.style.display = "none";
     triomfSel.setAttribute('class', 'pals __' + pal);
     triomfSel.innerHTML = pal;
     _triomf = pal;
     console.log('EL TRIOMF ESCOLLIT ES '+ _triomf)
   }

   //Produeix les tevas cartes
   function myCards(){
     for(var x = 0; x < user1.length; x++){
       card = document.createElement('div');
       card.innerHTML = user1[x].valor;
       setAttributes(card, {
         'data-pal': user1[x].pal,
         'data-val': user1[x].valor,
         'data-punt': user1[x].puntuacio,
         'class' : 'tapetejugada carta __' + user1[x].pal
       })
       tapete.appendChild(card);
       card.addEventListener('click', function(){
         var val, punt, pal;
         val = this.getAttribute('data-val');
         punt = this.getAttribute('data-punt');
         pal = this.getAttribute('data-pal')
         showCard(user1, 'tu', val, punt, pal, null);
         if(flagMeWinner){
           _paldejugada = pal;
           console.log('EL PAL DE SORTIDA ES '+ _paldejugada)
         }
         this.remove();
       })
     }
   }

   //Ensenya carta jugada
   function showCard(player, position, value, punt, pal, removedcard){
     for(var t = 0; t < player.length; t++){
       console.log(player[t].valor + ' ' + player[t].pal)
     }
     player.splice(removedcard, 1);
     //Check and reset count
     count == 4 ? count = 1 : count += 1;
     winner[position] = parseInt(punt);
     userSelected = document.getElementById(position);
     userSelected.innerHTML === '' ? userSelected.innerHTML = value : userSelected.innerHTML = '', userSelected.innerHTML = value;
     setAttributes(userSelected, {
       'data-card': value,
       'class': 'tapetejugada carta __' + pal
     })
     nextHandSelect(count, position, value, punt, pal)
   }

   //Ordenar rondes
   function nextHandSelect(count, position, value, punt, pal){
     if(count < 4){
       switch(position){
         case 'tu':
           nextHand(user3, 'dreta', value, punt, pal)
           break;
         case 'dreta':
           nextHand(user4, 'dalt', value, punt, pal)
           break;
         case 'dalt':
           nextHand(user2, 'esquerra', value, punt, pal)
           break;
       }
     }else{
      andTheWinnerIs();
     }
   }

   // Escollir guanyador ::TODO Refactor this!!
   function andTheWinnerIs(){
     console.log(winner)
     premi = winner.dreta + winner.tu + winner.esquerra + winner.dalt;
     if(winner.tu > winner.dreta && winner.tu  > winner.esquerra && winner.tu  > winner.dalt){
       flagMeWinner = true;
       teamOne += premi;
       teamOne += 4;
     }else if(winner.dreta > winner.tu && winner.dreta > winner.esquerra && winner.dreta > winner.dalt){
      sortidaDeCartaGuanyadora(user3, "dreta")
      teamTwo += premi;
      teamOne += 4;
     }else if(winner.esquerra > winner.tu && winner.esquerra > winner.dreta && winner.esquerra > winner.dalt){
      sortidaDeCartaGuanyadora(user2, "esquerra")
      teamTwo += premi;
      teamOne += 4;
     }else{
      sortidaDeCartaGuanyadora(user4, "dalt")
      teamOne += premi;
      teamOne += 4;
     }
     winner = {};
     setTimeout(function(){
       cleanTapete();
     }, 3000)
     console.log(teamOne+ '......' +teamTwo)
   }

   //Escollir propera ma
   function nextHand(user, position, value, punt, pal){
     setTimeout(function(){
       startPlay(user,position, value, punt, pal)
     }, 2000);
   }

   //Començar & analitzar jugada
   function startPlay(user, position, value, punt, pal){
     var newCard, _removecard, randomVal, randomValAndPal, _val ;

     newCard = user.filter(function(el){
        if(el.pal == _paldejugada && el.puntuacio > punt){
          return (el.pal == _paldejugada && el.puntuacio > punt)
        }else{
          if(el.pal == _paldejugada && el.puntuacio <= punt){
            return (el.pal == _paldejugada && el.puntuacio <= punt)
          }else if(el.pal == _triomf){
            return (el.pal == _triomf && el.valor == value)
          }else{
            return (el.pal == _paldejugada && el.puntuacio <= punt)
          }
        }
      });

     randomVal = Math.floor(Math.random() * newCard.length);
     randomValAndPal = Math.floor(Math.random() * user.length)
     console.log(newCard)
     console.log(newCard.length)
     _val = newCard[randomVal]
     console.log(_val)
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
