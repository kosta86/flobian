$("body").click(function() {
	if (event.target.id === 'scroll-btn') {
		$('html,body').animate({
			scrollTop: $("#prikljuci-se-form").offset().top},
        'slow');
	}
});

