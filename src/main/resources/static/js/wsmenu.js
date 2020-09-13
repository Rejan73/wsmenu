async function findAllPlat(){
	 return fetch('/plats')
	 .then((response) => {
	   if(response.ok) {
	     return response.json();
	   } else {
	     throw new Error('Server response wasn\'t OK');
	   }
	 })
	 .then((plats) => { return plats;  });
}



async function findPlat(id) {
	 return fetch('/plats/'+id)
	 .then((response) => {
	   if(response.ok) {
	     return response.json();
	   } else {
	     throw new Error('Server response wasn\'t OK');
	   }
	 })
	 .then((plat) => { return plat;  });
}

//ex "2020-09-09T18:01:53.515Z"
async function searchByEvent(instant) {
	 return fetch('/plats/event',{
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    headers: {
	        'Content-Type': 'application/json'
	      },
	    body: JSON.stringify(instant)
	 })
	 .then((response) => {
	   if(response.ok) {
	     return response.json();
	   } else {
	     throw new Error('Server response wasn\'t OK');
	   }
	 })
	 .then((plats) => { return plats;  });
}

async function addEventPlat(platId,instant) {
	 return fetch('/plats/'+platId+'/events',{
	    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
	    headers: {
	        'Content-Type': 'application/json'
	      },
	    body: JSON.stringify(instant)
	 })
	 .then((response) => {
	   if(response.ok) {
	     return response.json();
	   } else {
	     throw new Error('Server response wasn\'t OK');
	   }
	 })
	 .then((plat) => { return plat;  });
}
