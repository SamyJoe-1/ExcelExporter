# Excel Export App

A simple Node.js app with a UI to preview data and export it as a styled `.xlsx` file.

## Requirements
- Node.js v18+ (tested on v22.16.0)

## Install & Run

```bash
npm install
npm start
```

Then open → http://localhost:3000

## How it works

| File | Role |
|---|---|
| `index.js` | Express server entry point |
| `routes/export.js` | `GET /api/data` → JSON · `GET /api/export` → .xlsx stream |
| `data/employees.js` | Sample data (swap with your DB / array) |
| `public/index.html` | UI: table preview + Export button |

## Swap your own data
Edit `data/employees.js` — replace the array with anything (DB query result, CSV parse, etc.).  
Update the column definitions in `routes/export.js` (`sheet.columns`) to match your fields.

## Endpoints
- `GET /api/data`   → returns JSON array
- `GET /api/export` → streams an `.xlsx` file download
