package com.pakage.service;

import com.pakage.model.Purchases;
import com.pakage.repo.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PurchaseInterface {
 @Autowired
 private PurchaseRepo purchaserepo;
 
 public Purchases savePurchaes(Purchases purchases) {
 	if (purchases.getDate() == null) {
         purchases.setDate(LocalDate.now());
     }
     return purchaserepo.save(purchases);
 }
 

 public List<Purchases> getAllPurchases() {
     return purchaserepo.findAll();
 }

 public Purchases addPurchase(Purchases purchases) {
     return purchaserepo.save(purchases);
 }

 public void deletePurchase(Long id) {
     purchaserepo.deleteById(id);
 }
}
