package rod.menu.rest;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import rod.menu.model.EventSearch;
import rod.menu.model.Ingredient;
import rod.menu.model.Personne;
import rod.menu.model.Plat;
import rod.menu.repository.IngredientRepository;
import rod.menu.repository.PersonneRepository;

@RestController
public class PersonneEndPoint {
	@Autowired
	PersonneRepository personneRepository;
	
	@Autowired
	IngredientRepository ingredientRepository;
	
	@PostMapping("/personnes")
	public ResponseEntity<Personne> create(	@RequestBody Personne personne){
		
		Personne createdPersonne = personneRepository.save(personne);
		
		return new ResponseEntity<>(createdPersonne, HttpStatus.CREATED);
	}
	
	@GetMapping("/personnes/{personneId}")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public ResponseEntity<Personne> findById(@PathVariable Long personneId){

		Optional<Personne> personne = personneRepository.findById(personneId);
		if (personne.isPresent()) {
			return new ResponseEntity<>(personne.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/personnes")
	public ResponseEntity<List<Personne>> findPersonnes(){

		List<Personne> personnes = personneRepository.findAll();
		if (personnes.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
		return new ResponseEntity<>(personnes, HttpStatus.OK);
	}
	
	@DeleteMapping("/personnes/{id}")
	public ResponseEntity<HttpStatus> deletePersonne(@PathVariable("id") long id) {
		try {
			personneRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	
}
