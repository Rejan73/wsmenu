package rod.menu.enums;

public enum TypeMesure {
  ml("ml"),
  g("g"),
  u("u");
	
  private TypeMesure(String label) {
	this.label = label;
}

private String label;

public String getLabel() {
	return label;
}
}

