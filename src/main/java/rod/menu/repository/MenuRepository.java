package rod.menu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rod.menu.model.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long>{

	public Optional<Menu> findById(Long menuId);
	
}
