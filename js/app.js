$(document).ready(function(){
let PROXY_URL = "https://cors-anywhere.herokuapp.com/"
let API_KEY = "7d9dc0b15e54938abf5a39e678";
let token = `?token=${API_KEY}`;
let API_URL = `http://api.dirble.com/v2/stations/recent?token=7d9dc0b15e54938abf5a39e678`;
let $albumArt = $('#album_art');
let $station = $('#station');
let $desc = $('#desc');
let $stationURL = $('#station_url');
let $pause = $('#pause');
let $play = $('#play');
let $reverse = $('#reverse');
let $forward = $('#forward');
let stationIndex = 9;
let stationLength = 0;
let canvas, ctx, source, context, analyser,fbc_array,bars,bar_x, bar__width, bar_height;

$play.hide();

$.get(PROXY_URL+API_URL, function(data){
	
	String.prototype.capitalizeDesc = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	String.prototype.hasBreak = function(){
		return this.replace(/\r?\n|\r/gm,"");
	}
	let stream = data[stationIndex].streams[0].stream;
	let audio = new Audio();
	audio.src = stream.hasBreak();

	audio.play();

	function updateStation(i){

			let description = data[stationIndex].categories[0].description;
			let stationLength = data.length;
			if (stationIndex >= 20) {
				stationIndex = 0;
			}
			if (stationIndex < 0) {
				stationIndex = 19;
			}

			$albumArt.css('background-image',`url(${data[stationIndex].image.url})`)
			$station.html(data[stationIndex].name);
			$desc.html(description.capitalizeDesc());
			$stationURL.html(`<a href="${data[stationIndex].website}">Visit us @${data[stationIndex].name}</a>`);
	}

	updateStation(stationIndex);

	$forward.click(function(){
  		audio.src = '';
  		stationIndex++;
  		updateStation(stationIndex)
  		console.log(stationIndex);
  		let streamUpdate = data[stationIndex].streams[0].stream;
  		streamUpdate = streamUpdate.hasBreak();
  		audio.src = streamUpdate;
  		audio.play();	
  });
  $reverse.click(function(){
  		audio.src = '';
  		stationIndex--;
  		updateStation(stationIndex)
  		console.log(stationIndex);
  		let streamUpdate = data[stationIndex].streams[0].stream;
  		streamUpdate = streamUpdate.hasBreak();
  		audio.src = streamUpdate;
  		audio.play();	
  });
  $pause.click(function(){
  		audio.pause();	
  		$pause.hide();
  		$play.show();
  });
  $play.click(function(){
  		audio.play();
  		$play.hide();
  		$pause.show();
  });

});
});