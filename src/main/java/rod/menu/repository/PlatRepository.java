package rod.menu.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rod.menu.model.Plat;

public interface PlatRepository extends JpaRepository<Plat, Long>{

	public List<Plat> findByEventsBetween(Instant begin, Instant end);
	
}
