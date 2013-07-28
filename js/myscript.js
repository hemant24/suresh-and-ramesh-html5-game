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

$(document).ready(function(){
	initLoading();
})
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

function initLoading(){
	//blockScreen();

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
	
	attachKeyboardListner();
	
	soundManager = new sr.SoundManager()
	
	var canvas = document.getElementById("testCanvas");
	stage= new createjs.Stage(canvas);
	notificationStage = new createjs.Stage(canvas);
	var timeCanvas = document.getElementById("timeCanvas");
	timeStage = new createjs.Stage(timeCanvas);
	
	gameManager = new sr.GameManager(stage,timeStage);
	notificationManager = new sr.NotificationManager(notificationStage,gameManager)
	
	
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

function attachKeyboardListner(){
	sr.pressedKeys = []
	$(document).keydown(function(e){
		sr.pressedKeys[e.which]=true;
	});
	$(document).keyup(function(e){
		if(gameManager.gameState != sr.GameStateEnum.running){
			notificationManager.handleButtonNavigation(e.which)
		}
		sr.pressedKeys[e.which]=false;
	});
	$(document).keypress(function(e){
		if(e.which==32){
			if(gameManager.gameState==sr.GameStateEnum.running){
				gameManager.gameState=sr.GameStateEnum.paused;
			}
		}
	});
}

function showHowToPlay(){
	$("#mask , #howToPlayClose").click(function(){
		$("#mask").fadeOut(300)
		$("#howToPlay").fadeOut(300)
		notificationManager.showMenu()
	})
	notificationManager.showHowToPlay()
	$("#mask").width($(window).width());
	$("#mask").height($(window).height());
	$("#mask").fadeIn(500);
	$("#howToPlay").css("left" , ($(window).width()/2 - 400)+ "px");
	$("#howToPlay").css("top" , "60px");
	$("#howToPlay").fadeIn(500);
}
function startGame(){
	notificationManager.showGame()
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addListener(window);
	soundManager.playBk();
	gameManager.start();
}
function tick(){
	console.log(gameManager.gameState)
	if( gameManager.gameState == sr.GameStateEnum.running){
		gameManager.update();
		stage.update();
		timeStage.update();
	}else{
			notificationManager.update();
	}
}






