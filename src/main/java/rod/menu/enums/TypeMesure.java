package rod.menu.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TypeMesure {
  ml("ml"),
  g("g"),
  u("u");
	
  private String label;
}
