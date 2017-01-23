function NewGame(){
  // TODO:: Refactor this !!!
  var user1, user2, user3, user4, //4 jugadors -- user1 = tu!
      user1Sortida, user2Sortida, user3Sortida, user4Sortida, // carta assignada al principi per escollir qui reparteix
      _triomf, _paldejugada, _valor, _punt, _palo, card, userSelected, premi, flagMeWinner = true, // cariables per triomf, pal de jugada, carta i premi
      teamOne = 0, teamTwo = 0, // equip 1 (tu i jugador de dalt) equip dos (jugador esquerra i jugado dreta)
      tapete = document.getElementById('user1'), // varibal per tapete
      sortidaInicial = document.getElementById('seleccio-init'), //carta que decideix qui inicia partida
      triomfSel = document.getElementById("seleccionat"), // variable per el contenidor on apraeix el triomf al taulei
      triomfPos= document.getElementById("seleccionatPosition"), // variable per el contenidor on apraeix el triomf al taulei
      seleccionatBasa = document.getElementById("seleccionatBasa"), //variable per pal de bassa
      triomfPals = document.getElementsByClassName('pals_triomf'), // variables per les caselles per escollir pal
      seleccioInit = document.getElementById("seleccio-initial"),
      basaSortidaGuanyador = document.getElementById("basaSortidaGuanyador"),
      puntuacioTeamA = document.getElementById("puntuacioTeamA"),
      puntuacioTeamB = document.getElementById("puntuacioTeamB"),
      penalitzacio = document.getElementById("penalitzacio"),
      novaPartida = document.getElementById("novaPartida"),
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
         cartaDeSortida = pilot.slice(Math.floor(Math.random() * 48))[0];

     shuffle(sortida);
     user1Sortida = sortida[0];
     user2Sortida = sortida[1];
     user3Sortida = sortida[2];
     user4Sortida = sortida[3];

     shuffle(pilot);

     cartaDeSortida = cartaDeSortida.pal;

     if (cartaDeSortida === user1Sortida) initGame(1)
     if (cartaDeSortida === user2Sortida) initGame(2)
     if (cartaDeSortida === user3Sortida) initGame(3)
     if (cartaDeSortida === user4Sortida) initGame(4)

   }
   function initGame(numb){
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

     if (numb == 1) repartirAndEscollir(user1, 'tu')
     if (numb == 2) repartirAndEscollir(user2, 'esquerra')
     if (numb == 3) repartirAndEscollir(user3, 'dreta')
     if (numb == 4) repartirAndEscollir(user4, 'dalt')


      setTimeout(function(){
        myCards();
      },4000)
   }

   //Escollir triomf (????)
   function repartirAndEscollir(user, position){
     user == user4 ? jugadorDeInici = 'company' : jugadorDeInici = 'contrari'
     if(user != user1){
       var counts = {};
       user.forEach(function(x) {
         counts[x.pal] = (counts[x.pal] || 0)+1;
         if(counts[x.pal] >= 4 ){
           createTriomfSign(x.pal, position)
         }
       });
      sortidaDeCartaGuanyadora(user, position)
     }else{
       for(var t = 0; t < triomfPals.length; t++){
         triomfPals[t].addEventListener('click', function(){
           var pal = this.innerHTML.toLowerCase();
           createTriomfSign(pal, 'tu')
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
         _valor = firstcard.valor;
         _punt = firstcard.puntuacio;
         _palo = firstcard.pal;
         _paldejugada = firstcard.pal;
         seleccionatBasa.innerHTML = 'EL PAL DE SORTIDA ES '+ _paldejugada;
         showCard(user,position, firstcard.valor, firstcard.puntuacio, firstcard.pal, user.indexOf(firstcard))
         basaSortidaGuanyador.innerHTML === '' ? basaSortidaGuanyador.innerHTML = "Jugador de sortida " + position : basaSortidaGuanyador.innerHTML = '', basaSortidaGuanyador.innerHTML = "Jugador de sortida " + position
       }, 4000)
     }else{
       if(teamOne >= 101 || teamTwo >= 101){
         teamOne >= 101 ? alert('GAME OVER! TeamOne (tu i dalt) GUANYADORS!!') : alert('GAME OVER! TeamTwo (esquerra i dreta) GUANYADORS!!');
         novaPartida.style.display = 'block';
         novaPartida.addEventListener("click", function(){
           cleanInfo();
           NewGame();
         })
       }else{
         switch (user) {
           case user1:
             initGame(1)
             break;
           case user2:
             initGame(2)
             break;
           case user3:
             initGame(3)
             break;
           case user4:
             initGame(4)
             break;
        }
       }
     }
   }

   //Crear triomf sign
   function createTriomfSign(pal, position){
     seleccioInit.style.display = "none";
     triomfPos.innerHTML = 'TRIOMF ESCOLLIT PER JUGADOR ' + position;
     triomfSel.innerHTML = 'EL TRIOMF ES: ' + pal;
     _triomf = pal;
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
         pal = this.getAttribute('data-pal');
         for(var x = 0; x < user1.length; x++){
           if(user1[x].pal == pal && user1[x].valor == val){
             rem = user1.indexOf(user1[x])
           }
         }
         if(pal == _palo && punt > _punt){
           _valor = val;
           _punt = punt;
           _palo = pal
         }
         //Penalitzar moviment incorrecta
         if(!flagMeWinner){
           if(pal != _triomf && pal != _paldejugada){
             for(var x = 0; x < user1.length; x++){
               if(user1[x].pal == _paldejugada || user1[x].pal == _triomf){
                 penalitzacio.innerHTML = "penalitzacio"
                 teamOne -=1;
                 teamTwo +=1;
               }
             }
           }
         }
         if(flagMeWinner){
           _paldejugada = pal;
           seleccionatBasa.innerHTML = 'EL PAL DE SORTIDA ES '+ _paldejugada;
           basaSortidaGuanyador.innerHTML === '' ? basaSortidaGuanyador.innerHTML = "Jugador de sortida tu" : basaSortidaGuanyador.innerHTML = '', basaSortidaGuanyador.innerHTML = "Jugador de sortida tu"
           _valor = val;
           _punt = punt;
           _palo = pal
           showCard(user1, 'tu', val, punt, pal, rem);
           this.remove();
         }else{
           showCard(user1, 'tu', val, punt, pal, rem);
           this.remove();
         }
       })
      }
   }

   //Ensenya carta jugada
   function showCard(player, position, value, punt, pal, removedcard){
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
     premi = winner.dreta + winner.tu + winner.esquerra + winner.dalt;
     if(_triomf == 'butifarra'){
       premi = (premi * 2 ) + 1;
     }
     if(winner.tu > winner.dreta && winner.tu  > winner.esquerra && winner.tu  > winner.dalt){
       flagMeWinner = true;
       teamOne += premi;
       teamOne += 1;
     }else if(winner.dreta > winner.tu && winner.dreta > winner.esquerra && winner.dreta > winner.dalt){
      sortidaDeCartaGuanyadora(user3, "dreta")
      teamTwo += premi;
      teamTwo += 1;
     }else if(winner.esquerra > winner.tu && winner.esquerra > winner.dreta && winner.esquerra > winner.dalt){
      sortidaDeCartaGuanyadora(user2, "esquerra")
      teamTwo += premi;
      teamTwo += 1;
     }else{
      sortidaDeCartaGuanyadora(user4, "dalt")
      teamOne += premi;
      teamOne += 1;
     }
     winner = {};
     setTimeout(function(){
       cleanTapete();
       penalitzacio.innerHTML = ""
     }, 3000)
     puntuacioTeamA.innerHTML ===''? puntuacioTeamA.innerHTML = "Puntuacio equip A " +teamOne: puntuacioTeamA.innerHTML = '', puntuacioTeamA.innerHTML= "Puntuacio equip A " +teamOne;
     puntuacioTeamB.innerHTML ===''? puntuacioTeamB.innerHTML = "Puntuacio equip B " +teamTwo: puntuacioTeamB.innerHTML = '', puntuacioTeamB.innerHTML= "Puntuacio equip B " +teamTwo;
   }
   //Escollir propera ma
   function nextHand(user, position, value, punt, pal){
     setTimeout(function(){
       startPlay(user,position, value, punt, pal)
     }, 2000);
   }

   //Començar & analitzar jugada
   function startPlay(user, position, value, punt, pal){
     var newCard, _removecard, randomVal, randomValAndPal, _val;
     var cartaguanyadora = false;
     //Crear primera posibilitat
     newCard = user.filter(function(el){
        if(el.pal == _paldejugada && el.puntuacio > punt){
          return (el.pal == _paldejugada && el.puntuacio > punt)
        }else{
          if(el.pal == _paldejugada && el.puntuacio <= punt){
            return (el.pal == _paldejugada && el.puntuacio <= punt)
          }else if(el.pal == _triomf && el.puntuacio > punt){
            return (el.pal == _triomf && el.valor == value)
          }
        }
      });

      //Crear segona posibilitat basat en la primera
      for (var w = 0; w < newCard.length; w++){
        if(newCard[w].puntuacio > _punt){
          newCard = newCard.filter(function(el){ return (el.puntuacio > punt)})
          cartaguanyadora = true;
        }else if(newCard[w].puntuacio < _punt && newCard[w].pal == _palo){
          newCard = newCard.filter(function(el){ return (el.puntuacio < _punt && el.pal == _palo) })
        }else if(newCard[w].pal != _palo && newCard[w].pal == _triomf && newCard[w].puntuacio == _punt){
          newCard = newCard.filter(function(el){ return (el.pal != _palo && el.pal == _triomf) })
        }
      }
      //De las cartes seleccionades segons probabilitat, escollir una
     randomVal = Math.floor(Math.random() * newCard.length);
     randomValAndPal = Math.floor(Math.random() * user.length)
     _val = newCard[randomVal]
     if(_val){ //Cartes del mateix pal
       if(cartaguanyadora){
         _valor = _val.valor;
         _punt = _val.puntuacio;
         _palo = _val.pal
       }
       _removecard = user.indexOf(_val);
       showCard(user, position, _val.valor, _val.puntuacio, _val.pal , _removecard);
     }else{ //cap carta seleccionada
       _val = user[randomValAndPal];
       _removecard = user.indexOf(_val);
       showCard(user, position, _val.valor, _val.puntuacio, _val.pal , _removecard);
     }
   };

   (function init(){
     repartirCartaInitial();
   })();

};
NewGame();
