$(document).ready(function() {
	$("#text").click(function() {
		$("#text").hide("pulsate");
	});
	
	// animate thumbnails
	$('.thumbnail').mouseenter(function() {
	       $(this).animate({
	    	   height: '+=1.5em',
	    	   width: '+=1.5em'
	       });
	   });
	   $('.thumbnail').mouseleave(function() {
	       $(this).animate({
	    	   height: '-=1.5em',
	    	   width: '-=1.5em'
	       }); 
	   });
});