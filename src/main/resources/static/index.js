
function findMenu(id){
	 $.ajax({
		 url: "/menus/"+id
	 }).then(function(data){
		 var msg="";
		 data.plats.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+"</li>");
		 document.getElementById("detail").innerHTML=data.nom+"<br><ul class=\"list-group\">"+msg+"</ul>";
	 });
}

function findAllMenu(){
	$.ajax({
		 url: "/menus"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"findMenu("+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("resume" ).innerHTML="<ul class=\"list-group\">"+msg+"</ul>";
	 });	
	
}

function findAllPlat(){
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"findPlat("+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("resume" ).innerHTML="<ul class=\"list-group\">"+msg+"</ul>";
	 });
}

function findPlat(id){
	$.ajax({
		 url: "/plats/"+id
	 }).then(function(data){
		 var msg="";
		 data.ingredients.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+" : "+element.quantite+" "+element.typeMesure+"</li>");
		 document.getElementById("detail" ).innerHTML=data.nom+"<br><ul class=\"list-group\">"+msg+"</ul>";
	 });
}