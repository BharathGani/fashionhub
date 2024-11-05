package com.pakage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pakage.model.Purchases;

@Repository
public interface PurchaseRepo extends JpaRepository<Purchases, Long> {
	
}
