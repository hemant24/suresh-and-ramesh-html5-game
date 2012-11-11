/*
SoundManager.js 

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

var SoundManager = function(){
	this.isMute = false;
	this.bkMusic = createjs.SoundJS.play("sound_bk",null,0,0,-1) //loop for one round, again start in next round
	this.shock = null;
	this.click = null;
	this.mute = false;
	this.win = null;
	this.gameover =null;
	createjs.SoundJS.setMasterVolume(0.1)
	//this.mute()
	this.initialize();
}

var p = SoundManager.prototype ;

p.mute = function(){
	createjs.SoundJS.setMute(true);
}

p.playBk = function(){
	if(!this.mute){
			this.bkMusic.mute(false) 
		}
}

p.playClick = function(){
		if(this.click){
			if(this.click.playState != createjs.SoundJS.PLAY_SUCCEEDED){
				this.click.play();
			}
		}else{
			this.click = createjs.SoundJS.play("sound_click");
		}

}

p.toggleMute = function(){
	this.mute = !this.mute
	if(this.mute){
		this.bkMusic.mute(true) 
	}else{
		this.bkMusic.mute(false)
	}
	
}

p.playShock = function(){
	//if(!this.mute){
			if(this.shock){
				if(this.shock.playState != createjs.SoundJS.PLAY_SUCCEEDED){
					this.shock.play();
				}
			}else{
				this.shock = createjs.SoundJS.play("sound_shock");
			}
		//}
}

p.playWin = function(){
	//if(!this.mute){
			this.bkMusic.mute(true)
			if(this.win){
				if(this.win.playState != createjs.SoundJS.PLAY_SUCCEEDED){
					this.win.play();
				}
			}else{
				this.win = createjs.SoundJS.play("sound_win");
			}
		//}
}
p.playGameOver = function(){
	//if(!this.mute){
			this.bkMusic.mute(true)
			if(this.gameover){
				if(this.gameover.playState != createjs.SoundJS.PLAY_SUCCEEDED){
					this.gameover.play();
				}
			}else{
				this.gameover = createjs.SoundJS.play("sound_gameover");
			}
		//}
}

p.stopShock = function(){

}
p.initialize = function(){
	//this.bkMusic.play()
}

sr.SoundManager = SoundManager;

}());