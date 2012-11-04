"use strict";

 // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var pythagoras = {};
var ctx, width, angle, fillColor, strokeColor;

pythagoras.main = function() {

	var run = function() {

		var canvas = document.getElementById("pythagoras-canvas");
		ctx = canvas.getContext("2d");
		width = 130;
		angle = rad(45);
		fillColor = "504106";
		strokeColor = "00AF64";
		ctx.translate(400, 400);
		animate();
		
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
		recurse(ctx, val, depth-1, angle, colorLum(fillColor, -0.01), colorLum(strokeColor, -0.04));
		ctx.restore();
		ctx.save();
		ctx.rotate(-angle);
		ctx.translate(0, -val);
		recurse(ctx, val, depth-1, angle, colorLum(fillColor, -0.01), colorLum(strokeColor, -0.04));
		ctx.restore();
		
				
	}
	var num = 0;
	var duration = 1000;
	var animate = function() {
		if (num < 14) {
			recurse(ctx, width, num, angle, fillColor, strokeColor);
			setTimeout(function() { window.requestAnimFrame(animate); }, duration);
			num++;
			if (num > 9)
				duration = duration*0.5;
		}
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