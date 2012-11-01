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
	
}
var p = NotificationManager.prototype ;

p.initPause = function(){
	this.pause = new createjs.Text("Paused", "76px Arial", "#000");
	this.pause.x =	200
	this.pause.y =	200
	this.pause.visible = false
	this.notificationStage.addChild(this.pause)
}

p.initGameOver = function(){
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

}
p.initNextLevel = function(){
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
}
p.initGameFinished = function(){

}
p.initLastLevelWon = function(){
		
		
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
		
		var creaditTxt = new createjs.Text("Created By Hemant Sachdeva", "36px Arial", "#000");
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
	this.pause.visible = false
	this.gameOver.visible =false 
	this.nextLevel.visible = false;
	this.lastLevelWon.visible = false;
}

p.showPaused = function(){
	this.pause.visible  = true;
}
p.showGameOver =function(){
	this.gameOver.visible =true;
}
p.showNextLevel =function(){
	this.nextLevel.visible = true;
}
p.showLastLevelWon = function(){
	this.lastLevelWon.visible = true;
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
	}
	this.notificationStage.update();
}


sr.NotificationManager = NotificationManager;

}());