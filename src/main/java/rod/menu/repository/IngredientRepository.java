package rod.menu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rod.menu.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>{

}
