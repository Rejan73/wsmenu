//GESTION DES MENUS
function findMenu(id){
	 hideAll();
	 $.ajax({
		 url: "/menus/"+id
	 }).then(function(data){
		 var msg="";
		 data.plats.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+"</li>");
		 document.getElementById("detail").innerHTML="Détail "+data.nom+"<br/><a href=\"#\" onclick=\"showFormAjoutPlat("+data.id+")\">Ajouter un plat</a><a href=\"#\" onclick=\"findIngredientsByMenu("+data.id+")\"><br/>Courses à faire</a><br/><br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").style.visibility = "visible";
	 });
}

function findAllMenu(){
	hideAll();
	$.ajax({
		 url: "/menus"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"findMenu("+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("detail" ).innerHTML="Liste des Menus : <br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").style.visibility = "visible";
	 });	
	
}

function showFormMenu(){
	document.getElementById("formMenu").style.visibility = "visible";
}

function postMenu(){
	dataToSend=document.getElementById("nomMenu").value
	$.ajax({
	    type: "POST",
	    url: "/menus/",
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		hideAll();
		findAllMenu();
	  }
	});
}

function addPlatToMenu(idMenu,idPlat){
	dataToSend="\""+idPlat+"\""
	$.ajax({
	    type: "PUT",
	    url: "/menus/"+idMenu,
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		findMenu(idMenu);
	  }
	});
}


function findIngredientsByMenu(id){
	 hideAll();
	 $.ajax({
		 url: "/menus/"+id+"/ingredients"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+" : "+ element.quantite+element.typeMesure+"</li>");
		 document.getElementById("detail").innerHTML="Liste ingredients : <br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").style.visibility = "visible";
	 });
}

//GESTION DES PLATS
function findAllPlat(){
	hideAll();
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"findPlat("+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("detail" ).innerHTML="Liste des Plats : <br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").style.visibility = "visible";
	 });
}

function findPlat(id){
	hideAll();
	$.ajax({
		 url: "/plats/"+id
	 }).then(function(data){
		 var msg="";
		 data.ingredients.forEach(element => msg+="<li class=\"list-group-item\">"+element.nom+" : "+element.quantite+" "+element.typeMesure+"</li>");
		 document.getElementById("detail" ).innerHTML="Détail "+data.nom+"<a href=\"#\" onclick=\"showFormIngredient("+data.id+")\">+</a><br><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("detail").style.visibility = "visible";
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

function showFormAjoutPlat(idMenu){
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 var msg="";
		 data.forEach(element => msg+="<li class=\"list-group-item\" onclick=\"addPlatToMenu("+idMenu+","+element.id+")\">"+ element.nom+"</li>");
		 document.getElementById("formAddPlatToMenu" ).innerHTML="Liste des Plats : <br/><ul class=\"list-group\">"+msg+"</ul>";
		 document.getElementById("formAddPlatToMenu").style.visibility = "visible";
	 });	
}



function hideAll() {
  document.getElementById("detail").style.visibility = "hidden";
  document.getElementById("formPlat").style.visibility = "hidden";
  document.getElementById("formMenu").style.visibility = "hidden";
  document.getElementById("formIngredient").style.visibility = "hidden";
  document.getElementById("formAddPlatToMenu").style.visibility = "hidden";
}	

