// hide the modals and the background on load
$(document).load('event', function() {
	$('.modal_bg').hide();
	$('.modal').hide();
});

// Show me modal windows
$('.modal-go').bind('click', function() {
	var dis_modal = $(this).attr('data-modal-id')
	var close_bg = $(this).attr('data-modal-closebg')
	$('.modal').hide();
	$('.modal_bg').fadeIn();
	$('#' + dis_modal).fadeIn().addClass('modal_on');
});

// Close on button
$('.close').bind('click', function() {
	$('.modal_bg').fadeOut();
	$('.modal').fadeOut();
});

// close on background click, sometimes
$('.modal_bg').bind('click', function() {
	if close_bg = 'true' {
		$('.modal_bg').fadeOut();
		$('.modal').fadeOut();
	}
});


$('span.close').bind('click', function() {
	$(this).parent().slideUp();
});