
var socket = io();
var params = {};

if (location.search) {
	// Magic for getting GET request from URL :DDD
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

var name;
if(params.name != null && params.name != "" && params.name != true)
{
	name = decodeURI(params.name.trim());
}
else
{
	name = "Anonymous";
}

$('form').submit( function(){ 
	if($('#m').val().trim() == "") return false;
	
	socket.emit('chat message', name + " : " + $('#m').val()); 
	$('#m').val('');
	return false;
});
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
	window.scrollTo(0, document.body.scrollHeight);
});

$(document).ready(function(){
	socket.emit('chat message', name + " just connected");
});

$(window).bind('beforeunload', function(){
	socket.emit('chat message', name + " just disconnected");
});