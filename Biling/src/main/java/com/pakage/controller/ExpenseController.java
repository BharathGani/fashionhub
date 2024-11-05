
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

import com.pakage.model.Expenses;
import com.pakage.service.ExpenseInterface;


@RestController
@CrossOrigin("*")
@RequestMapping("/expenses")
public class ExpenseController {
 @Autowired
 private ExpenseInterface expenseInterface;

 @GetMapping("/expenses")
 public List<Expenses> getexpExpenses() {
     return expenseInterface.getAllExpenses();
 }

 @PostMapping("/saveExpenses")
 public Expenses createExpense(@RequestBody Expenses expenses) {
     return expenseInterface.addExpense(expenses);
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
     expenseInterface.deleteExpense(id);
     return ResponseEntity.noContent().build();
 }
 @PostMapping("/add")
 public Expenses addExpense(@RequestBody Expenses expenses) {
	 if (expenses.getDate() == null) {
         expenses.setDate(LocalDate.now());
     }
     return expenseInterface.saveExpenses(expenses);
 }
 
 
}


