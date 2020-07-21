package rod.menu.rest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import rod.menu.model.Menu;
import rod.menu.model.Plat;
import rod.menu.repository.MenuRepository;
import rod.menu.repository.PlatRepository;

@RestController
public class MenuEndPoint {
	@Autowired
	PlatRepository platRepository;

	@Autowired
	MenuRepository menuRepository;

	@PostMapping("/menus")
	public ResponseEntity<Menu> createMenu(@RequestBody String nom) {
		Menu menuToSave = new Menu();
		menuToSave.setNom(nom);
		menuToSave.setCreateDate(LocalDate.now());
		return new ResponseEntity<>(menuRepository.save(menuToSave), HttpStatus.CREATED);
	}

	@GetMapping("menus/{menuId}")
	@ResponseBody
	public ResponseEntity<Menu> findMenuById(@PathVariable Long menuId) {
		Optional<Menu> menu = menuRepository.findById(menuId);
		if (menu.isPresent()) {
			return new ResponseEntity<>(menu.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("menus")
	@ResponseBody
	public ResponseEntity<List<Menu>> findAll() {
		List<Menu> menus = menuRepository.findAll();
		return new ResponseEntity<>(menus, HttpStatus.OK);
	}
	
	@PutMapping("/menus/{menuId}")
	public ResponseEntity<Menu> addPlat(@PathVariable Long menuId, @RequestBody Long platId) {
		Optional<Menu> menu = menuRepository.findById(menuId);
		if (menu.isPresent()) {
			Menu menuToUpdate = menu.get();
			Optional<Plat> platToAdd = platRepository.findById(platId);
			if (platToAdd.isPresent()) {
				if (menuToUpdate.getPlats() == null) {
					menuToUpdate.setPlats(new ArrayList<Plat>());
				}
				menuToUpdate.getPlats().add(platToAdd.get());
			}
			return new ResponseEntity<>(menuRepository.save(menuToUpdate), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
