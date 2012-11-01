//"images/sureshFull.png"

this.sr = this.sr ||{};

(function(){

var Player = function(image, stage, keyMap){
	this.initialize(image, stage);
	this.keyMap = keyMap;
	this.lastKey=keyMap.RIGHT; //can be come from code who intantiate it
	this.width= 25;//for collision detection
	//this.height = 50;
	this.height = 15;
	this.isRCollide = false;
	this.isLCollide = false;
	this.isDCollide = false;
	this.isUCollide = false;
	this.speed = 7;
	this.spawnX = 0;
	this.spawnY = 0;
}

var p = Player.prototype = new createjs.BitmapAnimation();

p.bitmapAnimation_initialize = p.initialize;

p.initialize = function(image, stage){
	var spriteSheet ={	"animations": {
									"left-walk":[1,8],
									"left-shock":[9,12],
									"left-idle":[0],
									"up-walk": [14, 21],
									"up-shock":[22,25],
									"up-idle":[13],
									"right-walk":[27,34],
									"right-shock":[35,38],
									"right-idle":[26],
									"down-walk":[40,47],
									"down-shock":[48,51],
									"down-idle":[39]
									}, 
						"images": [image],
						"frames": {"regX":65, "count": 52, "regY":230, "width": 150,"height":250}};
						//"frames": {"regX":45, "count": 52, "regY":150, "width": 150,"height":250}};
						

	
	
	var ss = new createjs.SpriteSheet(spriteSheet);
	p.bitmapAnimation_initialize(ss);
	stage.addChild(this);
}
p.update  = function (){
	if(sr.pressedKeys[this.keyMap.RIGHT]){
		if(!this.isRCollide){
			this.x = this.x+this.speed 
			this.lastKey = this.keyMap.RIGHT
			if(this.currentAnimation.indexOf("right-walk") == -1){
				this.gotoAndPlay("right-walk");
			}
		}
	}
	else if(sr.pressedKeys[this.keyMap.UP]){
		if(!this.isUCollide){
			this.y = this.y-this.speed
			this.lastKey = this.keyMap.UP
			if(this.currentAnimation.indexOf("up-walk") == -1){
				this.gotoAndPlay("up-walk");
			}
		}
	}else if(sr.pressedKeys[this.keyMap.DOWN]){
		if(!this.isDCollide){
			this.y = this.y+this.speed
			this.lastKey = this.keyMap.DOWN
			if(this.currentAnimation.indexOf("down-walk") == -1){
				this.gotoAndPlay("down-walk");
			}
		}
	}else if(sr.pressedKeys[this.keyMap.LEFT]){
		if(!this.isLCollide){
			this.x = this.x-this.speed 
			this.lastKey = this.keyMap.LEFT
			if(this.currentAnimation.indexOf("left-walk") == -1){
				this.gotoAndPlay("left-walk");
			}
		}
	}
	else if(this.lastKey==this.keyMap.RIGHT && !this.isRCollide){
		this.gotoAndPlay("right-idle");
	}else if(this.lastKey == this.keyMap.LEFT && !this.isLCollide){
		this.gotoAndPlay("left-idle");
	}else if(this.lastKey == this.keyMap.UP && !this.isUCollide){
		this.gotoAndPlay("up-idle");
	}else if(this.lastKey == this.keyMap.DOWN && !this.isDCollide){
		this.gotoAndPlay("down-idle");
	}
}

p.handleCollision = function(isCollide){
if(!isCollide){
	this.isRCollide = false;
	this.isDCollide = false;
	this.isLCollide = false;
	this.isUCollide = false;
}else{

	 if(this.lastKey==this.keyMap.RIGHT){
		this.isRCollide = true;
		if(this.currentAnimation.indexOf("right-shock") == -1){
			console.log(this.currentAnimation);
				this.gotoAndPlay("right-shock");
			}
	 }else if(this.lastKey==this.keyMap.DOWN){
		this.isDCollide = true;
		if(this.currentAnimation.indexOf("down-shock") == -1){
			console.log(this.currentAnimation);
				this.gotoAndPlay("down-shock");
			}
	 }else if(this.lastKey==this.keyMap.LEFT){
		this.isLCollide = true;
		if(this.currentAnimation.indexOf("left-shock") == -1){
			console.log(this.currentAnimation);
				this.gotoAndPlay("left-shock");
			}
	 }else if(this.lastKey==this.keyMap.UP){
		this.isUCollide = true;
		if(this.currentAnimation.indexOf("up-shock") == -1){
			console.log(this.currentAnimation);
				this.gotoAndPlay("up-shock");
			}
	 }
	 
}
 
}
	
sr.Player = Player;

}());