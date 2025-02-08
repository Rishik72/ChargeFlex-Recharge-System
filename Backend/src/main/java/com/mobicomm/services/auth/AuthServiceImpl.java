package com.mobicomm.services.auth;

import org.springframework.stereotype.Service;

import com.mobicomm.dto.RecordDto;
import com.mobicomm.dto.SignupRequest;
import com.mobicomm.dto.UserDto;
import com.mobicomm.entity.Records;
import com.mobicomm.entity.User;
import com.mobicomm.enums.UserRole;
import com.mobicomm.repository.RecordRepository;
import com.mobicomm.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final UserRepository userRepository;
	private RecordRepository recordRepository;

	public AuthServiceImpl(UserRepository userRepository, RecordRepository recordRepository) {
	       this.userRepository = userRepository;
	       this.recordRepository =recordRepository;
	}
	 
	@PostConstruct
	public void createAdminAccount() {
		User adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
		if(adminAccount==null) {
			User newAdminAccount = new User();
			newAdminAccount.setName("Admin");
			newAdminAccount.setEmail("admin@test.com");
			newAdminAccount.setPassword("admin");
			newAdminAccount.setUserRole(UserRole.ADMIN);
			userRepository.save(newAdminAccount);
			System.out.println("Admin account created successfully");
		}
	}

	@Override
	public UserDto createCustomer(SignupRequest signupRequest) {
		
		User user = new User();
		user.setName(signupRequest.getName());
		user.setPhone(signupRequest.getPhone());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(signupRequest.getPassword());
		user.setUserRole(UserRole.CUSTOMER);
		User createdUser = userRepository.save(user);
		UserDto userDto = new UserDto();
		userDto.setId(createdUser.getId());
		
		return userDto;
	}

	@Override
	public boolean hasCustomerWithEmail(String email) {
		
		return userRepository.findFirstByEmail(email).isPresent();
	}

	@Override
	public RecordDto createRecord(RecordDto saveRequest) {
		Records record = new Records();
		record.setName(saveRequest.getName());
		record.setUserId(saveRequest.getId());
		record.setPlan(saveRequest.getPlan());
		record.setDate(saveRequest.getDate());
		record.setValidity(saveRequest.getValidity());
		recordRepository.save(record);
		return null;
	}
}
