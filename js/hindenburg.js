// hide the modals and the background on load
$(document).ready(function () {
	if ($('.modal').length) {
		$('body').append('<a class="modal-bg"></a>');
		$('.modal').hide();
		$('.modal-bg').hide();
	};
	
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
	
	// Fix the forms if there's already data
	$('input').each(function() {
		if ($(this).val() !== '') {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("complete");
		} else if ($(this).attr('disabled')) {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("disabled");
		}
	});
	$('select').each(function() {
		if ($(this).val() !== '') {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("complete");
		} else if ($(this).attr('disabled')) {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("disabled");
		}
	});
	if ($('body').hasClass('intro')) {
		$('.modal-bg').fadeIn();
		$('#pf_opt_in').fadeIn().addClass('modal-on');
	}
});


// Donut progress bar setter'er on load
$( window ).ready(function() {
	if ($('.progress-bar').hasClass('donut')) {
	    var percentage = $('.donut').attr('data-complete')
	    var donut_length = 440 - (percentage * 4.4)
	    var animation = '<div class="destroy-me"><style>@-webkit-keyframes donut { to { stroke-dashoffset: ' + donut_length + '; } } @keyframes donut { to { stroke-dashoffset: ' + donut_length + '; } }</style></div>'

	    $('.done').html(percentage);
	    $('.donut').prepend(animation).delay(1).show(1).attr('data-old-value', donut_length);
	}
});

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
//$('input[type=range]').on('change', function () {
//	var value = $(this).val();
//	$(this).prev().text(value);
//});

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


// Unslider
(function(factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
        define([], factory(window.jQuery));
    } else {
		factory(window.jQuery);
	}
}(function($) {
	if(!$) {
		return console.warn('Unslider needs jQuery');
	}

	$.Unslider = function(context, options) {
		var self = this;
		self._ = 'unslider';
		self.defaults = {
			autoplay: false,
			delay: 3000,
			speed: 750,
			easing: 'swing',
			keys: {
				prev: 37,
				next: 39
			},
			nav: true,
			arrows: {
				prev: '<a class="' + self._ + '-arrow prev">Prev</a>',
				next: '<a class="' + self._ + '-arrow next">Next</a>'
			},
			animation: 'horizontal',
			selectors: {
				container: 'ul:first',
				slides: 'li'
			},
			animateHeight: false,
			activeClass: self._ + '-active',
			swipe: true,
			swipeThreshold: 0.2
		};
		self.$context = context;
		self.options = {};
		self.$parent = null;
		self.$container = null;
		self.$slides = null;
		self.$nav = null;
		self.$arrows = [];
		self.total = 0;
		self.current = 0;
		self.prefix = self._ + '-';
		self.eventSuffix = '.' + self.prefix + ~~(Math.random() * 2e3);
		self.interval = null;
		self.init = function(options) {
			self.options = $.extend({}, self.defaults, options);
			self.$container = self.$context.find(self.options.selectors.container).addClass(self.prefix + 'wrap');
			self.$slides = self.$container.children(self.options.selectors.slides);
			self.setup();
			$.each(['nav', 'arrows', 'keys', 'infinite'], function(index, module) {
				self.options[module] && self['init' + $._ucfirst(module)]();
			});
			if(jQuery.event.special.swipe && self.options.swipe) {
				self.initSwipe();
			}
			self.options.autoplay && self.start();
			self.calculateSlides();
			self.$context.trigger(self._ + '.ready');
			return self.animate(self.options.index || self.current, 'init');
		};

		self.setup = function() {
			self.$context.addClass(self.prefix + self.options.animation).wrap('<div class="' + self._ + '" />');
			self.$parent = self.$context.parent('.' + self._);
			var position = self.$context.css('position');
			if(position === 'static') {
				self.$context.css('position', 'relative');
			}

			self.$context.css('overflow', 'hidden');
		};
		self.calculateSlides = function() {
			self.$slides = self.$container.children(self.options.selectors.slides);

			self.total = self.$slides.length;
			if(self.options.animation !== 'fade') {
				var prop = 'width';

				if(self.options.animation === 'vertical') {
					prop = 'height';
				}

				self.$container.css(prop, (self.total * 100) + '%').addClass(self.prefix + 'carousel');
				self.$slides.css(prop, (100 / self.total) + '%');
			}
		};
		self.start = function() {
			self.interval = setTimeout(function() {
				self.next();
			}, self.options.delay);

			return self;
		};
		self.stop = function() {
			clearTimeout(self.interval);

			return self;
		};
		self.initNav = function() {
			var $nav = $('<nav class="' + self.prefix + 'nav"><ol /></nav>');
			self.$slides.each(function(key) {
				var label = this.getAttribute('data-nav') || key + 1;
				if($.isFunction(self.options.nav)) {
					label = self.options.nav.call(self.$slides.eq(key), key, label);
				}
				$nav.children('ol').append('<li data-slide="' + key + '">' + label + '</li>');
			});
			self.$nav = $nav.insertAfter(self.$context);
			self.$nav.find('li').on('click' + self.eventSuffix, function() {
				var $me = $(this).addClass(self.options.activeClass);
				$me.siblings().removeClass(self.options.activeClass);
				self.animate($me.attr('data-slide'));
			});
		};
		self.initArrows = function() {
			if(self.options.arrows === true) {
				self.options.arrows = self.defaults.arrows;
			}
			$.each(self.options.arrows, function(key, val) {
				self.$arrows.push(
					$(val).insertAfter(self.$context).on('click' + self.eventSuffix, self[key])
				);
			});
		};
		self.initKeys = function() {
			if(self.options.keys === true) {
				self.options.keys = self.defaults.keys;
			}

			$(document).on('keyup' + self.eventSuffix, function(e) {
				$.each(self.options.keys, function(key, val) {
					if(e.which === val) {
						$.isFunction(self[key]) && self[key].call(self);
					}
				});
			});
		};
		self.initSwipe = function() {
			var width = self.$slides.width();
			if(self.options.animation !== 'fade') {

				self.$container.on({

					movestart: function(e) {
						if((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
							return !!e.preventDefault();
						}

						self.$container.css('position', 'relative');
					},

					move: function(e) {
						self.$container.css('left', -(100 * self.current) + (100 * e.distX / width) + '%');
					},

					moveend: function(e) {
						if((Math.abs(e.distX) / width) > self.options.swipeThreshold) {

							self[e.distX < 0 ? 'next' : 'prev']();
						}
						else {

							self.$container.animate({left: -(100 * self.current) + '%' }, self.options.speed / 2 );
						}
					}
				});
			}
		};
		self.initInfinite = function() {
			var pos = ['first', 'last'];

			$.each(pos, function(index, item) {
				self.$slides.push.apply(
					self.$slides,
					self.$slides.filter(':not(".' + self._ + '-clone")')[item]()
					.clone().addClass(self._ + '-clone')
					['insert' + (index === 0 ? 'After' : 'Before')](
						self.$slides[pos[~~!index]]()
					)
				);
			});
		};
		self.destroyArrows = function() {
			$.each(self.$arrows, function(i, $arrow) {
				$arrow.remove();
			});
		};
		self.destroySwipe = function() {
			self.$container.off('movestart move moveend');
		};
		self.destroyKeys = function() {
			$(document).off('keyup' + self.eventSuffix);
		};

		self.setIndex = function(to) {
			if(to < 0) {
				to = self.total - 1;
			}

			self.current = Math.min(Math.max(0, to), self.total - 1);

			if(self.options.nav) {
				self.$nav.find('[data-slide="' + self.current + '"]')._active(self.options.activeClass);
			}

			self.$slides.eq(self.current)._active(self.options.activeClass);

			return self;
		};
		self.animate = function(to, dir) {
			if(to === 'first') to = 0;
			if(to === 'last') to = self.total;
			if(isNaN(to)) {
				return self;
			}

			if(self.options.autoplay) {
				self.stop().start();
			}

			self.setIndex(to);
			self.$context.trigger(self._ + '.change', [to, self.$slides.eq(to)]);
			var fn = 'animate' + $._ucfirst(self.options.animation);
			if($.isFunction(self[fn])) {
				self[fn](self.current, dir);
			}

			return self;
		};
		self.next = function() {
			var target = self.current + 1;
			if(target >= self.total) {
				target = 0;
			}

			return self.animate(target, 'next');
		};
		self.prev = function() {
			return self.animate(self.current - 1, 'prev');
		};
		self.animateHorizontal = function(to) {
			var prop = 'left';
			if(self.$context.attr('dir') === 'rtl') {
				prop = 'right';
			}

			if(self.options.infinite) {
				self.$container.css('margin-' + prop, '-100%');
			}

			return self.slide(prop, to);
		};
		self.animateVertical = function(to) {
			self.options.animateHeight = true;
			if(self.options.infinite) {
				self.$container.css('margin-top', -self.$slides.outerHeight());
			}

			return self.slide('top', to);
		};
		self.slide = function(prop, to) {
			self.animateHeight(to);
			if(self.options.infinite) {
				var dummy;
				if(to === self.total - 1) {
					dummy = self.total - 3;
					to = -1;
				}
				if(to === self.total - 2) {
					dummy = 0;
					to = self.total - 2;
				}
				if(typeof dummy === 'number') {
					self.setIndex(dummy);
					self.$context.on(self._ + '.moved', function() {
						if(self.current === dummy) {
							self.$container.css(prop, -(100 * dummy) + '%').off(self._ + '.moved');
						}
					});
				}
			}
			var obj = {};
			obj[prop] = -(100 * to) + '%';
			return self._move(self.$container, obj);
		};
        self.animateFade = function(to) {
			self.animateHeight(to);

			var $active = self.$slides.eq(to).addClass(self.options.activeClass);
			self._move($active.siblings().removeClass(self.options.activeClass), {opacity: 0});
			self._move($active, {opacity: 1}, false);
		};
		self.animateHeight = function(to) {
			if (self.options.animateHeight) {
				self._move(self.$context, {height: self.$slides.eq(to).outerHeight()}, false);
			}
		};

		self._move = function($el, obj, callback, speed) {
			if(callback !== false) {
				callback = function() {
					self.$context.trigger(self._ + '.moved');
				};
			}

			return $el._move(obj, speed || self.options.speed, self.options.easing, callback);
		};
		return self.init(options);
	};
	$.fn._active = function(className) {
		return this.addClass(className).siblings().removeClass(className);
	};
	$._ucfirst = function(str) {
		return (str + '').toLowerCase().replace(/^./, function(match) {
			return match.toUpperCase();
		});
	};

	$.fn._move = function() {
		this.stop(true, true);
		return $.fn[$.fn.velocity ? 'velocity' : 'animate'].apply(this, arguments);
	};

	$.fn.unslider = function(opts) {
		return this.each(function() {
			var $this = $(this);

			if(typeof opts === 'string' && $this.data('unslider')) {
				opts = opts.split(':');

				var call = $this.data('unslider')[opts[0]];

				if($.isFunction(call)) {
					return call.apply($this, opts[1] ? opts[1].split(',') : null);
				}
			}

			return $this.data('unslider', new $.Unslider($this, opts));
		});
	};

}));


// Tabs
$('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
});

// Forms
$("input, select").focus(function() {
	var disput = $(this).attr('id');
	var label = $("label[for='" + disput + "']");
	$(label).removeClass("complete").addClass("focused");
});
$("input, select").blur(function() {
	var disput = $(this).attr('id');
	var label = $("label[for='" + disput + "']");
	$(label).removeClass("focused");
	if ($(this).val().length === 0) {
		$(label).removeClass("focused complete");
	} else if ($(this).hasClass('error')) {
		$(label).addClass("error");
	} else {
		$(label).removeClass("focused error").addClass("complete");
		$(disput).addClass("complete");
	}
});

// Toggle button
$('.toggle').click(function() {
	var field = $(this).attr('data-field');
	$(this).toggleClass('on off');
	if($(this).hasClass('off')) {
		$('#' + field).val('off');
		$('.' + field).text('Off');
		$('[data-toggle-content="' + field + '"]').slideUp();
	} else {
		$('#' + field).val('on');
		$('.' + field).text('On');
		$('[data-toggle-content="' + field + '"]').slideDown();
	}
});