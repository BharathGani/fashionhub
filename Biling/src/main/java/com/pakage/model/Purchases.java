package com.pakage.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Purchases {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String item;
	private int quantity;
	private double amount;
	private LocalDate date;
	public Purchases() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Purchases(long id, String item, int quantity, double amount, LocalDate date) {
		super();
		this.id = id;
		this.item = item;
		this.quantity = quantity;
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
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
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
		return "Purchases [id=" + id + ", item=" + item + ", quantity=" + quantity + ", amount=" + amount + ", date="
				+ date + "]";
	}
	
	public void setDateA(LocalDate loc) {
		
	}
	
}
