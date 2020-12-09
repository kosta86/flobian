$("body").click(function() {
	if (event.target.id === 'scroll-btn') {
		$('html,body').animate({
			scrollTop: $("#prikljuci-se").offset().top},
        'slow');
	}
});

