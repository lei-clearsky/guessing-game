/*
 * app.js
*/

var guessGame = (function ($){

	// Begin module scope variables
	var userInput,
		userInputInt,
		game,
		initModule;

	// Game class
	var Game = function() {
		this.guessLeft = 5;
		this.randomNum = Math.floor(Math.random() * 100 + 1);
		$('#remainGuesses').html(this.guessLeft);
		console.log(this.randomNum);
		
	}

	// user submit guess, verify user input
	Game.prototype.submitGuess = function () {
		userInput = $('#userGuess').val();
		this.checkAnswer(userInput);

	}
	// verify user input
	Game.prototype.checkAnswer = function(input) {

		userInputInt = parseInt(input);

		if (this.guessLeft === 0){
			$('#hint-info').html("You've used all your guesses!");
		}

		if(userInputInt === this.randomNum){

			$('#hint-info').html("Congratulations! You guess is correct!");

		}else{

			this.guessLeft --;
			$('#remainGuesses').html(this.guessLeft);
			
			if (userInputInt < this.randomNum){		
				$('#hint-info').html("Guess higher!");
			}else {
				$('#hint-info').html("Guess lower!");
			}

		} 
	} 

	// hint
	Game.prototype.getAnswer = function () {

		$('#hint-info').html("The answer is: " + this.randomNum);

	}

	var newGame = function (){
		game = new Game();
		console.log('new game function');

	}

	var submitGuessClick = function(){
		$('#submitGuess').click(function(event){
			event.preventDefault();
			game.submitGuess();
		});
	}

	var newGameClick = function(){
		$('#newGame').click(function(event){
			event.preventDefault();
			initModule();
		});
	}

	// Begin public method /initModule/
	initModule = function (){
		newGame();
		submitGuessClick();
		newGameClick();
	};

	return { initModule: initModule };

})(jQuery);

