//Author: james Small
//Date: 5/12/2017

//generic game functions
//use of var
var playerName = "missingno";//placeholder and a reference.
var selectedObject = new Array(0);
var playerLoc = 0;
var canAct = false;
//buttons
var redBtn = null;
var blueBtn = null;
var greenBtn = null;
var yellowBtn = null;
var best = 0;

function showElement(pos){
	console.log("show all elements, currently at " + pos);
	//not check
	if(pos != selectedObject.length){
		var id = selectedObject[pos];
		switch(id){
			case 0://red
				redBtn.style.background="#FF0000";
				window.setTimeout(function(){returnToNormal(0)},500);
				window.setTimeout(function(){showElement(pos+1)},1000);
				break;
			case 1://blue
				blueBtn.style.background="#0000FF";
				window.setTimeout(function(){returnToNormal(1)},500);
				window.setTimeout(function(){showElement(pos+1)},1000);
				break;
			case 2://green
				greenBtn.style.background="#00FF00";
				window.setTimeout(function(){returnToNormal(2)},500);
				window.setTimeout(function(){showElement(pos+1)},1000);

				break;
			case 3://yellow

				yellowBtn.style.background="#FFFF00";
				window.setTimeout(function(){returnToNormal(3)},500);
				window.setTimeout(function(){showElement(pos+1)},1000);

				break;
		}
	}
	else{
		canAct = true;
	}
}
function addElement(){
	console.log("adding an element to the array, (by making a new array and move all old elements over");
	var old = selectedObject;
	selectedObject = new Array(old.length+1);
	//us of for loop
	for(var i = 0; i < old.length;i++){
		selectedObject[i] = old[i];
	}
	selectedObject[old.length] = Math.floor(Math.random()*4);
	showElement(0);
}
function reset(){
	selectedObject = new Array(0);
	playerLoc = 0;
	setTimeout(addElement,1000);
}
function win(){
	canAct = false;
	playerLoc = 0;
	setTimeout(addElement,1000);

}
function lose(){
	canAct = false;
	var record = selectedObject.length-1;
	//comparision operator
	best = (record > best? record: best);
	var headers = document.getElementsByTagName("h1");
	for(var i = 0; i < headers.length;i++){
		headers[i].innerHTML = "best game: "+best;
	} 
	alert("you lost, press ok to continue");
	setTimeout(reset,100);
}
function clickAction(id){
	console.log("player clicked a span, currently actions are "+(canAct ? " enabled": "disabled"));
	if(canAct){
		var actual = selectedObject[playerLoc]
		var result = actual - id;//subtraction
		console.log("actual object selected is "+actual +", and player selected id is "+result);
		//strict not equal
		if(result!==0){
			//use of switch
			canAct = false;
			switch(actual){
				case 0://red
					alert("the element was actually red, sorry "+playerName);
					break;
				case 1://blue
					alert("the element was actually blue, sorry"+playerName);
					break;
				case 2://green
					alert("the element was actually green, sorry "+playerName);
					break;
				case 3://yellow
					alert("the element was actually yellow, sorry "+playerName);
					break;
			}
			lose();
		}
		else{
			//incremation
			playerLoc++;
			switch(id){
				case 0://red
					redBtn.style.background="#FF0000";
					setTimeout(function(){redBtn.style.background="#990000"},100);
					break;
				case 1://blue
					blueBtn.style.background="#0000FF";
					setTimeout(function(){blueBtn.style.background="#000099"},100);
					break;
				case 2://green
					greenBtn.style.background="#00FF00";
					setTimeout(function(){greenBtn.style.background="#009900"},100);
					break;
				case 3://yellow
					yellowBtn.style.background="#FFFF00";
					setTimeout(function(){yellowBtn.style.background="#999900"},100);
					break;
			}
			//equal operation
			if(playerLoc == selectedObject.length){
				win();
			}
		}
	}
}
function returnToNormal(id){

	switch(id){
		case 0://red
			redBtn.style.background="#990000";
			break;
		case 1://blue
			blueBtn.style.background="#000099";
			break;
		case 2://green
			greenBtn.style.background="#009900"
			break;
		case 3://yellow
			yellowBtn.style.background="#999900";
			break;
	}
}
function startup(){
	//red button setup
	//use of getElementById
	console.log("now starting things up, getting buttons");
	redBtn = document.getElementById("red");
	if (redBtn.addEventListener) {
        	redBtn.addEventListener("click", function(){clickAction(0);/*send red action*/ }, false); 
  	} else if (redBtn.attachEvent){
  		redBtn.attachEvent("onclick", function(){clickAction(0);/*send red action*/ });
  	}

  	//blue button setup
	blueBtn = document.getElementById("blue");
	if (blueBtn.addEventListener) {
        	blueBtn.addEventListener("click", function(){clickAction(1);/*send blue action*/ }, false); 
  	} else if (blueBtn.attachEvent){
  		blueBtn.attachEvent("onclick", function(){clickAction(1);/*send blue action*/ });
  	}

	greenBtn = document.getElementById("green");
	if (greenBtn.addEventListener) {
        	greenBtn.addEventListener("click", function(){clickAction(2);/*send green action*/ }, false); 
  	} else if (greenBtn.attachEvent){
  		greenBtn.attachEvent("onclick", function(){clickAction(2);/*send green action*/ });
  	}

	yellowBtn = document.getElementById("yellow");
	if (greenBtn.addEventListener) {
        	yellowBtn.addEventListener("click", function(){clickAction(3);/*send yellow action*/ }, false); 
  	} else if (yellowBtn.attachEvent){
  		yellowBtn.attachEvent("onclick", function(){clickAction(3);/*send yellow action*/ });
  	}
  	//while loop
  	console.log("game is now setup, demanding players name!!");
  	do{
  		playerName = prompt("input your name:");
  	}while(playerName === null);
  	setTimeout(addElement,100);
}


//event listenr to trigger all code
if (window.addEventListener) {
   window.addEventListener("load", startup, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", statup);
}