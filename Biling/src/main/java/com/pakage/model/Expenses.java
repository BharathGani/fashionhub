package com.pakage.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class Expenses {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long id;
	public String item;
	public Double amount;
	private LocalDate date;
	
	public Expenses() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Expenses(long id, String item, Double amount, LocalDate date) {
		this.id = id;
		this.item = item;
		this.amount = amount;
		this.date = date;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "Expenses [id=" + id + ", item=" + item + ", amount=" + amount + ", date=" + date + "]";
	}
	
	@PrePersist
    public void prePersist() {
		 if (this.date == null) {
	            this.date = LocalDate.now();
	        }
	}

	public void setDateA(LocalDate loc) {
	}
}
