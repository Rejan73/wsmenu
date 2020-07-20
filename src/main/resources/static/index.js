$(document).ready(function(){
 $.ajax({
	 url: "/menus/1"
 }).then(function(data){
	 $('.greeting-id').append(data.id);
	 $('.greeting-content').append(data.nom);
 });
});