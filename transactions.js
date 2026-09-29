let transactions_array = [];

function getTransactionsByMonth(month){
    if(!month) return transactions;
    return transactions.filter(t => t.date && t.date.startsWith(month));
}

function getTransactionStatistics(){
    const month = document.getElementById("monthFilter")?.value || "";
    const list = getTransactionsByMonth(month);
    let income = 0, expense = 0, investment = 0;
    list.forEach(t=>{
        const amount = Number(t.amount)||0;
        if(t.type==="income") income += amount;
        else if(t.type==="expense") expense += amount;
        else if(t.type==="investment") investment += amount;
    });
    return {income, expense, investment};
}

function getAllCategories(type){
    const cats = new Set();
    transactions.filter(t => t.type===type).forEach(t=>{
        if(t.category) cats.add(t.category);
    });
    return Array.from(cats);
}

function getCategoryIcon(category){
    const map = {
        Salary:'💼', Freelance:'💻', Bonus:'🎉',
        Groceries:'🛒', Rent:'🏠', Travel:'🚗', Dining:'🍽️',
        'Mutual Fund':'📈', Stocks:'📊'
    };
    return map[category] || '💰';
}

function renderTransactions(){
    const list = document.getElementById("transactionList");
    if(!list) return;
    list.innerHTML="";
    const month = document.getElementById("monthFilter")?.value || "";
    const searchVal = document.getElementById("searchTransaction")?.value.toLowerCase() || "";
    const typeVal = document.getElementById("transactionTypeFilter")?.value || "";
    const categoryVal = document.getElementById("categoryFilter")?.value || "";
    const filtered = transactions.filter(t=>{
        const matchMonth = !month || (t.date && t.date.startsWith(month));
        const matchSearch = !searchVal || `${t.category} ${t.note}`.toLowerCase().includes(searchVal);
        const matchType = !typeVal || t.type===typeVal;
        const matchCategory = !categoryVal || t.category===categoryVal;
        return matchMonth && matchSearch && matchType && matchCategory;
    }).slice().reverse();
    if(!filtered.length){
        list.innerHTML="<div class='emptyState'>No transactions found.</div>";
        return;
    }
    filtered.forEach(t=>{
        let sign="-", className="expenseText";
        if(t.type==="income"){sign="+"; className="incomeText";}
        else if(t.type==="investment"){sign=""; className="investmentText";}
        list.innerHTML+=`
            <div class="transactionItem">
                <div class="transactionLeft">
                    <div class="transactionIcon">${getCategoryIcon(t.category)}</div>
                    <div class="transactionInfo">
                        <h3>${t.category}</h3>
                        <p>${t.note || "-"}</p>
                        <small>${t.date}</small>
                    </div>
                </div>
                <div class="transactionAmount ${className}">${sign} ₹${Number(t.amount).toLocaleString('en-IN')}</div>
            </div>`;
    });
}

function clearTransactionForm(){
    document.getElementById("amount").value="";
    document.getElementById("note").value="";
    document.getElementById("date").value="";
    document.getElementById("type").value="expense";
    document.getElementById("category").innerHTML='<option value="">Select Category</option>';
}

function syncTransactionDate(){
    const monthFilter = document.getElementById("monthFilter");
    const dateInput = document.getElementById("date");
    if(!monthFilter || !dateInput) return;
    const selectedMonth = monthFilter.value;
    if(!selectedMonth) return;
    const today = new Date();
    const currentMonth = today.toISOString().substring(0,7);
    dateInput.value = selectedMonth===currentMonth ? today.toISOString().substring(0,10) : selectedMonth+"-01";
}

function addTransaction(){
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const note = document.getElementById("note").value.trim() || "Manual entry";
    const date = document.getElementById("date").value;
    if(!amount || !type || !category || !date){
        alert("Please complete all fields.");
        return false;
    }
    transactions.push({id: Date.now(), type, category, note, date, amount});
    saveStorage();
    refreshDashboard();
    renderTransactions();
    return true;
}

const typeSelect = document.getElementById("type");
if(typeSelect){
    typeSelect.addEventListener("change", function(){
        const type = this.value;
        const categorySelect = document.getElementById("category");
        categorySelect.innerHTML='<option value="">Select Category</option>';
        const options = type ? getAllCategories(type) : [...new Set(transactions.map(t=>t.category))];
        options.sort().forEach(cat=>{
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            categorySelect.appendChild(opt);
        });
    });
}

const saveButton = document.getElementById("saveButton");
if(saveButton){
    saveButton.addEventListener("click", function(){
        if(addTransaction()){
            clearTransactionForm();
            if(typeof closeBottomSheet==="function"){
                closeBottomSheet();
            }
        }
    });
}

const searchBox = document.getElementById("searchTransaction");
if(searchBox){
    searchBox.addEventListener("input", function(){
        renderTransactions();
    });
}

const typeFilter = document.getElementById("transactionTypeFilter");
if(typeFilter){
    typeFilter.addEventListener("change", function(){
        renderTransactions();
    });
}

const categoryFilter = document.getElementById("categoryFilter");
if(categoryFilter){
    categoryFilter.addEventListener("change", function(){
        renderTransactions();
    });
}

function renderRecentTransactions(){
    const container = document.getElementById("recentTransactionList");
    if(!container) return;
    container.innerHTML="";
    const month = document.getElementById("monthFilter")?.value || "";
    const results = transactions.filter(t=> !month || (t.date && t.date.startsWith(month))).slice().reverse().slice(0,5);
    if(!results.length){
        container.innerHTML="<p class='textCenter'>No transactions found.</p>";
        return;
    }
    results.forEach(t=>{
        let sign="-", cls="expenseText";
        if(t.type==="income"){sign="+"; cls="incomeText";}
        else if(t.type==="investment"){sign=""; cls="investmentText";}
        container.innerHTML+=`
            <div class="transactionItem">
                <div class="transactionLeft">
                    <div class="transactionIcon">${getCategoryIcon(t.category)}</div>
                    <div class="transactionInfo">
                        <h3>${t.category}</h3>
                        <p>${t.note || "-"}</p>
                        <small>${t.date}</small>
                    </div>
                </div>
                <div class="transactionAmount ${cls}">${sign} ₹${Number(t.amount).toLocaleString('en-IN')}</div>
            </div>`;
    });
}

function refreshTransactionUI(){
    renderTransactions();
    renderRecentTransactions();
}

document.addEventListener("DOMContentLoaded", function(){
    renderTransactions();
    renderRecentTransactions();
});