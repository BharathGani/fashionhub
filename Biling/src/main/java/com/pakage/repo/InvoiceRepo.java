package com.pakage.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pakage.model.Invoice;

@Repository
public interface InvoiceRepo extends JpaRepository<Invoice, String> {

}