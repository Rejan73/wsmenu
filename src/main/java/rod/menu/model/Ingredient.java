package rod.menu.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import rod.menu.enums.TypeMesure;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonAutoDetect(fieldVisibility = Visibility.NONE, getterVisibility = Visibility.PUBLIC_ONLY, setterVisibility = Visibility.NONE, isGetterVisibility = Visibility.PUBLIC_ONLY, creatorVisibility = Visibility.NONE)
@Entity
@NamedQueries({
    @NamedQuery(name = "Ingredient.findbyPlatId", query = "SELECT i FROM Ingredient i"
        + " WHERE i.plat.id=:platId")
})
public class Ingredient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String nom;
	@NotNull
	private TypeMesure typeMesure;
	@NotNull
	private int quantite;
	
	@OneToOne
	@JsonIgnore
    @JoinColumn(name="plat_id")
    private Plat plat;
	
	@CreatedDate
	private Instant createDate; 
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ingredient other = (Ingredient) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nom == null) {
			if (other.nom != null)
				return false;
		} else if (!nom.equals(other.nom))
			return false;
		return true;
	}
	
	
	public Ingredient() {
		super();
		this.createDate = Instant.now();
	}
	
	public Ingredient(Long id, @NotNull String nom, @NotNull TypeMesure typeMesure, @NotNull int quantite, Plat plat,
			Instant createDate) {
		super();
		this.id = id;
		this.nom = nom;
		this.typeMesure = typeMesure;
		this.quantite = quantite;
		this.plat = plat;
		this.createDate = createDate;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public TypeMesure getTypeMesure() {
		return typeMesure;
	}
	public void setTypeMesure(TypeMesure typeMesure) {
		this.typeMesure = typeMesure;
	}
	public int getQuantite() {
		return quantite;
	}
	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
	public Plat getPlat() {
		return plat;
	}
	public void setPlat(Plat plat) {
		this.plat = plat;
	}
	public Instant getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Instant createDate) {
		this.createDate = createDate;
	}
	
}

