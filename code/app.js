// Initialize app state
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currentView = 'dashboard';

// DOM Elements
const mainContent = document.getElementById('mainContent');
const addExpenseModal = document.getElementById('addExpenseModal');
const expenseForm = document.getElementById('expenseForm');

// Event Listeners
document.getElementById('dashboardBtn').addEventListener('click', () => renderView('dashboard'));
document.getElementById('addExpenseBtn').addEventListener('click', () => addExpenseModal.style.display = 'block');
document.getElementById('categoriesBtn').addEventListener('click', () => renderView('categories'));
document.getElementById('analyticsBtn').addEventListener('click', () => renderView('analytics'));
document.getElementById('settingsBtn').addEventListener('click', () => renderView('settings'));

expenseForm.addEventListener('submit', handleAddExpense);

// Functions
function renderView(view) {
    currentView = view;
    mainContent.innerHTML = '';
    switch (view) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'categories':
            renderCategories();
            break;
        case 'analytics':
            renderAnalytics();
            break;
        case 'settings':
            renderSettings();
            break;
    }
}

function renderDashboard() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    mainContent.innerHTML = `
        <h2>Dashboard</h2>
        <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
        <ul>
            ${expenses.map(expense => `
                <li>
                    ${expense.amount.toFixed(2)} - ${expense.category} - ${expense.date}
                    <button onclick="editExpense(${expense.id})">Edit</button>
                    <button onclick="deleteExpense(${expense.id})">Delete</button>
                </li>
            `).join('')}
        </ul>
    `;
}

function handleAddExpense(e) {
    e.preventDefault();
    const newExpense = {
        id: Date.now(),
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        notes: document.getElementById('notes').value
    };
    expenses.push(newExpense);
    saveExpenses();
    addExpenseModal.style.display = 'none';
    renderView(currentView);
}

function editExpense(id) {
    // Implement edit functionality
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderView(currentView);
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderCategories() {
    // Implement categories view
}

function renderAnalytics() {
    // Implement analytics view
}

function renderSettings() {
    // Implement settings view
}

// Initial render
renderView('dashboard');