package com.pakage.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;

@Entity
public class Invoice {

    @Id
    private String transactionId;
    private long phonenumber;
    private long invoiceTotal;
    private String customerName;
    private String paymentMethod;
    private LocalDate date;
    private LocalTime time;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice") // Ensure to map to the invoice field in InvoiceItem
    private List<InvoiceItem> items = new ArrayList<>();

    public Invoice() {
        super();
    }

    public Invoice(String transactionId, long phonenumber, long invoiceTotal, String customerName, 
                   String paymentMethod, LocalDate date, List<InvoiceItem> items, LocalTime time) {
        this.transactionId = transactionId;
        this.phonenumber = phonenumber;
        this.invoiceTotal = invoiceTotal;
        this.customerName = customerName;
        this.paymentMethod = paymentMethod;
        this.date = date;
        this.items = items;
        this.time=time;
    }

    public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	@PrePersist
    public void prePersist() {
        // Generate transaction ID if not already set
        if (this.transactionId == null) {
            this.transactionId = UUID.randomUUID().toString().replaceAll("[^0-9]", "").substring(0, 18); // Generate unique transaction ID
        }
        
        // Set date to the current date if not already set
        if (this.date == null) {
            this.date = LocalDate.now();
        }
        
        if(this.time==null) {
        	this.time = LocalTime.now();
        }
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public long getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(long phonenumber) {
        this.phonenumber = phonenumber;
    }

    public long getInvoiceTotal() {
        return invoiceTotal;
    }

    public void setInvoiceTotal(long invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<InvoiceItem> getItems() {
        return items;
    }

    public void setItems(List<InvoiceItem> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "Invoice [transactionId=" + transactionId + ", phonenumber=" + phonenumber + ",time="+time+", invoiceTotal="
                + invoiceTotal + ", customerName=" + customerName + ", paymentMethod=" + paymentMethod + ", date=" + date + ", items=" + items + "]";
    }
}
