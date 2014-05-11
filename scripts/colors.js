function init() {
	$.getJSON('colors.json', function(data) {
		var colors = data.colors;
		console.log(colors);
		for(palette in colors)
		{
			console.log(colors[palette].desc);
			$('<li paletteID="'+palette+'"><table><tr></tr></table><p>'+colors[palette].desc+'</p></li>').appendTo('#palettes');
			var palette = colors[palette].palette;
			for(color in palette)
			{
				console.log('<td style="background-color:'+palette[color]+'"></td>');
				$('<td style="background-color:'+palette[color]+';"></td>').appendTo('#palettes li:last-child tr');
			}
			$('#palettes li tr:last-child td').css({"width": function() {
				return 100/palette.length;
			},"height":30});
		}
		bindPaletteClick();
	});
}

function bindPaletteClick() {
	$('li').click(function() {
		var id = $(this).attr('paletteid');
		chrome.storage.sync.set({'palette':id}, function() {
			chrome.runtime.reload();
		});
	});
}
$(document).ready(function() {
	init();
	
});