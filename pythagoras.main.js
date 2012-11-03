"use strict";
var pythagoras = {};
pythagoras.main = function() {

	var run = function() {

		var canvas = document.getElementById("pythagoras-canvas");
		var ctx = canvas.getContext("2d");
		var width = 130;
		var angle = rad(45);
		var fillColor = "999944";
		var strokeColor = "11DD11";
		ctx.translate(400, 400);
		recurse(ctx, width, 14, angle, fillColor, strokeColor);
		//test(ctx, width, 0 ,0);

	}
	
	var recurse = function(ctx, width, depth, angle, fillColor, strokeColor) {

		ctx.fillStyle = fillColor;
		ctx.strokeStyle = strokeColor;
		ctx.fillRect(0, 0, width, width);
		ctx.strokeRect(0,  0, width, width);
		
		if (depth <= 0) {
			return;
		}
				
		ctx.save();
		ctx.translate(width, 0);
		ctx.rotate(angle);
		var val = width*0.5*Math.sqrt(2);
		ctx.translate(-val, -val);
		recurse(ctx, val, depth-1, angle, colorLum(fillColor, -0.01), colorLum(strokeColor, -0.03));
		ctx.restore();
		ctx.save();
		ctx.rotate(-angle);
		ctx.translate(0, -val);
		recurse(ctx, val, depth-1, angle, colorLum(fillColor, -0.01), colorLum(strokeColor, -0.03));
		ctx.restore();
		
				
	}
	
	var rad = function(deg) {
		return deg * Math.PI / 180;
	}
	
	var colorLum = function(hex, lum) {
		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;
		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}
		return rgb;
	}

	
	return {
		run: run
	}
}();