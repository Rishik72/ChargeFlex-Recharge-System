package com.mobicomm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.mobicomm.entity.User;
import com.mobicomm.enums.UserRole;

@Repository
@Component
public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findFirstByEmail(String email);

	User findByUserRole(UserRole userRole);
 
	
}
