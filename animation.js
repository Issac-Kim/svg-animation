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

var getRandomX  = function(img_width){
    return Math.floor(Math.random() * (width - img_width));
}

var getRandomY  = function(img_height){
    return Math.floor(Math.random() * (height - img_height));
}

var makeImage = function(file, width, height, x, y){
    var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttribute("id", "image");
    img.setAttribute("width", width);
    img.setAttribute("height", height);
    img.setAttribute("x", x);
    img.setAttribute("y", y);
    img.setAttribute("href", file);
    svg.appendChild(img);
}

var dvd = function(){
    clear();
    var img_width = 90;
    var img_height = 60;
    var x = getRandomX(img_width);
    var y = getRandomY(img_height);
    var inc_x = 1;
    var inc_y = 1;
    makeImage("dvd.png", img_width, img_height, x, y);
    var img = document.getElementById("image");
    window.cancelAnimationFrame(rid);
    var animate = function(){
	if(x == 0 || x == width - img_width){
	    inc_x = inc_x * -1;
	}
	if(y == 0 || y == height - img_height){
	    inc_y = inc_y * -1;
	}
	img.setAttribute("x", x);
	img.setAttribute("y", y);
	x = x + inc_x;
	y = y + inc_y;
	rid = window.requestAnimationFrame(animate);
    }
    animate();
}

dvd_button.addEventListener("click", dvd);

var stop = function(){
    window.cancelAnimationFrame(rid);
}

stop_button.addEventListener("click", stop);
