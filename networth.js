const ASSET_KEY = "MP_ASSETS";
const LIABILITY_KEY = "MP_LIABILITIES";

function getAssets(){
    const saved = localStorage.getItem(ASSET_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveAssets(assets){
    localStorage.setItem(ASSET_KEY, JSON.stringify(assets));
}

function getLiabilities(){
    const saved = localStorage.getItem(LIABILITY_KEY);
    return saved ? JSON.parse(saved) : [];
}

function formatCurrency(amount){
    return "₹" + Number(amount).toLocaleString("en-IN");
}

function loadNetWorthSummary(){
    const cashBalance = document.getElementById("cashBalance");
    const investment = document.getElementById("investmentTotal");
    const cashBalanceWorth = document.getElementById("cashBalanceWorth");
    const investmentWorth = document.getElementById("investmentWorth");
    const assetTotal = document.getElementById("assetTotal");
    const liabilityTotal = document.getElementById("liabilityTotal");
    const totalWorthValue = document.getElementById("totalWorthValue");
    
    if(cashBalance && cashBalanceWorth){
        cashBalanceWorth.textContent = cashBalance.textContent;
    }
    if(investment && investmentWorth){
        investmentWorth.textContent = investment.textContent;
    }
    
    const assets = getAssets();
    const totalAssets = assets.reduce((sum, asset)=>sum + Number(asset.amount), 0);
    if(assetTotal) assetTotal.textContent = formatCurrency(totalAssets);
    
    const liabilities = getLiabilities();
    const totalLiabilities = liabilities.reduce((sum, item)=>sum + Number(item.amount), 0);
    if(liabilityTotal) liabilityTotal.textContent = formatCurrency(totalLiabilities);
    
    const cash = cashBalance ? Number(cashBalance.textContent.replace(/[₹,]/g, "")) : 0;
    if(totalWorthValue) totalWorthValue.textContent = formatCurrency(cash + totalAssets - totalLiabilities);
    
    renderAssets();
    renderLiabilities();
}

function renderAssets(){
    const assetList = document.getElementById("assetList");
    if(!assetList) return;
    const assets = getAssets();
    if(assets.length===0){
        assetList.innerHTML=`<div class='emptyState'><div class='emptyIcon'>🏦</div><p>No Assets Yet</p><span>Add your first asset.</span></div>`;
        return;
    }
    assetList.innerHTML="";
    assets.forEach(asset=>{
        assetList.innerHTML+=`<div class='assetCard'><div class='assetInfo'><h4>${getAssetIcon(asset.category)} ${asset.category}</h4><p>${asset.description || "No Description"}</p></div><div class='assetRight'><h3>${formatCurrency(asset.amount)}</h3></div></div>`;
    });
}

function renderLiabilities(){
    const liabilityList = document.getElementById("liabilityList");
    if(!liabilityList) return;
    const liabilities = getLiabilities();
    if(liabilities.length===0){
        liabilityList.innerHTML=`<div class='emptyState'><div class='emptyIcon'>💳</div><p>No Liabilities Yet</p><span>Add your first liability.</span></div>`;
        return;
    }
    liabilityList.innerHTML="";
    liabilities.forEach(liability=>{
        liabilityList.innerHTML+=`<div class='assetCard'><div class='assetInfo'><h4>${getLiabilityIcon(liability.category)} ${liability.category}</h4><p>${liability.description || "No Description"}</p></div><div class='assetRight'><h3>${formatCurrency(liability.amount)}</h3></div></div>`;
    });
}

function getAssetIcon(category){
    const map = {House:'🏠', Flat:'🏢', Land:'🌾', Plot:'📍', Vehicle:'🚗', Gold:'🥇', 'Mutual Fund':'📈', Stocks:'💹', FD:'🏦', Cash:'💵', Business:'💼'};
    return map[category] || '📦';
}

function getLiabilityIcon(category){
    const map = {'Home Loan':'🏠', 'Car Loan':'🚗', 'Personal Loan':'💰', 'Business Loan':'🏢', 'Credit Card':'💳'};
    return map[category] || '📄';
}