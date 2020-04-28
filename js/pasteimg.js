// Created by STRd6
// MIT License
// jquery.paste_image_reader.js
(function($) {
	var defaults;
	$.event.fix = (function(originalFix) {
		return function(event) {
			event = originalFix.apply(this, arguments);
			if (event.type.indexOf("copy") === 0 || event.type.indexOf("paste") === 0) {
				event.clipboardData = event.originalEvent.clipboardData;
			}
			return event;
		};
	})($.event.fix);
	defaults = {
		callback: $.noop,
		matchType: /image.*/
	};
	return ($.fn.pasteImageReader = function(options) {
		if (typeof options === "function") {
			options = {
				callback: options
			};
		}
		options = $.extend({}, defaults, options);
		return this.each(function() {
			var $this, element;
			element = this;
			$this = $(this);
			return $this.bind("paste", function(event) {
				var clipboardData, found;
				found = false;
				clipboardData = event.clipboardData;
				return Array.prototype.forEach.call(clipboardData.types, function(type, i) {
					var file, reader;
					if (found) {
						return;
					}
					if (
						type.match(options.matchType) ||
						clipboardData.items[i].type.match(options.matchType)
					) {
						file = clipboardData.items[i].getAsFile();
						reader = new FileReader();
						reader.onload = function(evt) {
							return options.callback.call(element, {
								dataURL: evt.target.result,
								event: evt,
								file: file,
								name: file.name
							});
						};
						reader.readAsDataURL(file);
						return (found = true);
					}
				});
			});
		});
	});
})(jQuery);

$("#paste-img").click(function(event) {
    $(this).addClass("selected");
    event.stopImmediatePropagation();
});

$("html").click(function() {
    $("#paste-img").removeClass("selected");
});

$("#paste-img").pasteImageReader(function(results) {
	filename = results.filename, dataURL = results.dataURL;
	var img = document.createElement("img");
	img.src = dataURL;
    var selectedPasteImg = $("#paste-img.selected");
    if (selectedPasteImg.length > 0) {
        selectedPasteImg
            .css({
                backgroundImage: "url(" + dataURL + ")"
            });
        $("#img-placeholder").addClass("hide");
    }
});

$("#paste-img").mouseover(function() {
    $("#img-tooltip").addClass("show");
});

$("#paste-img").mouseout(function() {
    $("#img-tooltip").removeClass("show");
});


$("html").keyup(function(e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        var selectedPasteImg = $("#paste-img.selected");
        if (selectedPasteImg.length > 0) {
            selectedPasteImg
                .css({
                    backgroundImage: "none"
                });
            $("#img-placeholder").removeClass("hide");
        }
    }
});