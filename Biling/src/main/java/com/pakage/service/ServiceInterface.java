package com.pakage.service;

import java.util.List;
import java.util.Optional;

import com.pakage.model.Customer;

public interface ServiceInterface {
	
//	public Customer saveCustomer(Customer customer);

	public String upsert(Customer customer);
	
	public void deleteByUsername(String username);
	
	Customer findByEmail(String email);
	
//	public Customer updateCustomer(String username, Customer updateCustomer);
	
}

