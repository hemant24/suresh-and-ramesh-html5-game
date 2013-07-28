/*
NotificationManager.js 

Copyright 2012 Hemant Sachdeva

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
this.sr = this.sr ||{};

(function(){

var NotificationManager = function(notificationStage, gameManager){
	this.notificationStage = notificationStage;
	this.gameManager = gameManager;
	this.initPause();
	this.initGameOver();
	this.initNextLevel();
	this.initGameFinished();
	this.initLastLevelWon();
	this.handleButtonNavigation("#pauseScreen");
}
var p = NotificationManager.prototype ;

var continueGame = function(){
	gameManager.gameState = sr.GameStateEnum.running
	notificationManager.showScreen("#gameScreen")				
}
var restartGame = function(){
	gameManager.restartLevel()
	notificationManager.showScreen("#gameScreen")
}
var mainMenu = function(){
	gameManager.gameState = sr.GameStateEnum.paused
	gameManager.stop()
	notificationManager.showScreen("#mainScreen")				
}
var nextLevel = function(){
	gameManager.nextLevel(); 
	notificationManager.showScreen("#gameScreen")
}

var lastLevel = function(){
	gameManager.start();
	notificationManager.showScreen("#gameScreen")
}

p.initPause = function(){
	$("#psContinue").click( continueGame )
	$("#menu , #psMainMenu").click(mainMenu)
	$("#psRestart").click(restartGame)
	
	/*
	this.pause = new createjs.Text("Paused", "76px Arial", "#000");
	this.pause.x =	200
	this.pause.y =	200
	this.pause.visible = false
	this.notificationStage.addChild(this.pause)
	*/
}

p.initGameOver = function(){
$("#gosRestart").click( restartGame )
$("#gosMainMenu").click(mainMenu)

/*
this.gameOver=  new createjs.Container();
		 
	var bk = new createjs.Shape();
		bk.graphics.beginFill("#F00").drawRect(-10,-10,300,60).beginFill("#FFF");
		this.gameOver.addChild(bk);

		var txt = new createjs.Text("Restart Level ", "36px Arial", "#FFF");
		txt.textBaseline = "top";
		this.gameOver.addChild(txt);
		
		

		this.gameOver.onClick = function(ntfManager){
									return function(evt){ 
										 soundManager.playClick();
										 ntfManager.gameManager.restartLevel(); }
								}(this);
		this.gameOver.visible = false;
	this.gameOver.x = 200
	this.gameOver.y = 200
	this.notificationStage.addChild(this.gameOver);
*/
}

p.initNextLevel = function(){
$("#lwNextLevel").click(nextLevel);
/*
	this.nextLevel=  new createjs.Container();
		 
	var bk = new createjs.Shape();
		bk.graphics.beginFill("#F00").drawRect(-10,-10,300,60).beginFill("#FFF");
		this.nextLevel.addChild(bk);

		var txt = new createjs.Text("Next Level >> ", "36px Arial", "#FFF");
		txt.textBaseline = "top";
		this.nextLevel.addChild(txt);

		this.nextLevel.onClick = function(ntfManager){
									return function(evt){ 
										 ntfManager.gameManager.nextLevel(); }
								}(this);
	this.nextLevel.visible = false;
	this.nextLevel.x = 200
	this.nextLevel.y = 200
	this.notificationStage.addChild(this.nextLevel);
*/
}

p.handleButtonNavigation = function(keyPress){
	console.log(keyPress)
	buttonHolder = $(".screen.activeScreen");
	var activeButton = buttonHolder.find(".button.active");
	if(keyPress == 40){
		if(activeButton.next() && activeButton.next().hasClass("button")){
			activeButton.removeClass("active");
			activeButton.next().addClass("active");
		}else{
			activeButton.removeClass("active");
			buttonHolder.find(".button:first-child").addClass("active")
		}
	}
	if(keyPress == 38){
		if(activeButton.prev() && activeButton.prev().hasClass("button")){
			activeButton.removeClass("active");
			activeButton.prev().addClass("active");
		}else{
			activeButton.removeClass("active");
			buttonHolder.find(".button:last-child").addClass("active")
		}
	}
	if(keyPress == 13){
		activeButton.click()
	}
}


p.initGameFinished = function(){

}
p.initLastLevelWon = function(){
	$("#llwRestartGame").click(lastLevel);
	/*
	this.lastLevelWon=  new createjs.Container();
		 
	var bk = new createjs.Shape();
		bk.graphics.beginFill("#F00").drawRect(200,200,300,60).beginFill("#FFF");
		this.lastLevelWon.addChild(bk);

		var txt = new createjs.Text("Restart Game", "36px Arial", "#FFF");
		txt.textBaseline = "top";
		txt.x = 200
		txt.y = 200
		this.lastLevelWon.addChild(txt);

		var gameFinishedTxt = new createjs.Text("Game Finished", "36px Arial", "#000");
		gameFinishedTxt.textBaseline = "top";
		this.lastLevelWon.addChild(gameFinishedTxt);
		
		var creaditTxt = new createjs.Text("Thanks For Playing", "36px Arial", "#000");
		creaditTxt.textBaseline = "top";
		creaditTxt.y=70
		this.lastLevelWon.addChild(creaditTxt);	
		
		
		this.lastLevelWon.onClick = function(ntfManager){
									return function(evt){ 
										 ntfManager.gameManager.start(); }
								}(this);
	this.lastLevelWon.visible = false;
	this.notificationStage.addChild(this.lastLevelWon);
	
	/*
	this.lastLevelWon= new createjs.Text("you finished the game congrats!!", "76px Arial", "#000");
	this.lastLevelWon.visible =false 
	this.notificationStage.addChild(this.lastLevelWon)
	*/
}

p.resetAll = function(){
	//this.pause.visible = false
	//this.gameOver.visible =false 
	//this.nextLevel.visible = false;
	//this.lastLevelWon.visible = false;
}
p.showScreen = function showScreen(id){
	$(".screen").each(function(){
		$(this).hide()
		$(this).removeClass("activeScreen")
	})
	$(id).show()
	$(id).addClass("activeScreen")
}

p.showPaused = function(){
	this.showScreen("#pauseScreen")
	//this.pause.visible  = true;
}
p.showGameOver =function(){
	this.showScreen("#gameOverScreen")
	//this.gameOver.visible =true;
}
p.showNextLevel =function(){
	this.showScreen("#levelWonScreen")
	//this.nextLevel.visible = true;
}
p.showLastLevelWon = function(){
	//this.lastLevelWon.visible = true;
	this.showScreen("#lastLevelWonScreen")
}
p.showGame = function(){
	this.showScreen("#gameScreen")
}
p.showHowToPlay = function(){
	this.showScreen("#howToPlayScreen")
}

p.showMenu = function(){
	this.showScreen("#mainScreen")
}

p.update = function(){
	this.resetAll();
	switch(this.gameManager.gameState){
		case  sr.GameStateEnum.paused :
			this.showPaused();
		break;
		case sr.GameStateEnum.over :
			this.showGameOver();
		break;
		case sr.GameStateEnum.won :
			this.showNextLevel();
		break;
		case sr.GameStateEnum.lastLevelWon:
			this.showLastLevelWon();
		break;
		case sr.GameStateEnum.running : 
			this.showGame();
		break;
	}
	this.notificationStage.update();
	
}


sr.NotificationManager = NotificationManager;

}());