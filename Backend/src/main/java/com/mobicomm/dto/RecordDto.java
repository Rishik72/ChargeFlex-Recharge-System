package com.mobicomm.dto;

import lombok.Data;

@Data
public class RecordDto {
	
	@Override
	public String toString() {
		return "RecordDto [name=" + name + ", id=" + id + ", plan=" + plan + ", date=" + date + " , validity=" + validity + "]";
	}
	private String name;
	private String id;
    private String plan;
    private String date;
    private String validity;
    private String email;
    
    public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getValidity() {
		return validity;
	}
	public void setValidity(String validity) {
		this.validity = validity;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPlan() {
		return plan;
	}
	public void setPlan(String plan) {
		this.plan = plan;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	

}
