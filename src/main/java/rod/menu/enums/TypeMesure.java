package rod.menu.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum TypeMesure {
  quantite("ml"),
  poids("g"),
  unite("u");
	
  private String label;
}
