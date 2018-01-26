$('#connect').click(function(){
	var name = $('#name').val();
	if(name == "")
		window.location = window.location + "chat";
	else
		window.location = window.location + "chat?name="+encodeURI(name.trim());
	return false;
});