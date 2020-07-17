package rod.menu.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
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
	@GetMapping("plats")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public List<Plat> findPlats(){

		List<Plat> plats = platRepository.findAll();
		
		return plats;
	}
	
	@GetMapping("ingredients")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public List<Ingredient> findIngredient(){

		List<Ingredient> ingredients = ingredientRepository.findAll();
		
		return ingredients;
	}
	
	@PostMapping("/ingredients")
	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	@ResponseBody
	public Ingredient createIngredient(@RequestBody Ingredient ingredient){

		Ingredient createdIngredient = ingredientRepository.save(ingredient);
		
		return createdIngredient;
	}
}
