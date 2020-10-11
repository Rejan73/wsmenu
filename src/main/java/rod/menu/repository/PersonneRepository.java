package rod.menu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rod.menu.model.Personne;

public interface PersonneRepository extends JpaRepository<Personne, Long>{
	
	Optional<Personne> findByLogin(String login);
}
