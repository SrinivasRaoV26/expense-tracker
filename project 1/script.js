// Get form, expense list, total amount, monthly expense, save monthly expense button, monthly savings element, new month button
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");
const monthlyExpenseInput = document.getElementById("monthly-expense");
const saveMonthlyExpenseButton = document.getElementById("save-monthly-expense");
const monthlySavingsElement = document.getElementById("monthly-savings");
const newMonthButton = document.getElementById("new-month");

// Initialize arrays for expenses
let expenses = [];
let monthlyExpense = 0;

// Function to render expenses in tabular form
function renderExpenses() {
    // Clear expense list
    expenseList.innerHTML = "";

    // Initialize total amount
    let totalAmount = 0;

    // Loop through expenses array and create table rows
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount}</td>
            <td class="delete-btn" data-id="${i}">Delete</td>
        `;
        expenseList.appendChild(expenseRow);

        // Update total amount
        totalAmount += expense.amount;
    }

    // Update total amount display
    totalAmountElement.textContent = totalAmount.toFixed(2);

    // Update monthly savings
    updateMonthlySavings(totalAmount);
}

// Function to update monthly savings
function updateMonthlySavings(totalExpenses) {
    // Calculate monthly savings
    const monthlySavings = monthlyExpense - totalExpenses;

    // Update monthly savings display
    monthlySavingsElement.textContent = monthlySavings.toFixed(2);

    // Check if monthly savings are negative
    if (monthlySavings < 0) {
        // Alert the user that the monthly expense has been exceeded
        const alertMessage = "Monthly expense exceeded!";
        const alertDiv = document.createElement("div");
        alertDiv.textContent = alertMessage;
        alertDiv.classList.add("alert");
        document.body.appendChild(alertDiv);
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 3000); // Remove alert after 3 seconds
    }
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();

    // Get expense name and amount from form
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);

    // Clear form inputs
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    // Validate inputs
    if (expenseName === "" || isNaN(expenseAmount)) {
        alert("Please enter valid expense details.");
        return;
    }

    // Create new expense object
    const expense = {
        name: expenseName,
        amount: expenseAmount,
    };

    // Add expense to expenses array
    expenses.push(expense);

    // Render expenses
    renderExpenses();
}

// Function to delete expense
function deleteExpense(event) {
    if (event.target.classList.contains("delete-btn")) {
        // Get expense index from data-id attribute
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));

        // Remove expense from expenses array
        expenses.splice(expenseIndex, 1);

        // Render expenses
        renderExpenses();
    }
}

// Function to save monthly expense
function saveMonthlyExpense() {
    // Get monthly expense value
    const newMonthlyExpense = parseFloat(monthlyExpenseInput.value);

    // Validate input
    if (isNaN(newMonthlyExpense) || newMonthlyExpense <= 0) {
        alert("Please enter valid monthly expense.");
        return;
    }

    // Update monthly expense value
    monthlyExpense = newMonthlyExpense;

    // Update monthly savings
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    updateMonthlySavings(totalExpenses);
}

// Function to reset everything for a new month
function newMonth() {
    // Clear the expenses array
    expenses = [];

    // Clear the expense list
    expenseList.innerHTML = "";

    // Clear the total amount
    totalAmountElement.textContent = "0";

    // Clear monthly savings
    monthlySavingsElement.textContent = "0";

    // Clear monthly expense input value
    monthlyExpenseInput.value = "";

    // Reset monthly expense value to 0
    monthlyExpense = 0;

    // Alert the user that the month has been reset
    alert("New month started. All data has been reset.");
}

// Add event listeners
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);
saveMonthlyExpenseButton.addEventListener("click", saveMonthlyExpense);
newMonthButton.addEventListener("click", newMonth);
