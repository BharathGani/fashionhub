package com.pakage.controller;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pakage.model.Purchases;
import com.pakage.service.PurchaseInterface;


@RestController
@RequestMapping("/purchases")
@CrossOrigin("*")
public class PurchaseController {
 @Autowired
 private PurchaseInterface purchaseInterface;

 @GetMapping
 public List<Purchases> getPurchases() {
     return purchaseInterface.getAllPurchases();
 }

 @PostMapping
 public Purchases createPurchase(@RequestBody Purchases purchases) {
     return purchaseInterface.addPurchase(purchases);
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deletePurchase(@PathVariable Long id) {
     purchaseInterface.deletePurchase(id);
     return ResponseEntity.noContent().build();
 }
 @PostMapping("/add")
 public Purchases addPurchase(@RequestBody Purchases purchases) {
	 if (purchases.getDate() == null) {
         purchases.setDate(LocalDate.now());
     }
     return purchaseInterface.savePurchaes(purchases);
 }
 
 
}

