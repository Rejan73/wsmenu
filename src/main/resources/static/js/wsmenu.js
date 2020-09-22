async function getAllPlat(){
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



async function getPlat(id) {
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

async function deleteEventPlat(platId,instant) {
	 return fetch('/plats/'+platId+'/events',{
	    method: 'DELETE', 
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



//ex "2020-09-09T18:01:53.515Z"
async function searchByEvents(beginEvent,endEvent) {
	 var eventSearch='{"beginEvent":"'+beginEvent+'","endEvent":"'+endEvent+'"}';
	 return fetch('/plats/events',{
	    method: 'POST', // *GET, POST, PUT, DELETE, etc.
	    headers: {
	        'Content-Type': 'application/json'
	      },
	    body: eventSearch
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