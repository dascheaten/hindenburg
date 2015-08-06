// hide the modals and the background on load
$(document).ready(function() {
	if ($('.modal-go').length) {
		$('body').append('<a class="modal_bg"></a>');
		$('.modal').hide();
		$('.modal_bg').hide();
	}
	
	// Show me modal windows
	$('.modal-go').bind('click', function() {
		var dis_modal = $(this).attr('data-modal-id')
		$('.modal').hide().removeClass('modal_on');
		$('.modal_bg').fadeIn();
		$('#' + dis_modal).fadeIn().addClass('modal_on');
	});

	// Close on button
	$('.close').bind('click', function() {
		$('.modal_bg').fadeOut();
		$('.modal').fadeOut().removeClass('modal_on');
	});

	// close on background click, sometimes
	$('.modal_bg').bind('click', function() {
		var close_bg = $('.modal_on').attr('data-modal-closebg')
		if (close_bg != 'false') {
			$('.modal_bg').fadeOut();
			$('.modal').fadeOut();
		}
	});

	$('span.close').bind('click', function() {
		$(this).parent().slideUp();
	});
});

// off canvas nav
$('.off-canvas').bind('click', function() {
	$(this).toggleClass('open');
	if ($(this).hasClass('open')) {
		$(this).text('Close');
	}
	else {
		$(this).text('Menu');
	}
});


$('.drop').bind('click', function() {
	if ($('.off-canvas').hasClass('open')) {
		$(this).toggleClass('drop-open');
		if ($(this).hasClass('drop-open')) {
			var text = $(this).find('a:first').text();
			$(this).attr('data-text', text)
			$(this).find('a:first').text('Close');
		}
		else {
			var textback = $(this).data('text');
			$(this).find('a:first').text(textback);
	
		}
	}
});	

