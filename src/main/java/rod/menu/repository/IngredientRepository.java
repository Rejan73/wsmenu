package rod.menu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rod.menu.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long>{
	@Query(name = "Ingredient.findbyPlatId")
	public List<Ingredient> findbyPlatId(@Param("platId") Long platId);
}
