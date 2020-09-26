function clearDiv() {
  document.getElementById("divMain").innerHTML= "";
  document.getElementById("divUnderMain").innerHTML= "";
}	

function generateTable(title, data,showFunction, deleteFuncion){
	var tableGenerated="<h3>"+title+"</h3><br/><table class=\"table table-striped\" ><thead><tr>";
	tableGenerated+="<th scope=\"col\">#</th>";
	tableGenerated+="<th scope=\"col\">Plat</th>";
	tableGenerated+="<th scope=\"col\">Action</th></tr></thead><tbody>";
    data.forEach(element => tableGenerated+="<tr><td>" + element.id+"</td><td>"+ element.nom+'</td><td><img src="bootstrap-icons-1.0.0/search.svg" onclick="'+showFunction+'('+element.id+')" /> <img src="bootstrap-icons-1.0.0/x.svg" onclick="'+deleteFuncion+'('+element.id+')"/></td></tr>');
    tableGenerated+="</tbody></table>";
    return tableGenerated;
}

function generateTable2(title, data,showFunction, deleteFuncion, selectedDataId){
	var tableGenerated="<h3>"+title+"</h3><br/><table class=\"table table-striped\" ><thead><tr>";
	tableGenerated+="<th scope=\"col\">#</th>";
	tableGenerated+="<th scope=\"col\">Nom</th>";
	tableGenerated+="<th scope=\"col\">Action</th></tr></thead><tbody>";
    data.forEach(element => tableGenerated+="<tr><td>" + element.id+"</td><td>"+ element.nom+"</td><td><img src=\"bootstrap-icons-1.0.0/search.svg\"  onclick=\""+showFunction+"("+element.id+")\"/> <img src=\"bootstrap-icons-1.0.0/x.svg\" onclick=\""+deleteFuncion+"("+selectedDataId+","+element.id+")\"/></td></tr>");
    tableGenerated+="</tbody></table>";
    return tableGenerated;
}

function generateTable3(title, data,addFunction, deleteFuncion, selectedDataId){
	var tableGenerated="<h3>"+title+"</h3><br/>"
	tableGenerated+="<a href=\"#\" onclick=\"showFormIngredient("+selectedDataId+")\"><img src=\"bootstrap-icons-1.0.0/bag-plus.svg\"> Ajouter un ingrédient</a><br/>";
	tableGenerated+="<table class=\"table table-striped\" ><thead><tr><th scope=\"col\">#</th>";
	tableGenerated+="<th scope=\"col\">Nom</th>";
	tableGenerated+="<th scope=\"col\">Action</th></tr></thead><tbody>";
    data.forEach(element => tableGenerated+="<tr><td>" + element.id+"</td><td>"+ element.nom+"</td><td><img src=\"bootstrap-icons-1.0.0/x.svg\" onclick=\""+deleteFuncion+"("+selectedDataId+","+element.id+")\"/></td></tr>");
    tableGenerated+="</tbody></table>";
    return tableGenerated;
}
