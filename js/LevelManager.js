this.sr = this.sr ||{};

(function(){

var LevelManager = function(stage){
	this.actors = [];
	this.walls=[];
	this.boundary =[];
	this.time =0;
	this.stage = stage;
	this.debug=true;
	this.image=resourceManager.getResult("img_path").result
	this.startImage =resourceManager.getResult("img_spawn").result
	this.currentLevel = 0;
	this.lastLevel =levels.length;
}

var p = LevelManager.prototype ;

p.resetAll=function(){
	this.actors = [];
	this.walls=[];
	this.boundary =[];
	this.time =0;
	this.stage.removeAllChildren();
}

function Line(x, y){
	this.x1;
	this.y1;
	this.x2;
	this.y2;
}

function addPoint(rect){
	var line = new Line();
	line.x1 = rect.x
	line.y1 = rect.y
	if(rect.width < rect.height){
		line.x2 = rect.x
		line.y2 = rect.y+rect.height
	}else{
		
		line.x2 = rect.x+rect.width
		line.y2 = rect.y
	}
	this.boundary.push(line);
}

function buildBoundary(boundary){
	console.log(boundary.length)
	var lowestLine = findLowest(boundary)
	var times = boundary.length;
	var g = new createjs.Graphics().beginStroke("rgba(84,84,84,1)").beginBitmapFill(this.image).moveTo(lowestLine.x1,lowestLine.y1);
	g.lineTo(lowestLine.x2,lowestLine.y2);
	var nextLine = {index:1 , line: lowestLine};
	var x = 1;
	console.log(boundary.length)
	while(x < times){
		//console.log(x)
		x++;
		
		nextLine =  findNext({x:nextLine.line.x2,y:nextLine.line.y2}, boundary);
		if(nextLine.index == 1){
			
		}else{
			var tempx1 = nextLine.line.x1
			var tempy1 = nextLine.line.y1
			nextLine.line.x1 = nextLine.line.x2
			nextLine.line.y1 = nextLine.line.y2
			nextLine.line.x2 = tempx1
			nextLine.line.y2 = tempy1
		}
		g.lineTo(nextLine.line.x1,nextLine.line.y1);
		g.lineTo(nextLine.line.x2,nextLine.line.y2);
	}  
	g.endStroke()
	

	var s = new createjs.Shape(g)
	this.stage.addChild(s)

	
}
function findLowest(boundary){
	var lowestLine ;
	var index = -1;
	var lowestx=1000;
	for(i in boundary){
		var x ;
		var p = boundary[i];
		if(p.x1 < p.x2){
			x= p.x1;
		}else{
			x =p.x2
		}
		if( x < lowestx){
			lowestLine = boundary[i]
			lowestx = x;
			index = i;
		}
	}
	if(index > 0){
		removeByIndex(boundary, index);
	}
	return lowestLine;
}
function findNext(point , boundary ){
	var diff = 40;
	point.x = point.x -(diff/2)
	point.y = point.y -(diff/2)
	point.width = diff;
	point.height = diff;
	for( var x in boundary){
		var line = boundary[x]
		if(lies(point, {x:line.x1 , y: line.y1})){
			removeByIndex(boundary, x);
			return {index:1 ,line: line}
		}
		if(lies(point, {x:line.x2 , y: line.y2})){
			removeByIndex(boundary, x);
			return  {index:2 ,line: line}
		}
	}
	
}

function lies(rect, point){
	return rect.x < point.x && rect.y < point.y && point.x < rect.x+rect.width && point.y < rect.y + rect.height
}
function removeByIndex(arr, index) {
    arr.splice(index, 1);
}
function collides(a, b) {
	  return a.x < b.x + b.width &&
			 a.x + a.width > b.x &&
			 a.y < b.y + b.height &&
			 a.y + a.height > b.y;
}
	
p.loadNextLevel = function (level){
	this.resetAll();
	if(level){
		if(level > levels.length)
			level = 1;
		this.currentLevel = level
	}else{
		this.currentLevel = this.currentLevel+1
		if(this.currentLevel > levels.length){
			this.currentLevel = 1;
		}
	}

	var levelIndex = this.currentLevel -1;
	this.time = levels[levelIndex].time;
	for(x in levels[levelIndex].walls ){	
		var map = levels[levelIndex].walls[levels[levelIndex].walls.length - x -1];
		var rect = new createjs.Rectangle(map.x,map.y,map.width,map.height);
		this.walls.push(rect)
		addPoint.call(this,rect);
		if(this.debug){			
			var g = new createjs.Graphics().beginFill("#A5A6AB").rect(rect.x,rect.y,rect.width,rect.height);
			var s = new createjs.Shape(g)
			stage.addChild(s)
		}
	}
	//console.log(this.boundary.length);
	buildBoundary.call(this,this.boundary);
	
	var sureshStartImage = new createjs.Bitmap(this.startImage)
	var rameshStartImage = new createjs.Bitmap(this.startImage)
	sureshStartImage.alpha=0.5
	rameshStartImage.alpha = 0.5
	sureshStartImage.regX  = sureshStartImage.regY  =  30
	rameshStartImage.regX = rameshStartImage.regY = 30
	this.stage.addChild(sureshStartImage);
	this.stage.addChild(rameshStartImage);
	
	var ramesh = new sr.Player(resourceManager.getResult("img_player").result,this.stage,{UP: 87,DOWN: 83,LEFT:65,RIGHT:68});
	var suresh = new sr.Player(resourceManager.getResult("img_player").result,this.stage,{UP: 38,DOWN: 40,LEFT:37,RIGHT:39});
	
	
	
	
	rameshStartImage.x =ramesh.spawnX =  ramesh.x= levels[levelIndex].playerPosition[0].x;
	rameshStartImage.y = ramesh.spawnY=  ramesh.y = levels[levelIndex].playerPosition[0].y;
	sureshStartImage.x = suresh.spawnX =  suresh.x = levels[levelIndex].playerPosition[1].x;
	sureshStartImage.y = suresh.spawnY = suresh.y = levels[levelIndex].playerPosition[1].y;
	suresh.gotoAndPlay("right-idle");
	suresh.scaleX=suresh.scaleY=ramesh.scaleX=ramesh.scaleY=0.5;
	
	

	this.actors.push(suresh);
	this.actors.push(ramesh);
	soundManager.playBk();
}

p.initialize = function(){
	
}



sr.LevelManager = LevelManager;

}());