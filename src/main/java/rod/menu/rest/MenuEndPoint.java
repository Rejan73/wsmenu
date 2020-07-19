package rod.menu.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import rod.menu.model.Ingredient;
import rod.menu.model.Plat;
import rod.menu.repository.IngredientRepository;
import rod.menu.repository.PlatRepository;

@RestController
public class MenuEndPoint {
	@Autowired
	PlatRepository platRepository;
	
	@Autowired
	IngredientRepository ingredientRepository;
	
	@GetMapping("/version")
	public String getVersion() {
		return "Rod Menu v1";
	}
	
	@GetMapping("ingredients")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public List<Ingredient> findIngredient(){

		List<Ingredient> ingredients = ingredientRepository.findAll();
	
		return ingredients;
	}

	@GetMapping("ingredients/plats/{platId}")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public List<Ingredient> findIngredientByPlatId(@PathVariable Long platId){

		List<Ingredient> ingredients = ingredientRepository.findbyPlatId(platId);
	
		return ingredients;
	}
	
	@PostMapping("/plats")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public Plat createPlat(@RequestBody Plat plat){
		
		Plat platToSave=new Plat();
		platToSave.setNbPersonne(plat.getNbPersonne());
		platToSave.setNom(plat.getNom());
		platToSave.setTyperepas(plat.getTyperepas());
		Plat createdPlat = platRepository.save(platToSave);
		
		for (Ingredient ingredient : plat.getIngredients()) {
			ingredient.setPlat(createdPlat);
			Ingredient createdIngredient= ingredientRepository.save(ingredient);
			ingredient.setId(createdIngredient.getId());
		}
		createdPlat.setIngredients(plat.getIngredients());
		return createdPlat;
	}
	
	@GetMapping("plats")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public List<Plat> findPlats(){

		List<Plat> plats = platRepository.findAll();
		
		return plats;
	}
	
	@GetMapping("detailplats")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public List<Plat> findPlatsWithIngredients(){

		List<Plat> plats = platRepository.findAll();
		for (Plat plat : plats) {
			plat.getIngredients();
		}
		return plats;
	}
}
