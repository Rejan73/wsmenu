//GESTION DES MENUS
function findMenu(id){
	 clearDiv();
	 $.ajax({
		 url: "/menus/"+id
	 }).then(function(data){
		 var detailMenu="<h3>Détail "+data.nom+"</h3>";
		 detailMenu+="<a href=\"#\" onclick=\"showFormAjoutPlat("+data.id+")\"><span class=\"fa fa-plus\"></span> Ajouter un plat</a>";
		 detailMenu+="<br/><a href=\"#\" onclick=\"findIngredientsByMenu("+data.id+")\"><span class=\"fa fa-search\"></span> Courses à faire</a>";
		
		 document.getElementById("divMain").innerHTML='<div class="col-sm" id="divDetailMenu"></div>';
		 document.getElementById("divDetailMenu").innerHTML=detailMenu;
		 document.getElementById("divDetailMenu").style.visibility = "visible";
		 document.getElementById("divDetailPlat" ).innerHTML=generateTable2("Liste des plats", data.plats,"findPlat","removePlatToMenu",data.id);
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}

function findAllMenu(){
	clearDiv();
	$.ajax({
		 url: "/menus"
	 }).then(function(data){
		 document.getElementById("divMain").innerHTML='<div class="col-sm" id="divDetailMenu"></div>';
		 document.getElementById("divDetailMenu" ).innerHTML=generateTable("Liste des Menus", data,"findMenu","deleteMenu");
		 document.getElementById("divDetailMenu").style.visibility = "visible";
	 });	
	
}

function showFormMenu(){
	const formMenu = `<div class="col-sm" id="divFormMenu"><form id="formMenu" class="form" onSubmit="return postMenu()">
		  <label for="nomMenu">Menu:</label>
		  <input type="text" class="form-control" placeholder="Saissisez le nom du menu" id="nomMenu">
		  <button type="submit" class="btn btn-primary">Ajouter</button>
		</form></div>`;
	document.getElementById("divUnderMain").innerHTML=formMenu;
}

function postMenu(){
	dataToSend=document.getElementById("nomMenu").value
	$.ajax({
	    type: "POST",
	    url: "/menus/",
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		clearDiv();
		findAllMenu();
	  }
	});
}

function addPlatToMenu(idMenu,idPlat){
	$.ajax({
	    type: "PUT",
	    url: "/menus/"+idMenu+"/plats/"+idPlat,
	    contentType: "application/json",
	success: function(data) {
		findMenu(idMenu);
	  }
	});
}
function removePlatToMenu(idMenu,idPlat){
	if (confirm("Etes-vous sûr ?")){
		$.ajax({
	      type: "DELETE",
	      url: "/menus/"+idMenu+"/plats/"+idPlat,
	      contentType: "application/json",
		success: function(data) {
			findMenu(idMenu);
		  },
			error: function(data) {
				alert("Error lors de la suppression")
			  }
		});
	}
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

function deleteMenu(idMenu){
	if (confirm("Etes-vous sûr ?")){
		$.ajax({
		    type: "DELETE",
		    url: "/menus/"+idMenu,
		    contentType: "application/json",
	
		success: function(data) {
			findAllMenu()
		  },
		error: function(data) {
			alert("Error lors de la suppression")
		  }
		});
	}
}

