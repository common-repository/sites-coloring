(function($) {
	$(document).ready(function($) {
		var zh_bgr = [];
		var zh_col = [];
		var ind;
		var panel;
		var zh_css = [];
		var zh_css_ = [];
		var $class;
		var $data;
		var zh_keeper;

		function load() {
			$.post(ajaxurl, {
				action: 'zh_keeper'
			}, function(data) {
				if (data === '') {
					$('.zh_bgr').val('#FFFFFF');
					$('.zh_col').val('#FFFFFF');
					$.each($('.zh_bgr'), function() {
						zh_bgr.push('#FFFFFF');
						zh_col.push('#FFFFFF');
					});
					ind = 0;
					panel = 1;
					zh_keeper = zh_bgr + '^!^' + zh_col + '^!^' + ind + '^!^' + panel + '^!^' + zh_css;
				} else {
					zh_keeper = data.split('^!^');
					zh_bgr = zh_keeper[0].split(',');
					zh_col = zh_keeper[1].split(',');
					ind = zh_keeper[2];
					panel = zh_keeper[3];
					zh_css = zh_keeper[4].split(',');
					$.each($('.zh_bgr'), function(i) {
						$(this).val(zh_bgr[i]).focus().blur();
						$('.zh_col').eq(i).val(zh_col[i]).focus().blur();
						$('.zh_prob').eq(i).css({
							'background-color': zh_bgr[i],
							'color': zh_col[i]
						}).focus().blur();
					});
					$('.zh_prob').eq(ind).css({
						'border': '5px solid black'
					});
					$.each(zh_css, function(i) {
						zh_css_ = zh_css[i].split(' ');
						if (zh_css_[0] === 'a') {
							$(zh_css_[0]).not('#wpadminbar *').css({
								'background-color': zh_css_[1] + '00',
								'color': zh_css_[2]
							});
						} else {
							$(zh_css_[0]).css({
								'background-color': zh_css_[1],
								'color': zh_css_[2]
							});
						}
					});
				}
				$('.zh_in').css({
					'display': 'block',
					'margin': 0,
					'padding': 0
				});
				$('.jscolor').css({
					'width': '62px',
					'margin': 0,
					'padding': 0
				});
				$('.zh_prob').css({
					'width': '25px',
					'margin': 0,
					'padding': 0,
					'cursor': 'pointer'
				}).attr('readonly', 'readonly');
				$('.zh_but, .zh_no, .zh_Allok, .zh_CSSok').css({
					'width': '90px'
				});
				$('body').fadeTo(200, 1, 'linear');
				if (panel == 1) {
					$('.zh_comm').addClass('zh_com');
				}
			});
		}

		function save() {
			zh_keeper = zh_bgr + '^!^' + zh_col + '^!^' + ind + '^!^' + panel + '^!^' + zh_css;
			$.post(ajaxurl, {
				action: 'zh_keeper',
				zh_keeper: zh_keeper
			});
		}
		load();
		$('.zh_prob').bind('click', function() {
			$('.zh_prob').css({
				'border': ''
			});
			ind = $(this).index('.zh_prob');
			$('.zh_prob').eq(ind).css({
				'border': '5px solid black'
			});
			save();
		});
		$('.zh_bgr').bind('click change', function() {
			$('.zh_prob').css({
				'border': ''
			});
			ind = $(this).index('.zh_bgr');
			$('.zh_prob').eq(ind).css({
				'background-color': $(this).val(),
				'border': '5px solid black'
			});
			zh_bgr[ind] = $(this).val();
			var top = $('.zh_prob').eq(ind).position().top;
			var left = $('.zh_prob').eq(ind).offset().left;
			$('#zh_cont').css({
				'top': top + 34 + 'px',
				'left': left - 240 + 'px',
				'display': 'block'
			});
			save();
		});
		$('.zh_col').bind('click change', function() {
			$('.zh_prob').css({
				'border': ''
			});
			ind = $(this).index('.zh_col');
			$('.zh_prob').eq(ind).css({
				'color': $(this).val(),
				'border': '5px solid black'
			});
			zh_col[ind] = $(this).val();
			var top = $('.zh_prob').eq(ind).position().top;
			var left = $('.zh_prob').eq(ind).offset().left;
			$('#zh_cont').css({
				'top': top + 34 + 'px',
				'left': left - 240 + 'px',
				'display': 'block'
			});
			save();
		});
		$('#zh_cssbox').mousemove(function(event) {
			function str(el) {
				if (!el) return 'null';
				$class = 'Tag: ' + el.tagName + '<br>Id: ' + el.id + '<br>Class: ' + el.className;
				if (el.className !== '') return el.tagName + '.' + el.className;
				if (el.id !== '') return '#' + el.id;
				return;
			}
			$(event.target).css({
				'border': '1px solid #888'
			});
			$data = str(event.target);
			$('#zh_tooltip').html($class).css({
				'top': event.pageY + 5,
				'left': event.pageX + 5
			}).show();
		}).mouseout(function() {
			$(event.target).css({
				'border': '0px solid #888'
			});
			$('#zh_tooltip').hide().html('').css({
				'top': 0,
				'left': 0
			});
		});
		$('#zh_cssbox').not('#wpadminbar *').on('mousedown', function(event) {
			if ($data === '') return;
			$data = $data.replace(/ /g, '.');
			if ($data == '#cssbox') return;
			if ($data == '#comm *') return;
			if (ind === 0) {
				$data = 'body';
			}
			if (ind == 1) {
				$data = 'a';
			}
			if (zh_bgr[ind].match(/#[a-f0-9]{6}\b/gi) === null) return;
			if (zh_col[ind].match(/#[a-f0-9]{6}\b/gi) === null) return;
			$.each(zh_css, function(i) {
				var cs = zh_css[i].split(' ');
				if (cs[0] == $data) {
					zh_css.splice(i, 1);
					return false;
				}
			});
			if (event.which == 3) {
				$($data).css({
					'background-color': '',
					'color': ''
				});
			} else {
				if ($data == 'a') {
					$($data).not('#wpadminbar *').css({
						'background-color': zh_bgr[ind] + '00',
						'color': zh_col[ind]
					});
					zh_css.push($data + ' ' + zh_bgr[ind] + '00 ' + zh_col[ind] + '');
				} else {
					$($data).css({
						'background-color': zh_bgr[ind],
						'color': zh_col[ind]
					});
					zh_css.push($data + ' ' + zh_bgr[ind] + ' ' + zh_col[ind]);
				}
			}
			save();
		});
		document.oncontextmenu = function() {
			return false;
		};
		$(document).keyup(function(e) {
			if ((e.ctrlKey || e.metaKey) && (e.keyCode == 90 || e.keyCode == 10)) {
				if (panel == 1) {
					$('.zh_comm').removeClass('zh_com');
					$('#zh_cont').css({
						'display': 'none'
					});
					panel = 0;
				} else {
					$('.zh_comm').addClass('zh_com');
					panel = 1;
				}
				save();
			}
		});
		$('a, input').on('click', function(e) {
			if ($('#zh_but').hasClass('zh_fix')) {
				e.preventDefault();
			}
		});
		$('#zh_but').on('click', function() {
			$(this).toggleClass('zh_fix');
		});
		$('#zh_CSSreset').on('click', function(event) {
			event.preventDefault();
			$('#zh_overlay').fadeIn(400, function() {
				$('#zh_modal_form').css('display', 'block').animate({
					opacity: 1,
					top: '50%'
				}, 200);
			});
		});
		$('#zh_Allreset').on('click', function(event) {
			event.preventDefault();
			$('#zh_overlayy').fadeIn(400, function() {
				$('#zh_modal_formm').css('display', 'block').animate({
					opacity: 1,
					top: '50%'
				}, 200);
			});
		});
		$('#zh_overlay, #zh_overlayy, .zh_no, .zh_CSSok, .zh_Allok').on('click', function(event) {
			$('#zh_modal_formm, #zh_modal_form').animate({
				opacity: 0,
				top: '45%'
			}, 200, function() {
				$(this).css('display', 'none');
				$('#zh_overlayy, #zh_overlay').fadeOut(400);
			});
			if (event.target.className == 'zh_Allok') {
				$.post(ajaxurl, {
					action: 'zh_keeper',
					zh_keeper: 'delete'
				});
				location.reload();
			}
			if (event.target.className == 'zh_CSSok') {
				zh_css = '';
				save();
				location.reload();
			}
		});
	});
})(jQuery);