package com.pakage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pakage.model.InvoiceItem;

@Repository
public interface InvoiceItemRepo extends JpaRepository<InvoiceItem, Long> {
    // Additional custom queries can be added here if needed
}

