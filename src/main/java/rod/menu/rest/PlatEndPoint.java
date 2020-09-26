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
import rod.menu.model.Plat;
import rod.menu.repository.IngredientRepository;
import rod.menu.repository.PlatRepository;

@RestController
public class PlatEndPoint {
	@Autowired
	PlatRepository platRepository;
	
	@Autowired
	IngredientRepository ingredientRepository;
	
	@PostMapping("/plats")
	public ResponseEntity<Plat> createPlat(@RequestBody Plat plat){
		
		Plat platToSave=new Plat();
		platToSave.setNom(plat.getNom().toLowerCase());
		Plat createdPlat = platRepository.save(platToSave);
		if (plat.getIngredients()!=null) {
			for (Ingredient ingredient : plat.getIngredients()) {
				ingredient.setPlat(createdPlat);
				ingredient.setNom(ingredient.getNom().toLowerCase());
				Ingredient createdIngredient= ingredientRepository.save(ingredient);
				ingredient.setId(createdIngredient.getId());
			}
			createdPlat.setIngredients(plat.getIngredients());
		}
		return new ResponseEntity<>(createdPlat, HttpStatus.CREATED);
	}

	@PutMapping("/plats/{platId}")
	public ResponseEntity<Plat> updatePlat(@PathVariable Long platId, @RequestBody Ingredient ingredient){
		
		Optional<Plat> plat = platRepository.findById(platId);
		if (plat.isPresent()) {
			Plat platToUpdate=plat.get();
			ingredient.setPlat(platToUpdate);
			Ingredient createdIngredient= ingredientRepository.save(ingredient);
			platToUpdate.getIngredients().add(createdIngredient);
			return new ResponseEntity<>(platRepository.save(platToUpdate), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PutMapping("/plats/{platId}/events")
	public ResponseEntity<Plat> addEventPlat(@PathVariable Long platId, @RequestBody Instant event){
		
		Optional<Plat> plat = platRepository.findById(platId);
		if (plat.isPresent()) {
			Plat platToUpdate=plat.get();
			if (platToUpdate.getEvents()==null) {
				platToUpdate.setEvents(new ArrayList<Instant>());
			}
			platToUpdate.getEvents().add(event);
			return new ResponseEntity<>(platRepository.save(platToUpdate), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/plats/{platId}")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public ResponseEntity<Plat> findById(@PathVariable Long platId){

		Optional<Plat> plat = platRepository.findById(platId);
		if (plat.isPresent()) {
			return new ResponseEntity<>(plat.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/plats")
	public ResponseEntity<List<Plat>> findPlats(){

		List<Plat> plats = platRepository.findAll();
		if (plats.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
		return new ResponseEntity<>(plats, HttpStatus.OK);
	}
	
	@PostMapping("/plats/event")
	public ResponseEntity<List<Plat>> searchByEvent(@RequestBody Instant instant){
		List<Plat> plats = platRepository.findByEventsContains(instant);
		if (plats.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
		return new ResponseEntity<>(plats, HttpStatus.OK);
	}
	
	@PostMapping("/plats/events")
	public ResponseEntity<List<Plat>> searchByEvents(@RequestBody EventSearch eventSearch){
		List<Plat> plats = platRepository.findByEventsBetween(eventSearch.getBeginEvent(), eventSearch.getEndEvent());
		if (plats.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
		return new ResponseEntity<>(plats, HttpStatus.OK);
	}
	
	@DeleteMapping("/plats/{id}")
	public ResponseEntity<HttpStatus> deletePlat(@PathVariable("id") long id) {
		try {
			platRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

	@DeleteMapping("/plats/{idPlat}/ingredients/{idIngredient}")
	public ResponseEntity<HttpStatus> removeIngredient(@PathVariable long idPlat,@PathVariable long idIngredient) {
		try {
			Optional<Plat> plat = platRepository.findById(idPlat);
			Optional<Ingredient> ingredientToDelete = ingredientRepository.findById(idIngredient);
			if (plat.isPresent() && ingredientToDelete.isPresent()) {
				plat.get().getIngredients().remove(ingredientToDelete.get());
				platRepository.save(plat.get());
				ingredientRepository.delete(ingredientToDelete.get());
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@DeleteMapping("/plats/{idPlat}/events")
	public ResponseEntity<HttpStatus> removePlatEvent(@PathVariable long idPlat,@RequestBody Instant instantToRemove) {
		try {
			Optional<Plat> plat = platRepository.findById(idPlat);
			if (plat.isPresent() ) {
				plat.get().getEvents().remove(instantToRemove);
				platRepository.save(plat.get());
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
