package rod.menu.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import rod.menu.model.Personne;
import rod.menu.repository.PersonneRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private PersonneRepository userRepository;
	
	private void initialiseUser() {
		Optional<Personne> personne = userRepository.findByLogin("rod");
		if (!personne.isPresent()) {
			Personne user = new Personne("rod", "1234", "ADMIN");
			userRepository.save(user);

		}
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		initialiseUser();
		Optional<Personne> personne = userRepository.findByLogin(username);
		if (personne.isPresent()) {
			return User.builder()
					.username(personne.get().getLogin())
					.password(bCryptPasswordEncoder.encode(personne.get().getPwd()))
					.roles(personne.get().getRole())
					.build();
			
		} else {
			throw new UsernameNotFoundException("Bad user");
		}
	}

}
