package com.mobicomm.dto;

import com.mobicomm.enums.UserRole;

import lombok.Data;

@Data
public class AuthenticationResponse {
	
	private String jwt;
	private UserRole userRole;
	private Long userId;
	private String name;
	private String phone;

	public AuthenticationResponse(String jwt, Long id, UserRole userRole,String name, String phone) {
		this.jwt = jwt;
		this.userRole = userRole;
		this.userId=id;
		this.name=name;
		this.phone=phone;
		
	}
	public AuthenticationResponse() {
		// TODO Auto-generated constructor stub
	}
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
}
