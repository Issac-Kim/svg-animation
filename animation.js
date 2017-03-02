var svg = document.getElementById("drawing");
var circle_button = document.getElementById("circle");
var dvd_button = document.getElementById("dvd");
var stop_button = document.getElementById("stop");

var rid;
var height = parseInt(svg.getAttribute("height"));
var width = parseInt(svg.getAttribute("width"));

var clear = function(){
    while(svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
}

var drawCircle = function(radius){
    var r = radius;
    var cx = width / 2;
    var cy = height / 2;
    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("id", "circle");
    dot.setAttribute("fill", "blue");
    dot.setAttribute("cx", cx);
    dot.setAttribute("cy", cy);
    dot.setAttribute("r", r);
    svg.appendChild(dot);
}

var circle = function(e){
    clear();
    var r = 0;
    drawCircle(r);
    var dot = document.getElementById("circle");
    var increase = true;
    window.cancelAnimationFrame(rid);
    var animate = function(){
	if(r == width / 2 || r == height / 2){
	    increase = false;
	}
	if(r == 0){
	    increase = true;
	}
	dot.setAttribute("r", r);
	if(increase){
	    r++;
	}
	if(!increase){
	    r--;
	}
	rid = window.requestAnimationFrame(animate);
    }
    animate();
}
		     
circle_button.addEventListener("click", circle);

var stop = function(){
    window.cancelAnimationFrame(rid);
}

stop_button.addEventListener("click", stop);
