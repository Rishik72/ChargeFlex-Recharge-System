package com.mobicomm.services.auth;

import com.mobicomm.dto.RecordDto;
import com.mobicomm.dto.SignupRequest;
import com.mobicomm.dto.UserDto;

public interface AuthService {

	UserDto createCustomer(SignupRequest signupRequest);
	RecordDto createRecord(RecordDto saveRequest);
	boolean hasCustomerWithEmail(String email);
}
