/*
myscript.js 

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
var	stage , timeStage , notificationStage, suresh , sureshShock ;
var gameManager,notificationManager, resourceManager ,soundManager;

this.sr = this.sr ||{};


function blockScreen(){
	
	var loader = $(".loading")
	loader.width($(window).width());
	loader.height($(window).height());
	var leftDiff = $(window).width()/2 -150;
	loader.css("background-position", leftDiff+"px"+" 50px");
	$("#playbt").css("left", leftDiff+40 +"px")
	$("#playbt").css("top", 180 +"px")
}
function showScreen(){
	var loader = $(".loading")
	loader.hide();
	$(".canvasHolder").css("display","block");
}
function initLoading(){
	blockScreen();

	manifest = [
			{src:"images/ramesh.png", id:"img_player",type:createjs.PreloadJS.IMAGE},
			{src:"images/brick.png", id:"img_path"},
			{src:"images/start.png" , id:"img_spawn"},
			{src:"sound/GameBG.mp3", id:"sound_bk"},
			{src:"sound/shock.mp3", id:"sound_shock"},
			{src:"sound/click.mp3", id:"sound_click"},
			{src:"sound/won.mp3", id:"sound_win"},
			{src:"sound/gameover.mp3", id:"sound_gameover"}
		];
	resourceManager = new createjs.PreloadJS(false);
	resourceManager.installPlugin(createjs.SoundJS)
	resourceManager.onProgress = handleProgress;
	resourceManager.onComplete = showPlayButton;
	resourceManager.onFileLoad = handleFileLoad;
	resourceManager.loadManifest(manifest);
}
function handleProgress(){}
function handleFileLoad(x){}
function showPlayButton(){
	$("#loadImg").hide();
	$("#playBtnContainer").css("display","block");
	$("#playBtn").click(function(){
		startGame();
	});	
	$("#howToPlayBtn").click(showHowToPlay)
	$(".rslides").responsiveSlides({
		auto: false,
        pager: true,
        nav: true,
        speed: 500,
        maxwidth: 800,
        namespace: "centered-btns"
	});
}

function showHowToPlay(){
	$("#mask").click(function(){
		$(this).fadeOut(300)
		$("#howToPlay").fadeOut(300)
	})
	$("#mask").width($(window).width());
	$("#mask").height($(window).height());
	$("#mask").fadeIn(500);
	$("#howToPlay").css("left" , ($(window).width()/2 - 400)+ "px");
	$("#howToPlay").css("top" , "60px");
	$("#howToPlay").fadeIn(500);
}
function startGame(){
	showScreen()
	soundManager = new sr.SoundManager()
	
	$("#music").click(function(){
		$(this).toggleClass("mute")
		$(this).toggleClass("play");
		soundManager.toggleMute();
	});
	
	$("#restartLevel").click(function(){
		if(notificationManager){
						notificationManager.gameManager.restartLevel()
				}
	})
	
	sr.pressedKeys = []
	$(document).keydown(function(e){
		sr.pressedKeys[e.which]=true;
	});
	$(document).keyup(function(e){
		sr.pressedKeys[e.which]=false;
	});
	$(document).keypress(function(e){
		if(e.which==32){
			if(gameManager.gameState==sr.GameStateEnum.paused){
				gameManager.gameState=sr.GameStateEnum.running;
			}else if(gameManager.gameState==sr.GameStateEnum.running){
				gameManager.gameState=sr.GameStateEnum.paused;
			}
		}if(e.which == 13 || e.which == 32){
			if(gameManager.gameState == sr.GameStateEnum.over){
				if(notificationManager){
						notificationManager.gameManager.restartLevel()
				}
			}else if (gameManager.gameState == sr.GameStateEnum.won){
				if(notificationManager){
						notificationManager.gameManager.nextLevel()
				}
			}else if (gameManager.gameState == sr.GameStateEnum.lastLevelWon){
				if(notificationManager){
						notificationManager.gameManager.start()
				}
			}
		}
	});

	createjs.Ticker.setFPS(20);
	createjs.Ticker.addListener(window);
	var canvas = document.getElementById("testCanvas");
	stage= new createjs.Stage(canvas);
	notificationStage = new createjs.Stage(canvas);
	var timeCanvas = document.getElementById("timeCanvas");
	timeStage = new createjs.Stage(timeCanvas);
	
	gameManager = new sr.GameManager(stage,timeStage);
	notificationManager = new sr.NotificationManager(notificationStage,gameManager)
	gameManager.start();
	var image = new Image();


}
function tick(){
	console.log(gameManager.gameState );
	if( gameManager.gameState != sr.GameStateEnum.paused && 
		gameManager.gameState != sr.GameStateEnum.over &&
		gameManager.gameState != sr.GameStateEnum.won &&
		gameManager.gameState != sr.GameStateEnum.lastLevelWon
		){
		gameManager.update();
		stage.update();
		timeStage.update();
	}else{
		
		notificationManager.update();
	}
}






