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