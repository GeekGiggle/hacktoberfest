import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Expense {
    private String description;
    private double amount;

    public Expense(String description, double amount) {
        this.description = description;
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    @Override
    public String toString() {
        return String.format("Description: %s, Amount: %.2f", description, amount);
    }
}

public class ExpenseTracker {
    private List<Expense> expenses = new ArrayList<>();
    
    public void addExpense(String description, double amount) {
        Expense expense = new Expense(description, amount);
        expenses.add(expense);
    }

    public void viewAllExpenses() {
        if (expenses.isEmpty()) {
            System.out.println("No expenses recorded.");
        } else {
            System.out.println("All Expenses:");
            for (Expense expense : expenses) {
                System.out.println(expense);
            }
        }
    }

    public double getTotalExpenses() {
        double total = 0;
        for (Expense expense : expenses) {
            total += expense.getAmount();
        }
        return total;
    }

    public static void main(String[] args) {
        ExpenseTracker tracker = new ExpenseTracker();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\nExpense Tracker Menu:");
            System.out.println("1. Add Expense");
            System.out.println("2. View All Expenses");
            System.out.println("3. View Total Expenses");
            System.out.println("4. Exit");

            System.out.print("Select an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter description: ");
                    String description = scanner.nextLine();
                    System.out.print("Enter amount: ");
                    double amount = scanner.nextDouble();
                    tracker.addExpense(description, amount);
                    System.out.println("Expense added successfully!");
                    break;
                case 2:
                    tracker.viewAllExpenses();
                    break;
                case 3:
                    double total = tracker.getTotalExpenses();
                    System.out.printf("Total Expenses: %.2f\n", total);
                    break;
                case 4:
                    System.out.println("Exiting... Thank you for using the Expense Tracker!");
                    scanner.close();
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid option! Please try again.");
            }
        }
    }
}
