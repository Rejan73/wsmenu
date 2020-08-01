//GESTION DES MENUS
function findMenu(id){
	 hideAll();
	 $.ajax({
		 url: "/menus/"+id
	 }).then(function(data){
		 var detailMenu="<h3>Détail "+data.nom+"</h3>";
		 detailMenu+="<a href=\"#\" onclick=\"showFormAjoutPlat("+data.id+")\">Ajouter un plat</a>";
		 detailMenu+="<br/><a href=\"#\" onclick=\"findIngredientsByMenu("+data.id+")\">Courses à faire</a>";
		
		 var detailPlat="<h3>Liste des plats </h3><ul class=\"list-group\">";
		 data.plats.forEach(element => detailPlat+="<li class=\"list-group-item\">"+element.nom+"</li>");
		 detailPlat+="</ul>";

		 document.getElementById("divDetailMenu").innerHTML=detailMenu;
		 document.getElementById("divDetailMenu").style.visibility = "visible";
		 document.getElementById("divDetailPlat").innerHTML=detailPlat;
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}

function findAllMenu(){
	hideAll();
	$.ajax({
		 url: "/menus"
	 }).then(function(data){
		 var detailMenu="<h3>Liste des Menus : </h3><br/><ul class=\"list-group\">";
		 data.forEach(element => detailMenu+="<li class=\"list-group-item\" onclick=\"findMenu("+element.id+")\">"+ element.nom+"</li>");
		 detailMenu+="</ul>";
		 
		 document.getElementById("divDetailMenu" ).innerHTML=detailMenu;
		 document.getElementById("divDetailMenu").style.visibility = "visible";
	 });	
	
}

function showFormMenu(){
	findAllMenu();
	document.getElementById("divFormMenu").style.visibility = "visible";
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
	document.getElementById("divFormAddPlatToMenu").style.visibility = "hidden";
	 $.ajax({
		 url: "/menus/"+id+"/ingredients"
	 }).then(function(data){
		 var detailPlat="<h3>Liste ingredients : </h3><br/><ul class=\"list-group\">";
		 data.forEach(element => detailPlat+="<li class=\"list-group-item\">"+element.nom+" : "+ element.quantite+element.typeMesure+"</li>");
		 detailPlat+="</ul>";
		 
		 document.getElementById("divDetailPlat").innerHTML=detailPlat;
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}

function showFormAjoutPlat(idMenu){
	findMenu(idMenu);
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 var formAddPlatToMenu="<h3>Liste des Plats à ajouter : </h3><br/><ul class=\"list-group\">";
		 data.forEach(element => formAddPlatToMenu+="<li class=\"list-group-item\" onclick=\"addPlatToMenu("+idMenu+","+element.id+")\">"+ element.nom+"</li>");
		 formAddPlatToMenu+="</ul>";
		 
		 document.getElementById("divFormAddPlatToMenu" ).innerHTML=formAddPlatToMenu;
		 document.getElementById("divFormAddPlatToMenu").style.visibility = "visible";
	 });	
}

//GESTION DES PLATS
function findAllPlat(){
	hideAll();
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 var detailPlat="<h3>Liste des Plats : </h3><br/><ul class=\"list-group\">";
		 data.forEach(element => detailPlat+="<li class=\"list-group-item\" onclick=\"findPlat("+element.id+")\">"+ element.nom+"</li>");
		 detailPlat+="</ul>";
		 
		 document.getElementById("divDetailPlat" ).innerHTML=detailPlat;
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}

function findPlat(id){
	hideAll();
	$.ajax({
		 url: "/plats/"+id
	 }).then(function(data){
		 var detailPlat="<h3>Détail "+data.nom+"</h3><br/>";
		 detailPlat+="<a href=\"#\" onclick=\"showFormIngredient("+data.id+")\">Ajouter un ingrédient</a>";
		 detailPlat+="<br><ul class=\"list-group\">";
		 data.ingredients.forEach(element => detailPlat+="<li class=\"list-group-item\">"+element.nom+" : "+element.quantite+" "+element.typeMesure+"</li>");
		 detailPlat+="</ul>";
		 
		 document.getElementById("divDetailPlat" ).innerHTML=detailPlat;
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}
function showFormIngredient(id){
	findPlat(id);
	document.getElementById("platid").value=id;
	document.getElementById("divFormIngredient").style.visibility = "visible";
}

function putIngredient(){
	dataToSend="{ \"nom\": \""+document.getElementById("nomIngredient").value+"\",  \"quantite\":"+ document.getElementById("quantite").value+",  \"typeMesure\":\""+document.getElementById("typeMesure").value+"\"}"
	$.ajax({
	    type: "PUT",
	    url: "/plats/"+document.getElementById("platid").value,
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		document.getElementById("divFormIngredient").style.visibility = "hidden";
		findPlat(document.getElementById("platid").value)
	  }
	});
	
}

function showFormPlat(){
	findAllPlat();
	document.getElementById("divFormPlat").style.visibility = "visible";
}

function postPlat(){
	dataToSend="{ \"nom\": \""+document.getElementById("nomPlat").value+"\",  \"nbPersonne\":"+ document.getElementById("nbPersonne").value+",  \"typerepas\":\""+document.getElementById("typeRepas").value+"\"}"
	$.ajax({
	    type: "POST",
	    url: "/plats/",
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		findAllPlat();
	  }
	});
}





function hideAll() {
  document.getElementById("divDetailMenu").style.visibility = "hidden";
  document.getElementById("divDetailPlat").style.visibility = "hidden";
  document.getElementById("divFormPlat").style.visibility = "hidden";
  document.getElementById("divFormMenu").style.visibility = "hidden";
  document.getElementById("divFormIngredient").style.visibility = "hidden";
  document.getElementById("divFormAddPlatToMenu").style.visibility = "hidden";
}	

