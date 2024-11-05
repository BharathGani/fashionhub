package com.pakage.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

@Entity
public class Customer {
	
	@Id
	public String username;
	@Lob
	public String image;
	public String phoneNumber;
	public String email;
	public String password;
	public String confirmPassword;
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Customer(String username, String image, String phoneNumber, String email, String password,
			String confirmPassword) {
		super();
		this.username = username;
		this.image = image;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	@Override
	public String toString() {
		return "Customer [username=" + username + ", image=" + image + ", phoneNumber=" + phoneNumber + ", email="
				+ email + ", password=" + password + ", confirmPassword=" + confirmPassword + "]";
	}
	
	
	
}
