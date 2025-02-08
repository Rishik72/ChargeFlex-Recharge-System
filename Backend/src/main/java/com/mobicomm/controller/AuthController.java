package com.mobicomm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mobicomm.dto.AuthenticationRequest;
import com.mobicomm.dto.AuthenticationResponse;
import com.mobicomm.dto.RecordDto;
import com.mobicomm.dto.SignupRequest;
import com.mobicomm.dto.UserDto;
import com.mobicomm.entity.Records;
import com.mobicomm.entity.User;
import com.mobicomm.repository.RecordRepository;
import com.mobicomm.repository.UserRepository;
import com.mobicomm.services.auth.AuthService;
import com.mobicomm.services.jwt.UserService;
import com.mobicomm.services.mail.EmailSenderService;
import com.mobicomm.utils.JWTUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")

public class AuthController {

	
	private final AuthService authService;
	private final UserService userService;
	private final JWTUtil jwtUtil;
	private final UserRepository userRepository;
	private RecordRepository recordRepository;
	@Autowired
    private EmailSenderService emailSenderService;
	
	 public AuthController(RecordRepository recordRepository,AuthService authService, UserService userService, UserRepository userRepository, JWTUtil jwtUtil, AuthenticationManager authenticationManager) {
	        this.authService = authService;
			this.userService = userService;
			this.jwtUtil = jwtUtil;
			this.userRepository = userRepository;
			this.recordRepository= recordRepository;
			
	    }
	 
	@PostMapping("/signup")
	public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest){
		
		if(authService.hasCustomerWithEmail(signupRequest.getEmail()))
			return new ResponseEntity<>("Customer already exists with this email !",HttpStatus.NOT_ACCEPTABLE);
		UserDto createdCustomerDto = authService.createCustomer(signupRequest);
		
		if(createdCustomerDto == null) return new ResponseEntity<>("Customer not created",HttpStatus.BAD_REQUEST);
		
		return new ResponseEntity<>(createdCustomerDto,HttpStatus.CREATED);
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
	    String email = authenticationRequest.getEmail();
	    String password = authenticationRequest.getPassword();
	    
	    
	    Optional<User> optionalUser = userRepository.findFirstByEmail(email);
	    
	    if (optionalUser.isPresent() && passwordMatches(optionalUser.get().getPassword(), password)) {
	    	final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
	        String jwt = jwtUtil.generateToken(userDetails);

	        AuthenticationResponse authenticationResponse = new AuthenticationResponse(
	                jwt,
	                optionalUser.get().getId(),
	                optionalUser.get().getUserRole(),
	                optionalUser.get().getName(),
	                optionalUser.get().getPhone()
	        );

	        return ResponseEntity.ok(authenticationResponse);
	        
	    } else {
	        return new ResponseEntity("Invalid username or password !",HttpStatus.BAD_REQUEST);
	    }
	}

	private boolean passwordMatches(String string, String password) {

		boolean flag=false;
	    if(string.equals(password)) {
	    	flag=true;
	    };
	    
	    return flag;
	}

	
	@PostMapping("/saveRecord")
	public void saveRecord(@RequestBody RecordDto saveRequest){
		
		authService.createRecord(saveRequest);
		
		String name = saveRequest.getName();
		String plan = saveRequest.getPlan();
		String validity = saveRequest.getValidity();
		
		String toEmail = saveRequest.getEmail();
        String subject = "Recharge Successful";
        String body = "Dear "+name+ ", \nYour mobile prepaid recharge of ₹"+ plan + " was successful and is valid uptil "+validity+ ". \n\nThanks for using our services! \n\nRegards, \nTeam FlexiPay.";
        
        // Sending email using EmailSenderService
        emailSenderService.sendEmail(toEmail, subject, body);
		
	}
	
	@GetMapping("/getRecords")
    public List<Records> getAllRecords() {
        return recordRepository.findAll();
        
    }

	
	
	
}
