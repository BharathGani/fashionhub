package com.pakage.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pakage.model.Customer;
import com.pakage.repo.ProjectRepoo;

@Service
public class ServiceImpl implements ServiceInterface{

	@Autowired
	private ProjectRepoo repo;
	
	
//	public Customer saveCustomer(Customer customer) {
//		// TODO Auto-generated method stub
//		return repo.save(customer);
//	}
	
	@Override
	public String upsert(Customer customer) {
		String username=customer.getUsername();
		Customer res=repo.save(customer);
		
		if(username==null) {
			return "record inserted";
		}
		else {
			return "record updated";
		}
	}

	
	
	public Customer findByEmail(String email) {
		// TODO Auto-generated method stub
		return repo.findByEmail(email);
	}
	


	@Override
	public void deleteByUsername(String username) {
		// TODO Auto-generated method stub
		repo.deleteById(username);
		
	}



//	@Override
//	public Customer saveCustomer(Customer customer) {
//		// TODO Auto-generated method stub
//		return null;
//	}



//	@Override
//	public Customer updateCustomer(String username, Customer updateCustomer) {
//		// TODO Auto-generated method stub
//		return null;
//	}
	
	
//	@Override
//	public Customer updateCustomer(String username, Customer updateCustomer) {
//	    // Fetch the existing customer by email
//	    Optional<Customer> existingCustomerOptional = repo.findById(username);
//	    // Check if the customer exists
//	    if (existingCustomerOptional.isPresent()) {
//	        Customer existingCustomer = existingCustomerOptional.get();
//	        // Update fields of the existing customer
//	        existingCustomer.setEmail(updateCustomer.getEmail());
//	        existingCustomer.setPassword(updateCustomer.getPassword());
//	    
//	        // Save the updated entity
//	        return repo.save(existingCustomer);
//	    } else {
//	        throw new RuntimeException("Customer not found with email: " + username);
//	    }
//	}
	
	

}

