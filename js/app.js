/*
 *  A list that holds all of the cards
 */
 let card = document.querySelectorAll('.card');
 console.log(card);
 let cards = [...card];
 console.log(cards);
 // box of all cards in game
 let deck = document.getElementsByClassName("deck")[0];
 console.log(deck);
 // declaring move counter variable
 let counter = document.querySelector(".moves");
 // declare variables for star icons
const stars = document.querySelectorAll(".fa-star");
// stars list
 let starsList = document.querySelectorAll(".stars li");
// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // close icon in modal
 let closeBtn = document.getElementsByClassName("closeBtn")[0];

 // declare modal
 let modal = document.getElementById("simpleModal")
 //Get modal button
 let modalBtn = document.getElementById('modalBtn')
 //Get timer 
 let timer = document.querySelector(".timer");

 let moves = 0;
 let second = 0, minute = 0; hour = 0;
 let interval;

  // array for opened cards
  let openedCards = [];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// @description shuffles cards when page is refreshed / loads
 

// Initialisation function to start a new play 
function  init(){
     // debugger;
    // shuffle deck
    cards = shuffle(cards);
    console.log(cards)
    // remove all exisiting classes from each card
    console.log(deck);

    deck.innerHTML = " ";
    for (let i = 0; i < cards.length; i++){
         let outFile = cards[i];
         cards[i].classList.remove("show", "open", "match", "disabled");
    	 deck.appendChild(outFile);
        };

    // }
    // reset moves
       moves = 0;
       counter.innerHTML = moves;
     // reset rating
    for (let i= 0; i < stars.length; i++){
    	stars[i].style.cssText = " color:#FFD700;visibility:visible;"
    }
     //reset timer
 
       timer.innerHTML = "0 mins 0 secs";
       clearInterval(interval);
       // document.body.onload
}

  init();

//  toggles open and show classes to display cards
let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//add opened cards to OpenedCards list and check if cards are match or not
let cardOpen = function cardOpen() {
    openedCards.push(this);
    //debugger;
    var len = openedCards.length;
    if(len === 2){
         moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// function describing  when cards are matched
let matched = function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

// function description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    cards.forEach(function(card){
    	card.classList.add('disabled')
    })

    setTimeout(function(){
        openedCards[0].classList.remove("show", "open","unmatched");
        openedCards[1].classList.remove("show", "open","unmatched");
        cards.forEach(function(card){
          card.classList.remove('disabled');
         });
        openedCards = [];
    },1000);
}

// @description count player's moves
function moveCounter(){
    moves++;
    counter.textContent = moves;
    //start timer on first pair click

     startTimer();
    
    // setting rates based on moves
    if (moves > 10 && moves < 14){
    	stars[2].style.visibility = "collapse";

    }
    else if (moves > 14){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
             }
         }
     }
}


function startTimer(){
        interval =  setInterval(function(){
        timer.innerHTML = minute+"mins  "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },2000);
}

//Listen for open click
// modalBtn.addEventListener('click',openModal);
//Listen for close click
closeBtn.addEventListener('click',closeModal);
//Listen for outside click
window.addEventListener('click', outsideClick)


//Funtion to open modal 
function openModal(){
	modal.style.display = 'block';
}

//Function to close modal
function closeModal(){
	modal.style.display = 'none';
}

//Function to close modal if outside click

function outsideClick(e){
	if(e.target == modal){
			modal.style.display = 'none';
		}
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations(){

	
	var starRating = document.querySelector(".stars").innerHTML;
    
    if (matchedCard.length == 16){
    	clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        openModal();

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

       init();
       stopTimer();

       // timer.innerHTML = "0 mins 0 secs";

      
    };
}


 function stopTimer() {
      clearInterval(interval);
    }


 var playAgain = document.getElementById('play-again');
     playAgain.addEventListener('click',function(){
     	init();
     	stopTimer();
     	closeModal();
     })



// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){

    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
