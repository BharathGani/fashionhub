package com.pakage.service;

import com.pakage.model.Invoice;

public interface InvoiceInterface {
	
	public Invoice saveInvoice(Invoice invoice);
	
	public Invoice getByTransactionId(String transactionId);
}