/*
 * app.js
*/

var guessGame = (function ($){

	// Begin module scope variables
	var userInput,
		previousInput,
		userInputInt,
		game,
		initModule;

	// Game class
	var Game = function() {
		this.guessLeft = 5;
		this.previousInput = 0;
		this.randomNum = Math.floor(Math.random() * 100 + 1);
		$('#remainGuesses').html(this.guessLeft);
		console.log(this.randomNum);
		
	}

	// user submit guess, verify user input
	Game.prototype.submitGuess = function () {
		userInput = $('#userGuess').val();
		if (this.evaluateInput(userInput))
			console.log(userInput);
			this.checkAnswer(userInput);
	}

	// verify if user's input is valid
	Game.prototype.evaluateInput = function (input) {
		if (isNaN(input) || input > 100 || input < 0) {
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

		if (diff <= 5)
			$('#temp-info').html("Super Hot!");
		else if (diff <= 10)
			$('#temp-info').html("Hot!");
		else if (diff <= 15)
			$('#temp-info').html("Warm!");
		else if (diff <= 25)
			$('#temp-info').html("Cold!");
		else 
			$('#temp-info').html("Ice Cold!");

	}

	// check user's valid input answer
	Game.prototype.checkAnswer = function(input) {

		this.checkTemp(input);

		this.previousInput = input;

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

