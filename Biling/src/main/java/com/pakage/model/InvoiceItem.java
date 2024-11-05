package com.pakage.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Auto-generated ID
    private String description;
    private int quantity;
    private long price;

    @ManyToOne // Many invoice items belong to one invoice
    @JoinColumn(name = "invoice_id") // Foreign key column in InvoiceItem table
    private Invoice invoice;

	public InvoiceItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InvoiceItem(Long id, String description, int quantity, long price, Invoice invoice) {
		super();
		this.id = id;
		this.description = description;
		this.quantity = quantity;
		this.price = price;
		this.invoice = invoice;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}

	@Override
	public String toString() {
		return "InvoiceItem [id=" + id + ", description=" + description + ", quantity=" + quantity + ", price=" + price
				+ ", invoice=" + invoice + "]";
	}
    
    

    
}

