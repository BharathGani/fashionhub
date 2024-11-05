package com.pakage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pakage.model.Expenses;

@Repository
public interface ExpenseRepo extends JpaRepository<Expenses, Long> {
	
}