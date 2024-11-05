
package com.pakage.service;
import com.pakage.model.Expenses;
import com.pakage.repo.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseInterface {
    @Autowired
    private ExpenseRepo expenserepo;
    
    public Expenses saveExpenses(Expenses expenses) {
    	if (expenses.getDate() == null) {
            expenses.setDate(LocalDate.now());
        }
        return expenserepo.save(expenses);
    }
    

    public List<Expenses> getAllExpenses() {
        return expenserepo.findAll();
    }

    public Expenses addExpense(Expenses expenses) {
        return expenserepo.save(expenses);
    }
    public void deleteExpense(Long id) {
        expenserepo.deleteById(id);
    }
}
