//dimension of cubes algorithm
function getDim(level)
{
	return 75/level;
}

//color generator
function randomColor(callback)
{
	chrome.storage.sync.get('palette', function(val) {
		$.getJSON('colors.json', function(data) {		
			var palette = data.colors[val['palette']].palette;
			var num = Math.floor(Math.random() * palette.length);
			callback(palette[num]);
		});
	});
}

//add color and dimention to cells
function beautifyCharacter(dim)
{
	$.each($('td'), function(key,val) {
		randomColor( function(color) {
			$(val).css( {"background-color":color,"width":dim, "height":dim});
		});
	});
}

function constructTable(level)
{
	if(level == 1)
		$('<tr><td></td></tr>').appendTo('#character');
	else if(level == 2)
		$('<tr><td></td><td></td></tr>').appendTo('#character');
	else if (level != 0)
	{
		for(var i = 0; i < level; i++)
		{
			$('<tr></tr>').appendTo('#character');
			for(var j = 0; j < level; j++)
			{
				$('<td></td>').appendTo('#character tr:last-child');
			}
		}
	}
}

function createCharacter(exp)
{
	var level = getLevel(exp);
	$('#exp').text(exp);
	$('#level').text(level);
	constructTable(level);
	var dim = getDim(level);
	beautifyCharacter(dim);
	var progress = getProgress(exp) + "%";
	$('.progress-bar').css("width",progress).text(progress);
}
//Level Algorithm Floor[Log(EXP)] == Level
function getLevel(exp) {
	if(exp == 0)
		return 0;
	return Math.floor(Math.log(exp));
}

//used for find % of progess bar
function getProgress(exp) {
	if(exp == 0)
		return 0;
	var level = getLevel(exp);
	var expFromPrevLevel = Math.exp(level);
	var expRequired = Math.exp(level+1);
	var progress = (exp - expFromPrevLevel)/(expRequired - expFromPrevLevel);
	return Math.floor(progress*100);
}

function init() {
	chrome.storage.sync.get('exp', function(value) {
		var exp = value['exp'];
		if(!exp)
			exp = 0;
		createCharacter(exp);
	});
}

$(document).ready(function() {
	init();
});