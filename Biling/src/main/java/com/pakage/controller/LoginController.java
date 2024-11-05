package com.pakage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pakage.model.Customer;
import com.pakage.service.ServiceImpl;

@RestController
@CrossOrigin("*")
public class LoginController {
    
    @Autowired
    private ServiceImpl service;


@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody Customer customer) {
    Customer existingCustomer = service.findByEmail(customer.getEmail());
    if (existingCustomer != null && existingCustomer.getPassword().equals(customer.getPassword())) {
        return ResponseEntity.ok("Login successful!"); // Success response
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!"); // Error response
}
}
