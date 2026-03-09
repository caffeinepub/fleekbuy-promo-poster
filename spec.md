# FleekBuy GST Bill Book

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Indian GST-compliant bill book system for FleekBuy Private Limited
- Company header with FleekBuy logo, company name, address, GSTIN
- Create new GST invoice: customer name, address, GSTIN (optional), phone, invoice number (auto-generated), invoice date, line items (product name, HSN code, qty, unit price, GST rate), discount
- GST calculation: CGST + SGST for intra-state, IGST for inter-state (toggle)
- Invoice summary: subtotal, discount, taxable amount, CGST, SGST/IGST, grand total
- Invoice list/bill book view: all past invoices with search and filter
- Print/download invoice as printable view
- Edit and delete invoices
- Dashboard: total sales, total GST collected, invoice count

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend (Motoko): Invoice data model with line items, CRUD operations, invoice numbering, search/filter
2. Frontend: Dashboard overview, invoice list with search, create/edit invoice form with GST calculation, printable invoice view with FleekBuy branding and logo
