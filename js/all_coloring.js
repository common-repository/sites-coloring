(function($) {
	$(document).ready(function($) {
		var zh_keeper; var zh_css = []; var zh_css_=[];
		$.post(ajaxurl, {
				action: 'zh_keeper'
			}, function(data) {
			if (data != '') {
				zh_keeper = data.split('^!^');
				zh_css = zh_keeper[4].split(',');
				$.each(zh_css, function(i) {
					zh_css_ = zh_css[i].split(' ');
					if (zh_css_[0] === 'a') {
						$(zh_css_[0]).not('#wpadminbar *').css({
							'background-color': zh_css_[1]+'00', 
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
			$('body').fadeTo(200, 1, 'linear');
		});
	});
})(jQuery);