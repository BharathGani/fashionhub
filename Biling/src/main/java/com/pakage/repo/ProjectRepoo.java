package com.pakage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pakage.model.Customer;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepoo extends JpaRepository<Customer, String> {
	
	Customer findByEmail(String email);
	
	public Customer findByUsername(String username);
	
	public String deleteByUsername(String username);

}

