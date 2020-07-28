
function findMenu(id){
	 $.ajax({
		 url: "/menus/"+id
	 }).then(function(data){
		 var msg="";
		 data.plats.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+"</li>");
		 document.getElementById("detail").innerHTML="Détail "+data.nom+"<br><ul class=\"list-group\">"+msg+"</ul>";
	 });
}

function findAllMenu(){
	$.ajax({
		 url: "/menus"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"findMenu("+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("resume" ).innerHTML="Liste des Menus : <br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").innerHTML="";
	 });	
	
}

function findAllPlat(){
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"findPlat("+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("resume" ).innerHTML="Liste des Plats : <br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").innerHTML="";
	 });
}

function findPlat(id){
	$.ajax({
		 url: "/plats/"+id
	 }).then(function(data){
		 var msg="";
		 data.ingredients.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+" : "+element.quantite+" "+element.typeMesure+"</li>");
		 document.getElementById("detail" ).innerHTML="Détail "+data.nom+"<a href=\"#\" onclick=\"showFormIngredient("+data.id+")\">+</a><br><ul class=\"list-group\">"+msg+"</ul>";
	 });
}
function showFormIngredient(id){
	document.getElementById("platid").value=id;
	document.getElementById("formIngredient").style.visibility = "visible";
}

function putIngredient(){
	dataToSend="{ \"nom\": \""+document.getElementById("nomIngredient").value+"\",  \"quantite\":"+ document.getElementById("quantite").value+",  \"typeMesure\":\""+document.getElementById("typeMesure").value+"\"}"
	$.ajax({
	    type: "PUT",
	    url: "/plats/"+document.getElementById("platid").value,
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		document.getElementById("formIngredient").style.visibility = "hidden";
		findPlat(document.getElementById("platid").value)
	  }
	});
	
}

function showFormPlat(){
	document.getElementById("formPlat").style.visibility = "visible";
}

function postPlat(){
	dataToSend="{ \"nom\": \""+document.getElementById("nomPlat").value+"\",  \"nbPersonne\":"+ document.getElementById("nbPersonne").value+",  \"typerepas\":\""+document.getElementById("typeRepas").value+"\"}"
	$.ajax({
	    type: "POST",
	    url: "/plats/",
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		hideAll();
		findAllPlat();
	  }
	});
	
}

function hideAll() {
  document.getElementById("formPlat").style.visibility = "hidden";
  document.getElementById("formIngredient").style.visibility = "hidden";
}	

