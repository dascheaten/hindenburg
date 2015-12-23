// hide the modals and the background on load
$(document).ready(function () {
	if ($('.modal').length) {
		$('body').append('<a class="modal-bg"></a>');
		$('.modal').hide();
		$('.modal-bg').hide();
	}
	
	// Show me modal windows
	$('.modal-go').bind('click', function () {
		var dis_modal = $(this).attr('data-modal-id')
		$('.modal').hide().removeClass('modal-on');
		$('.modal-bg').fadeIn();
		$('#' + dis_modal).fadeIn().addClass('modal-on');
	});

	// Close on button
	$('.close').bind('click', function () {
		$('.modal-bg').fadeOut();
		$('.modal').fadeOut().removeClass('modal-on');
	});

	// close on background click, sometimes
	$('.modal-bg').bind('click', function () {
		var close_bg = $('.modal-on').attr('data-modal-closebg')
		if (close_bg !== 'false') {
			$('.modal-bg').fadeOut();
			$('.modal').fadeOut();
		}
	});

	$('span.close').bind('click', function () {
		$(this).parent().slideUp();
	});

	$('input[type=range]').change();
	
});


// Donut progress bar setter'er on load
if ($('.progress-bar').hasClass('donut')) {
    var percentage = $('.donut').attr('data-complete')
    var donut_length = 440 - (percentage * 4.4)
    var animation = '<div class="destroy-me"><style>@-webkit-keyframes donut { to { stroke-dashoffset: ' + donut_length + '; } } @keyframes donut { to { stroke-dashoffset: ' + donut_length + '; } }</style></div>'

    $('.done').html(percentage);
    $('.donut').prepend(animation).delay(1).show(1).attr('data-old-value', donut_length);
}

// call this function if you change the percentage value
function changeValue() {
    var old_value = $('.donut').attr('data-old-value');
    var percentage = $('.donut').attr('data-complete')
    var new_length = 440 - (percentage * 4.4)
    var animation = '<div class="destroy-me"><style>.circle-animation{stroke-dashoffset: ' + old_value + ' !important;}@-webkit-keyframes donut { to { stroke-dashoffset: ' + new_length + '; } } @keyframes donut { to { stroke-dashoffset: ' + new_length + '; } }</style></div>'
    var height = $('.donut').height()
    
    $('.destroy-me').remove();
    $('.done').html(percentage);
    $('.donut').css('height', height).attr('data-old-value', new_length);
    $('.donut svg').hide(1).prepend(animation).delay(1).show(1);
};

// Set the progress on bar style progress bars
function setProgress()  {
    var percent = $('.progress-bar').attr('data-complete')
    $('.progress-bar.bar').children('.complete').animate({
    width: percent + '%'
  }, 1000 );  
}

if ($('.progress-bar').hasClass('bar')) {
  setProgress();
}

// Functions for Mega Menu
if ($('nav').hasClass('mega-menu')) {
	if(!$('.off-canvas.button').is(":visible")) {
		$('.drop').mouseenter(function () {
			$(this).children('.drop-menu').slideDown();
		});
		$('.drop').mouseleave(function () {
			$('.drop-menu').slideUp();
		});
	} 
}

// off canvas nav
$('.off-canvas').bind('click', function () {
	$(this).toggleClass('open');
	if ($(this).hasClass('open')) {
		$(this).text('Close');
	}
	else {
		$(this).text('Menu');
	}
});

// Functions for off canvans nav
$('.drop').bind('click', function () {
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
$('span.tooltip').mouseenter(function () {
	var tip = $(this).attr('data-tip');
	var content = $(this).html();
	if (!$(this).hasClass('tip-open')){
		$(this).addClass('tip-open').html(content + '<div class="this-tip">' + tip + '</div>');
	} else {
		$(this).removeClass('tip-open');
		$('.this-tip').remove();
	}
});
$('span.tooltip').mouseleave(function () {
	if ($(this).hasClass('tip-open')) {
		$(this).removeClass('tip-open');
		$('.this-tip').remove();
	}
});

// Range Slider
$('input[type=range]').on('change', function () {
	var value = $(this).val();
	$(this).prev().text(value);
});

// Accordion make do'er
$('dl.accordion dt').on('click', function () {
	if ($(this).next('dd').is(":visible")) {
		$('dl.accordion dd').slideUp();
        $(this).find('.iconic-caret').attr( "data-direction", "bottom" );
        IconicJS().update();
	} else {
		$('dl.accordion dd').slideUp();
        $('dl.accordion dt').find('.iconic-caret').attr( "data-direction", "bottom" );
        $(this).find('.iconic-caret').attr( "data-direction", "top" );
        IconicJS().update();
		$(this).next('dd').slideDown();
	}
});

// Make the labels do junk
$('input').focus(function(){
    $(this).prev('label').addClass('focus');
});

$('input').focusout(function(){
    if( !$(this).val() ) {
        $(this).prev('label').removeClass('focus');
    }
});

// Slider
$('#checkbox').change(function (){
setInterval(function () {
    moveRight();
}, 3000);
});

jQuery(document).ready(function ($) {
	var slideCount = $('#slider ul li').length;
 	var slideWidth = '100%';
	var slideHeight = $('#slider ul li.active').height();
	var sliderUlWidth = '100%';

	$('#slider').css({ width: '100%', height: slideHeight });
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

	$('#slider ul li:first-child').prependTo('#slider ul');

	function moveRight() {
		$('.active').removeClass('active');
        $('#slider ul li:first-child').appendTo('#slider ul');
		$('#slider ul li:first-child').addClass('active');
        var slideHeight = $('#slider ul li.active').height();
		$('#slider ul').css('left', '');
		$('#slider').css({ width: '100%', height: slideHeight });
		$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	};

	function moveLeft() {
		$('.active').removeClass('active');
        $('#slider ul li:last-child').prependTo('#slider ul');
		$('#slider ul li:first-child').addClass('active');
		var slideHeight = $('#slider ul li.active').height();
        $('#slider ul').css('left', '');
		$('#slider').css({ width: '100%', height: slideHeight });
		$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	};

	$('a.control_next').click(function () {
	    moveRight();
	});

	$('a.control_prev').click(function () {
	    moveLeft();
	});
});

$( window ).resize(function () {
	var slideHeight = $('#slider ul li.active').height();
	var sliderUlWidth = '100%';

	$('#slider').css({ width: '100%', height: slideHeight });
});

// Tabs
$('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
});