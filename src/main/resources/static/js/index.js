function hideAll() {
  document.getElementById("divDetailMenu").style.visibility = "hidden";
  document.getElementById("divDetailPlat").style.visibility = "hidden";
  document.getElementById("divFormPlat").style.visibility = "hidden";
  document.getElementById("divFormMenu").style.visibility = "hidden";
  document.getElementById("divFormIngredient").style.visibility = "hidden";
  document.getElementById("divFormAddPlatToMenu").style.visibility = "hidden";
}	

function generateTable(title, data,showFunction, deleteFuncion){
	var tableGenerated="<h3>"+title+"</h3><br/><table class=\"table\"><thead><tr>";
	tableGenerated+="<th scope=\"col\">#</th>";
	tableGenerated+="<th scope=\"col\">Nom</th>";
	tableGenerated+="<th scope=\"col\">Action</th></tr></thead><tbody>";
    data.forEach(element => tableGenerated+="<tr><td>" + element.id+"</td><td>"+ element.nom+"</td><td><span class=\"fa fa-search\" onclick=\""+showFunction+"("+element.id+")\"></span> <span class=\"fa fa-eraser\" onclick=\""+deleteFuncion+"("+element.id+")\"/></td></tr>");
    tableGenerated+="</tbody></table>";
    return tableGenerated;
}