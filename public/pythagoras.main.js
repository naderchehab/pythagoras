"use strict";

pythagoras.main = function() {

	var ctx;
	var depth = 0; // current depth of recursion
	
	var init = function() {
		var canvas = document.getElementById("pythagoras-canvas");
		ctx = canvas.getContext("2d");
		ctx.translate(400, 400);
		animate();
	}
	
	var animate = function() {
		if (depth < pythagoras.constants.maxDepth) {
			recurse(ctx, pythagoras.constants.width, depth, pythagoras.constants.angle, pythagoras.constants.fillColor, pythagoras.constants.strokeColor);
			setTimeout(function() { requestAnimFrame(animate); }, pythagoras.constants.duration);
			depth++;
		}
	}
	
	var recurse = function(ctx, width, depth, angle, fillColor, strokeColor) {

		ctx.fillStyle = fillColor;
		ctx.strokeStyle = strokeColor;
		ctx.fillRect(0, 0, width, width);
		ctx.strokeRect(0,  0, width, width);
		
		if (depth <= 0) {
			return;
		}
						
		var val = width*0.5*Math.sqrt(2);
		ctx.save();
		ctx.translate(width, 0);
		ctx.rotate(angle);
		ctx.translate(-val, -val);
		recurse(ctx, val, depth-1, angle, pythagoras.util.colorLum(fillColor, -0.01), pythagoras.util.colorLum(strokeColor, -0.04));
		ctx.restore();
		ctx.save();
		ctx.rotate(-angle);
		ctx.translate(0, -val);
		recurse(ctx, val, depth-1, angle, pythagoras.util.colorLum(fillColor, -0.01), pythagoras.util.colorLum(strokeColor, -0.04));
		ctx.restore();
	}
		
	return {
		init: init
	}
}();