package com.pakage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pakage.model.Invoice;
import com.pakage.service.InvoiceService;

@RestController
@CrossOrigin("*")
public class InvoiceController {

    @Autowired
    private InvoiceService inserv;

    @PostMapping("/saveInvoice")
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
        Invoice savedInvoice = inserv.saveInvoice(invoice);
        return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
    }

    @GetMapping("/getInvoice/{transactionId}")
    public ResponseEntity<Invoice> getInvoice(@PathVariable String transactionId) {
        Invoice invoice = inserv.getByTransactionId(transactionId);
        if (invoice != null) {
            return new ResponseEntity<>(invoice, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getAllInvoices")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = inserv.getAllInvoices();
        if (!invoices.isEmpty()) {
            return new ResponseEntity<>(invoices, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
