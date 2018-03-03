$(document).ready(function(){
let PROXY_URL = "https://cors-anywhere.herokuapp.com/"
let API_KEY = "7d9dc0b15e54938abf5a39e678";
let token = `?token=${API_KEY}`;
let API_URL = `http://api.dirble.com/v2/stations/recent?token=7d9dc0b15e54938abf5a39e678`;
let $albumArt = $('#album_art');
let $station = $('#station');
let $desc = $('#desc');
let $stationURL = $('#station_url');


$.get(PROXY_URL+API_URL, function(data){
	console.log(data);
	
	String.prototype.capitalizeDesc = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	let description = data[1].categories[0].description;
	$albumArt.css('background-image',`url(${data[1].image.url})`)
	$station.html(data[1].name);
	$desc.html(description.capitalizeDesc());
	$stationURL.html(`<a href="${data[1].website}">Visit us @${data[1].name}</a>`);



    let playStation = new Audio(`${data[1].streams[0].stream}`);
    playStation.play();

});


});