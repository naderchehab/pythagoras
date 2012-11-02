"use strict";
var pythagoras = {};
pythagoras.main = function() {

	var run = function() {
		var canvas = document.getElementById("pythagoras-canvas");
		var ctx = canvas.getContext("2d");
		var width = 80;
		ctx.translate(300, 300);
		ctx.fillStyle = "rgb(0,200,0)";
		recurse(ctx, width, 0 ,0);
		//test(ctx, width, 0 ,0);

	}
	
	var depth = 0;
	
	var recurse = function(ctx, width, x, y) {
		
		if (depth > 10) {
			return;
		}
			
		ctx.fillRect(x, y, width, width);
		ctx.save();
		ctx.rotate(rad(-45));
		var val = width*0.5*Math.sqrt(2);
		recurse(ctx, val, val, 0);
		ctx.restore();
		ctx.save();
		ctx.rotate(rad(45));
		recurse(ctx, val, -val, -val);
		ctx.restore();
		depth++;
		
	}
	
var test = function(ctx, width, x, y) {
		
		if (width < 1) {
			return;
		}
		var val = width*0.5*Math.sqrt(2);
		ctx.fillRect(x, y, width, width);
		ctx.save();
		ctx.rotate(rad(-45));
		ctx.fillRect(val, 0, val, val);
		ctx.restore();
		ctx.save();
		ctx.rotate(rad(45));
		ctx.fillRect(-val, -val, val, val);
		ctx.restore();
			
	}
	
	var rad = function(deg) {
		return deg * Math.PI / 180;
	}
	
	return {
		run: run
	}
}();