// hide the modals and the background on load
$(document).ready(function() {
	if ($('.modal-go').length) {
		$('body').append('<a class="modal-bg"></a>');
		$('.modal').hide();
		$('.modal-bg').hide();
	}
	
	// Show me modal windows
	$('.modal-go').bind('click', function() {
		var dis_modal = $(this).attr('data-modal-id')
		$('.modal').hide().removeClass('modal-on');
		$('.modal-bg').fadeIn();
		$('#' + dis_modal).fadeIn().addClass('modal-on');
	});

	// Close on button
	$('.close').bind('click', function() {
		$('.modal-bg').fadeOut();
		$('.modal').fadeOut().removeClass('modal-on');
	});

	// close on background click, sometimes
	$('.modal-bg').bind('click', function() {
		var close_bg = $('.modal-on').attr('data-modal-closebg')
		if (close_bg != 'false') {
			$('.modal-bg').fadeOut();
			$('.modal').fadeOut();
		}
	});

	$('span.close').bind('click', function() {
		$(this).parent().slideUp();
	});

	$('input[type=range]').change();
	
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

// Functions for Mega Menu
if ($('nav').hasClass('mega-menu')) {
	if(!$('.off-canvas.button').is(":visible")) {
		$('.drop').mouseenter(function() {
			$(this).children('.drop-menu').slideDown();
		});
		$('.drop').mouseleave(function() {
			$('.drop-menu').slideUp();
		});
	}
}

// Functions for off canvans nav
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

// Tool Tips
$('span.tooltip').mouseenter(function() {
	var tip = $(this).attr('data-tip');
	var content = $(this).html();
	if (!$(this).hasClass('tip-open')){
		$(this).addClass('tip-open').html(content + '<div class="this-tip">' + tip + '</div>');
	} else {
		$(this).removeClass('tip-open');
		$('.this-tip').remove();
	}
});
$('span.tooltip').mouseleave(function() {
	if ($(this).hasClass('tip-open')) {
		$(this).removeClass('tip-open');
		$('.this-tip').remove();
	}
});

// Range Slider
$('input[type=range]').on('change', function() {
	var value = $(this).val();
	$(this).prev().text(value);
});

// Accordion make do'er
$('dl.accordion dt').on('click', function() {
	if ($(this).next('dd').is(":visible")) {
		$('dl.accordion dd').slideUp();
	} else {
		$('dl.accordion dd').slideUp();
		$(this).next('dd').slideDown();
	}
});

// Unslider by @idiot and @damirfoy


$('#checkbox').change(function(){
setInterval(function () {
    moveRight();
}, 3000);
});

var slideCount = $('#slider ul li').length;
var slideWidth = '100%';
var slideHeight = $('#slider ul li').height();
var sliderUlWidth = '100%';

$('#slider').css({ width: '100%', height: slideHeight });

$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

$('#slider ul li:last-child').prependTo('#slider ul');

function moveLeft() {
    $('#slider ul').animate({
        left: + slideWidth
    }, 200, function () {
        $('#slider ul li:last-child').prependTo('#slider ul');
        $('#slider ul').css('left', '');
    });
};

function moveRight() {
    $('#slider ul').animate({
        left: - slideWidth
    }, 200, function () {
        $('#slider ul li:first-child').appendTo('#slider ul');
        $('#slider ul').css('left', '');
    });
};

$('a.control_prev').click(function () {
    moveLeft();
});

$('a.control_next').click(function () {
    moveRight();
});



