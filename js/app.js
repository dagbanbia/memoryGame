// A list that hold all the cards
 let card = document.querySelectorAll(".card");

 let cards = [...card];
 // box of all cards in game
 let deck = document.getElementsByClassName("deck")[0];
 
 // declaring move counter variable
 let counter = document.querySelector(".moves");
 // declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

 // declaring restart button
 
 let restart = document.querySelector(".fa-repeat")

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // selecting close icon in modal
 let closeBtn = document.getElementsByClassName("closeBtn")[0];

 // declare modal
 let modal = document.getElementById("simpleModal")

 //Get timer 
 let timer = document.querySelector(".timer");
// initiate the number of moves;
 let moves = 0;
 
// initialize timer with values;
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

// Initialisation function to start a new play 
function  init(){
    // shuffle deck
    cards = shuffle(cards);

    // remove all exisiting classes from each card

    deck.innerHTML = " ";

    for (let i = 0; i < cards.length; i++){

        let outFile = cards[i];

        outFile.classList.remove("show", "open", "match", "disabled");

        deck.appendChild(outFile);

    };

    // reset moves

    moves = 0;
    counter.innerHTML = moves;
    // reset rating

    for (let i= 0; i < stars.length; i++){
        stars[i].style.cssText = " color:#FFD700;visibility:visible;"
    }

    //reset timer

    timer.innerHTML = "0 mins 0 secs";
    stopTimer();
    
}


init();

//  toggles open and show classes to display cards
let displayCard = function (){
    this.classList.toggle("open");
    startTimer();
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

//add opened cards to OpenedCards list and check if cards are match or not
let cardOpen = function cardOpen() {
    openedCards.push(this);
    //debugger;
    let len = openedCards.length;
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
    	card.classList.add("disabled")
    })

    setTimeout(function(){
        openedCards[0].classList.remove("show", "open","unmatched");
        openedCards[1].classList.remove("show", "open","unmatched");
        cards.forEach(function(card){
          card.classList.remove("disabled");
         });
        openedCards = [];
    },1000);
}

// describing  player's moves
function moveCounter(){
    moves++;
    counter.textContent = moves;
    
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

// declaring startTimer function for calculating time interval
function startTimer(){
    if(interval){
       stopTimer(); 
    }
    interval = setInterval(function(){myTimer()},1000)
}

function myTimer(){
    timer.innerHTML = minute + "mins" + " : " + second+ "secs";
    second++;
    if(second === 60){
        minute++;
        second = 0;
    }
    if(minute === 60){
        minute = 0;
    }

}

// declaring function to stop setInterval function
function stopTimer() {
    clearInterval(interval);
}

//Listen for close click
closeBtn.addEventListener("click",closeModal);

// Listen for restart click

restart.addEventListener("click",play)

//Funtion to open modal 
function openModal(){
	modal.style.display = "block";
}

//Function to close modal
function closeModal(){
	modal.style.display = "none";
    init();
}


// describing congratulations when all cards match, show modal and moves, time and rating
function congratulations(){

	
	let starRating = document.querySelector(".stars").innerHTML;
    
    if (matchedCard.length == 16){
    	stopTimer();
        finalTime = timer.innerHTML;

        // show congratulations modal
        openModal();

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        stopTimer();
      
    };
}

// declaring playAgain to enable player start playing again
let playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", play);
        
function play(){
    init();
    second = 0;
    openedCards = [];
    minute = 0;
    hour = 0;
    stopTimer();
    closeModal();
}



// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){

    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

