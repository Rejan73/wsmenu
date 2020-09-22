//GESTION DES PLATS
function findAllPlat(){
	clearDiv();
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 document.getElementById("divMain").innerHTML='<div class="col-sm" id="divDetailPlat" style="visibility:hidden;"></div>';
		 document.getElementById("divDetailPlat" ).innerHTML=generateTable("Liste des Plats", data,"findPlat","deletePlat");
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}

function findPlat(id){
	clearDiv();
	$.ajax({
		 url: "/plats/"+id
	 }).then(function(data){
		 document.getElementById("divMain").innerHTML='<div class="col-sm" id="divDetailPlat" style="visibility:hidden;"></div>';
		 document.getElementById("divDetailPlat" ).innerHTML=generateTable3("Détail "+data.nom, data.ingredients,"showFormIngredient","removeIngredientToPlat",data.id);
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}
function showFormIngredient(id){
	findPlat(id);
	const formIngredient=`<div class="col-sm"  id="divFormIngredient">
	  	<form id="formIngredient" class="form" onSubmit="return putIngredient()">
		  <label for="nomIngredient">Ingrédient:</label>
		  <input type="hidden" id="platid">
		  <input type="text" class="form-control" placeholder="Saissisez l'ingrédient" id="nomIngredient">
		  <label for="quantite">quantité:</label>
		  <input type="text" class="form-control" placeholder="Saisissez la quantité" id="quantite">
		  <select class="form-control" id="typeMesure">
		    <option value="g">g</option>
		    <option value="ml">ml</option>
		    <option value="u">u</option>
		  </select>
		  <button type="submit" class="btn btn-primary">Ajouter</button>
		</form>
	</div>`;
	document.getElementById("divUnderMain").innerHTML=formIngredient;
	document.getElementById("platid").value=id;

}

function putIngredient(){
	dataToSend="{ \"nom\": \""+document.getElementById("nomIngredient").value+"\",  \"quantite\":"+ document.getElementById("quantite").value+",  \"typeMesure\":\""+document.getElementById("typeMesure").value+"\"}"
	$.ajax({
	    type: "PUT",
	    url: "/plats/"+document.getElementById("platid").value,
	    contentType: "application/json",
	    data: dataToSend,
	success: function(data) {
		findPlat(document.getElementById("platid").value)
	  }
	});
	
}

function showFormPlat(){
	const formPlat = `<div class="col-sm"  id="divFormPlat">
	  	<form id="formPlat" class="form" onSubmit="return postPlat()">
		  <label for="nomPlat">Plat:</label>
		  <input type="text" class="form-control" placeholder="Saissisez le nom du plat" id="nomPlat">
		  <label for="quantite">nbPersonne:</label>
		  <input type="text" class="form-control" placeholder="Saisissez la quantité" id="nbPersonne">
		  <select class="form-control" id="typeRepas">
		    <option value="entree">entrée</option>
		    <option value="plat">plat</option>
		    <option value="dessert">dessert</option>
		  </select>
		  <button type="submit" class="btn btn-primary">Ajouter</button>
		</form>
	</div>`;
	document.getElementById("divUnderMain").innerHTML=formPlat;
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
	if (confirm("Etes-vous sûr ?")){
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
//format dateBegin : 20200901T180000Z
function genereLinkGmailCalendar(eventdate,text,details,location,linktext){
	var dateBegin=eventdate.replaceAll('-','').substring(0, 8)+'T170000Z';
	var dateEnd=eventdate.replaceAll('-','').substring(0, 8)+'T190000Z';
	var img='<img src="img/calendar.png" title="'+linktext+'" heigth="20" width="20">';
	return '<a target="_blank" href="http://www.google.com/calendar/event?action=TEMPLATE&dates='+dateBegin+'%2F'+dateEnd+'&text='+text+'&location='+location+'&details='+details+'">'+img+'</a>'
}

function callandFillPlat(eventdate) {
	console.log('callandFillPlat:'+eventdate);
	$('.events-today').html('<h5 class="text-center">No events found</h5 class="text-center">');
	searchByEvent(eventdate).then(plats => {
		  var affichePlats='';
		  for(var i= 0; i < plats.length; i++){
			  affichePlats+='<h5 class="text-center">'+plats[i].nom+' '+genereLinkGmailCalendar(eventdate,plats[i].nom,plats[i].nom,"ici","Ajouter au calendrier")+'</h5><br/>';
			}
		  $('.events-today').html(affichePlats); 
	  });
}

function  callAddEventPlat(platId,eventdate){
	console.log('callandFillPlat:'+platId+':'+eventdate);
	addEventPlat(platId,eventdate).then(plat => {
		callandFillPlat(eventdate);
	});
}

//callAnd('2020-09-01T00:00:00.000Z','2020-09-09T00:00:00.000Z')
function postSearchPlats(beginEvent,endEvent){
	beginEvent=document.getElementById("beginEvent").value+'T00:00:00.000Z';
	endEvent=document.getElementById("endEvent").value+'T00:00:00.000Z';
	searchByEvents(beginEvent,endEvent).then(plats => {
		  var affichePlats='<b>Liste des plats :</b><br>';
		  var ingredients=new Array();
		  var cptIngredient=0;
		  for(var i= 0; i < plats.length; i++){
			  for(var j= 0; j < plats[i].ingredients.length; j++){
				  ingredients[cptIngredient]=plats[i].ingredients[j];
				  cptIngredient++;
			  }
			  affichePlats+=plats[i].nom+'<br>';
			}
		  affichePlats+='<b>Liste des courses :</b><br>';
		  for (var i=0;i<ingredients.length;i++){
			  affichePlats+=ingredients[i].quantite+ingredients[i].typeMesure +' '+ ingredients[i].nom+'<br>'; 
		  }
		  document.getElementById("divUnderMain").innerHTML=affichePlats; 
	  });
}

function showMenuSemaine(){
	const formPlat = `<div class="col-sm"  id="divFormPlat">
	  	<form id="formMenuSemaine" class="form" onSubmit="return postSearchPlats()">
		  <label for="dateDebut">Date début:</label>
		  <input type="date" class="form-control" placeholder="Saissisez la date de debut" id="beginEvent">
		  <label for="dateFin">Date de fin :</label>
		  <input type="date" class="form-control" placeholder="Saisissez la date de fin" id="endEvent">
		  <button type="submit" class="btn btn-primary">Rechercher</button>
		</form>
	</div>`;
	document.getElementById("divMain").innerHTML=formPlat;
}
