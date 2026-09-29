const pages = {
    home: document.getElementById("homePage"),
    transactions: document.getElementById("transactionsPage"),
    analytics: document.getElementById("analyticsPage"),
    netWorth: document.getElementById("netWorthPage"),
    settings: document.getElementById("settingsPage")
};

function hideAllPages(){
    Object.values(pages).forEach(page=>{
        if(page){
            page.classList.remove("active");
        }
    });
}

function openPage(pageName){
    hideAllPages();
    if(pages[pageName]){
        pages[pageName].classList.add("active");
    }
}

const fabButton = document.getElementById("fabButton");
const bottomSheet = document.getElementById("addTransactionSheet");
const closeSheetButton = document.getElementById("closeSheetBtn");
let sheetState="closed";

function openBottomSheet(){
    if(sheetState==="open"){
        return;
    }
    if(typeof syncTransactionDate==="function"){
        syncTransactionDate();
    }
    if(bottomSheet){
        bottomSheet.classList.add("show");
    }
    if(fabButton){
        fabButton.style.display="none";
    }
    sheetState="open";
}

function closeBottomSheet(){
    if(typeof clearTransactionForm==="function"){
        clearTransactionForm();
    }
    if(bottomSheet){
        bottomSheet.classList.remove("show");
    }
    if(fabButton){
        fabButton.style.display="flex";
    }
    sheetState="closed";
}

if(fabButton){
    fabButton.addEventListener("click", function(){
        if(sheetState==="closed"){
            openBottomSheet();
        }
    });
}

if(closeSheetButton){
    closeSheetButton.addEventListener("click", function(e){
        e.stopPropagation();
        closeBottomSheet();
    });
}

document.addEventListener("keydown", function(e){
    if(e.key==="Escape"){
        closeBottomSheet();
    }
});

window.addEventListener("click", function(e){
    if(e.target===bottomSheet){
        closeBottomSheet();
    }
});

function showToast(message){
    const toast = document.getElementById("toast");
    if(!toast) return;
    toast.innerHTML = message;
    toast.classList.add("show");
    setTimeout(function(){
        toast.classList.remove("show");
    },2000);
}

const viewAllButton = document.getElementById("viewAllBtn");
if(viewAllButton){
    viewAllButton.onclick=function(){
        openPage("transactions");
    };
}

const netWorthCard = document.getElementById("openNetWorthPage");
const backBtn = document.getElementById("backFromNetWorth");
if(netWorthCard){
    netWorthCard.addEventListener("click",function(){
        if(typeof loadNetWorthSummary==="function"){
            loadNetWorthSummary();
        }
        openPage("netWorth");
    });
}
if(backBtn){
    backBtn.addEventListener("click",function(){
        openPage("home");
    });
}

openPage("home");