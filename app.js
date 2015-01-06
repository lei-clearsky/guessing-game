/*
 * app.js
*/

var guessGame = (function ($){

	// Begin module scope variables
	var userInput,
		previousInput,
		game,
		stopGame,
		initModule;

	// Game class
	var Game = function() {
		this.guessLeft = 5;
		this.previousInput = 0;
		this.stopGame = false;
		this.randomNum = Math.floor(Math.random() * 100 + 1);
		$('#remainGuesses').html(this.guessLeft);
		console.log(this.randomNum);
		
	}

	// user submit guess, verify user input
	Game.prototype.submitGuess = function () {
		userInput = $('#userGuess').val();
		
		if (!this.stopGame && this.evaluateInput(userInput)){
			console.log(userInput);
			this.checkAnswer(userInput);
		}
			
	}

	// check if user's input string is blank or contains only white-space
	Game.prototype.isEmpty = function ( input ) {
		return (input.length === 0 || !input.trim());
	}

	// verify if user's input is valid
	Game.prototype.evaluateInput = function (input) {
		if (isNaN(input) || input > 100 || input < 0 || this.isEmpty(input)) {
			$('#hint-info').html("Please enter a valid number and hit submit.");
			return false;
		} 
		
		return true;	
	}

	// compare previous input and current user input
	// depend on the difference of the two values, provide feedback
	Game.prototype.checkTemp = function (input) {
		console.log('Input: ' + input);
		console.log('this.previousInput: ' + this.previousInput);
		var diff = Math.abs(input - this.previousInput);
		var $tempInfo = $('#temp-info');

		if (diff <= 5)
			$tempInfo.html("Super Hot!");
		else if (diff <= 10)
			$tempInfo.html("Hot!");
		else if (diff <= 15)
			$tempInfo.html("Warm!");
		else if (diff <= 25)
			$tempInfo.html("Cold!");
		else 
			$tempInfo.html("Ice Cold!");

	}

	// check user's valid input answer
	Game.prototype.checkAnswer = function(input) {

		this.checkTemp(input);

		this.previousInput = input;

		if (this.guessLeft === 0){

			$('#hint-info').html("You've used all your guesses!");

			this.stopGame = true;

		} else if (input == this.randomNum) {

				$('#hint-info').html("Congratulations! You guess is correct!");

		} else {

			this.guessLeft --;

			$('#remainGuesses').html(this.guessLeft);
		
			if (input < this.randomNum){		
				$('#hint-info').html("Guess higher!");
			}else {
				$('#hint-info').html("Guess lower!");
			}

		} 
		 
	} 

	// get correct answer
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
			game = new Game();
		});
	}

	var getHintClick = function(){
		$('#getHint').click(function(event){
			event.preventDefault();
			game.getAnswer();
		});
	}

	// Begin public method /initModule/
	initModule = function (){
		newGame();
		submitGuessClick();
		newGameClick();
		getHintClick();
	};

	return { initModule: initModule };

})(jQuery);

