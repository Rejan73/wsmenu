//GESTION DES PLATS
function findAllPlat(){
	hideAll();
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 document.getElementById("divDetailPlat" ).innerHTML=generateTable("Liste des Plats", data,"findPlat","deletePlat");
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
		 data.ingredients.forEach(element => detailPlat+="<li class=\"list-group-item\" onclick=\"removeIngredientToPlat("+data.id+","+element.id+")\">"+element.nom+" : "+element.quantite+" "+element.typeMesure+"</li>");
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

function deletePlat(idPlat){
	$.ajax({
	    type: "DELETE",
	    url: "/plats/"+idPlat,
	    contentType: "application/json",
	success: function(data) {
		findAllPlat()
	  },
	error: function(data) {
		alert("Error lors de la suppression")
	  }
	});
}

function removeIngredientToPlat(idPlat,idIngredient){
	$.ajax({
	    type: "DELETE",
	    url: "/plats/"+idPlat+"/ingredients/"+idIngredient,
	    contentType: "application/json",
	success: function(data) {
		findPlat(idPlat)
	  },
	error: function(data) {
		alert("Error lors de la suppression")
	  }
	});
}



