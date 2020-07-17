package rod.menu.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TypeRepas {
	  entree("entre"),
	  plat("plat"),
	  dessert("dessert");
		
	  private String label;
}
