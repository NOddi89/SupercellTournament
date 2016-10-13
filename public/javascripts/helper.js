$(document).ready(function(){

	//Toggle sidemenu
	$("#sidebar-toggle").click( function(e){
		e.preventDefault();
		$("#wrapper").toggleClass("sidebarDisplayed"); //Wrapper is in index
	});


});