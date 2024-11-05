package com.pakage.service;

import java.util.Collections;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pakage.model.Invoice;
import com.pakage.repo.InvoiceRepo;

@Service
public class InvoiceService implements InvoiceInterface {

	@Autowired
	private InvoiceRepo inrepo;

	@Override
	public Invoice saveInvoice(Invoice invoice) {
		// TODO Auto-generated method stub
	
		invoice.setTransactionId(UUID.randomUUID().toString().replaceAll("[^0-9]", ""));
		return inrepo.save(invoice);
	}

	@Override
	public Invoice getByTransactionId(String transactionId) {
		// TODO Auto-generated method stub
		return inrepo.findById(transactionId).get();
	}

	public List<Invoice> getAllInvoices() {
        List<Invoice> invoices = inrepo.findAll(); // Fetch all invoices from the database
        return invoices != null ? invoices : Collections.emptyList(); // Return an empty list if invoices is null
    }


}