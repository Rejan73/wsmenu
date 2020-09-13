//GESTION DES PLATS
function findAllPlat2(){
	hideAll();
	$.ajax({
		 url: "/plats"
	 }).then(function(data){
		 document.getElementById("divDetailPlat" ).innerHTML=generateTable("Liste des Plats", data,"findPlat","deletePlat");
		 document.getElementById("divDetailPlat").style.visibility = "visible";
	 });
}

function findPlat2(id){
	hideAll();
	$.ajax({
		 url: "/plats/"+id
	 }).then(function(data){
		 document.getElementById("divDetailPlat" ).innerHTML=generateTable3("Détail "+data.nom, data.ingredients,"showFormIngredient","removeIngredientToPlat",data.id);
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
	return '<a target="_blank" href="http://www.google.com/calendar/event?action=TEMPLATE&dates='+dateBegin+'%2F'+dateEnd+'&text='+text+'&location='+location+'&details='+details+'">'+linktext+'</a>'
}

function callandFillPlat(eventdate) {
	console.log('callandFillPlat:'+eventdate);
	$('.events-today').html('<h5 class="text-center">No events found</h5 class="text-center">');
	searchByEvent(eventdate).then(plats => {
		  var affichePlats='';
		  for(var i= 0; i < plats.length; i++){
			  affichePlats+='<h5 class="text-center">'+plats[i].nom+' '+genereLinkGmailCalendar(eventdate,plats[i].nom,plats[i].nom,"ici","+")+'</h5><br/>';
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


//Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

