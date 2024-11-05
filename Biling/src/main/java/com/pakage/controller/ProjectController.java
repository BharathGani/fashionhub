package com.pakage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pakage.model.Customer;
import com.pakage.service.ServiceImpl;


@RestController
@CrossOrigin("*")
public class ProjectController {
	
	@Autowired
	private ServiceImpl service;
	
	
	@PostMapping("/register")
	public ResponseEntity<String>insertData(@RequestBody Customer customer){
		String msg=service.upsert(customer);
		return new ResponseEntity<>(msg,HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{username}")
	public ResponseEntity<String>updateData(@RequestBody Customer customer){
		String msg=service.upsert(customer);
		return new ResponseEntity<>(msg,HttpStatus.OK);
	}
//	@PostMapping("/register")
//	public Customer saveCustomer(@RequestBody Customer customer) {
//		return service.saveCustomer(customer);
//	}

//	@PutMapping("/update/{username}") // Change to {email} to match the parameter
//	public ResponseEntity<Customer> updateCustomer(@PathVariable String username, @RequestBody Customer customer) {
//	    try {
//	        // Update the customer using the service layer
//	        Customer updatedCustomer = service.updateCustomer(username,customer);
//	        return ResponseEntity.ok(updatedCustomer); // Return the updated customer
//	    } catch (RuntimeException e) {
//	        return ResponseEntity.notFound().build(); // Return 404 if customer not found
//	    }
//	}


	@DeleteMapping("/deleteCustomer/{username}")
	public String deleteCustomerByUsername(@PathVariable String username) {
		service.deleteByUsername(username);
		return "record deleted successfully";	
	}
	
	
	@GetMapping("/getCustomer/{email}")
	public Customer getcustomer(@PathVariable String email) {
		return service.findByEmail(email);
	}
	
}
