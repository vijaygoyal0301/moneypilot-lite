# MoneyPilot Lite V3

A lightweight personal finance dashboard inspired by the MoneyPilot Lite V3 UI.

## Features

- 💰 Dark glassmorphism mobile dashboard
- 📊 Cash balance, income, expense, investment and saving cards
- 📋 Recent transactions list
- 🔍 Transaction filters and search
- 📈 Financial analytics and net worth pages
- ➕ Floating action button and bottom sheet for adding transactions
- 🔐 PIN lock screen with security question recovery
- 💾 Local persistence using browser localStorage

## Live Demo

View live at: https://vijaygoyal0301.github.io/moneypilot-lite/

## Run Locally

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then visit: http://localhost:8000

## GitHub Pages

This project is deployed as a static GitHub Pages site.

Your live URL: **https://vijaygoyal0301.github.io/moneypilot-lite/**

## Files

- `index.html` – Page structure and markup
- `style.css` – Styling and layout
- `script.js` – Interactivity and app logic
- `manifest.json` – PWA manifest

## First Time Setup

1. On first launch, create a name and 6-digit PIN
2. Set up a security question for PIN recovery
3. Unlock with your PIN on return visits
4. Use the + button to add transactions
5. Switch between Home, Transactions, Analytics, Net Worth, and Settings

## Features

### Dashboard
- Cash balance card
- Income, expense, investment, and savings stats
- Total net worth card
- Recent transactions preview

### Transactions
- Add new transactions with bottom sheet
- Search and filter by type and category
- View full transaction history by month

### Analytics
- Monthly expense breakdown
- Fixed vs variable expense tracking

### Net Worth
- Total net worth calculation
- Assets and liabilities tracking

### Settings
- Profile management
- Export/import backup
- Reset data
- App lock settings

## Notes

This is a front-end clone focused on layout and behavior. All data is stored locally in the browser using localStorage.
