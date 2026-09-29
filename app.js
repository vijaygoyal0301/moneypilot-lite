function trackEvent(eventName,params={}){
    if(typeof gtag==="function"){
        gtag("event",eventName,params);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    initializeApp();
});

function initializeApp(){
    if(typeof loadStorage==="function"){
        loadStorage();
    }
    if(typeof loadSettings==="function"){
        loadSettings();
    }
    if(typeof refreshDashboard==="function"){
        refreshDashboard();
    }
    if(typeof renderTransactions==="function"){
        renderTransactions();
    }
    initializeMonth();
}

function syncTransactionDate(){
    const monthFilter = document.getElementById("monthFilter");
    const dateInput = document.getElementById("date");
    if(!monthFilter || !dateInput) return;
    const selectedMonth = monthFilter.value;
    if(!selectedMonth) return;
    const today = new Date();
    const currentMonth = today.toISOString().substring(0,7);
    if(selectedMonth===currentMonth){
        dateInput.value = today.toISOString().substring(0,10);
    }
    else{
        dateInput.value = selectedMonth + "-01";
    }
}

function initializeMonth(){
    const monthFilter = document.getElementById("monthFilter");
    if(!monthFilter) return;
    if(!monthFilter.value){
        monthFilter.value = new Date().toISOString().substring(0,7);
    }
}

function refreshApp(){
    if(typeof refreshDashboard==="function"){
        refreshDashboard();
    }
    if(typeof renderTransactions==="function"){
        renderTransactions();
    }
}

function fullRefresh(){
    refreshApp();
    if(typeof renderRecentTransactions==="function"){
        renderRecentTransactions();
    }
}

const monthFilter = document.getElementById("monthFilter");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

function changeMonth(offset){
    if(!monthFilter) return;
    let value = monthFilter.value;
    if(!value){
        value = new Date().toISOString().substring(0,7);
    }
    let parts = value.split("-");
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    month += offset;
    if(month<1){
        month=12;
        year--;
    }
    if(month>12){
        month=1;
        year++;
    }
    monthFilter.value = year + "-" + String(month).padStart(2,"0");
    monthFilter.dispatchEvent(new Event("change"));
}

if(prevMonth){
    prevMonth.onclick=function(){
        changeMonth(-1);
    };
}

if(nextMonth){
    nextMonth.onclick=function(){
        changeMonth(1);
    };
}

if(monthFilter){
    monthFilter.addEventListener("change", function(){
        syncTransactionDate();
        refreshApp();
    });
}

setInterval(function(){
    refreshDashboard();
},60000);

const saveButton = document.getElementById("saveButton");
if(saveButton){
    saveButton.onclick = function(){
        let success = false;
        if(typeof addTransaction==="function"){
            success = addTransaction();
        }
        if(!success){
            return;
        }
        fullRefresh();
        if(typeof closeBottomSheet==="function"){
            closeBottomSheet();
        }
    };
}

document.addEventListener("DOMContentLoaded", function(){
    fullRefresh();
});

console.log("✅ MoneyPilot Lite V3 Loaded");