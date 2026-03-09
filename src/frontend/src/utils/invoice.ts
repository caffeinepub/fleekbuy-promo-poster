import type {
  GSTBreakdown,
  Invoice,
  InvoiceTotals,
  LineItem,
} from "../types/invoice";

const STORAGE_KEY = "fleekbuy_invoices";

// ─── Storage ─────────────────────────────────────────────────────────────────

export function loadInvoices(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Invoice[];
  } catch {
    return [];
  }
}

export function saveInvoices(invoices: Invoice[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

export function saveInvoice(invoice: Invoice): void {
  const invoices = loadInvoices();
  const idx = invoices.findIndex((i) => i.id === invoice.id);
  if (idx >= 0) {
    invoices[idx] = invoice;
  } else {
    invoices.unshift(invoice);
  }
  saveInvoices(invoices);
}

export function deleteInvoice(id: string): void {
  const invoices = loadInvoices().filter((i) => i.id !== id);
  saveInvoices(invoices);
}

export function getInvoiceById(id: string): Invoice | undefined {
  return loadInvoices().find((i) => i.id === id);
}

// ─── Auto-number ──────────────────────────────────────────────────────────────

export function generateInvoiceNumber(): string {
  const invoices = loadInvoices();
  const year = new Date().getFullYear();
  const num = invoices.length + 1;
  return `FB-${year}-${String(num).padStart(3, "0")}`;
}

// ─── GST Calculations ─────────────────────────────────────────────────────────

export function calcLineItemTaxable(item: LineItem): number {
  return item.quantity * item.unitPrice;
}

export function calcInvoiceTotals(
  lineItems: LineItem[],
  discountAmount: number,
  supplyType: "intra" | "inter",
): InvoiceTotals {
  const subtotal = lineItems.reduce(
    (acc, item) => acc + calcLineItemTaxable(item),
    0,
  );
  const taxableTotal = Math.max(0, subtotal - discountAmount);

  // Proportion each line item's taxable after discount
  const discountRatio = subtotal > 0 ? taxableTotal / subtotal : 0;

  // Group by GST rate
  const rateMap = new Map<number, number>();
  for (const item of lineItems) {
    const taxable = calcLineItemTaxable(item) * discountRatio;
    rateMap.set(item.gstRate, (rateMap.get(item.gstRate) ?? 0) + taxable);
  }

  const gstBreakdown: GSTBreakdown[] = [];
  let totalGST = 0;

  for (const [rate, taxable] of rateMap.entries()) {
    if (supplyType === "intra") {
      const each = (taxable * (rate / 100)) / 2;
      gstBreakdown.push({
        rate,
        taxableAmount: taxable,
        cgst: each,
        sgst: each,
      });
      totalGST += each * 2;
    } else {
      const igst = taxable * (rate / 100);
      gstBreakdown.push({ rate, taxableAmount: taxable, igst });
      totalGST += igst;
    }
  }

  // Sort by rate
  gstBreakdown.sort((a, b) => a.rate - b.rate);

  return {
    subtotal,
    discountAmount,
    taxableAmount: taxableTotal,
    gstBreakdown,
    totalGST,
    grandTotal: taxableTotal + totalGST,
  };
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Number to Words ──────────────────────────────────────────────────────────

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function numToWordsBelowThousand(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return `${tens[t]}${o > 0 ? ` ${ones[o]}` : ""}`;
}

function numToWordsIndian(n: number): string {
  if (n === 0) return "Zero";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = Math.floor((n % 1000) / 100);
  const rest = n % 100;

  const parts: string[] = [];
  if (crore > 0) parts.push(`${numToWordsBelowThousand(crore)} Crore`);
  if (lakh > 0) parts.push(`${numToWordsBelowThousand(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${numToWordsBelowThousand(thousand)} Thousand`);
  if (hundred > 0) parts.push(`${ones[hundred]} Hundred`);
  if (rest > 0) parts.push(numToWordsBelowThousand(rest));

  return parts.join(" ");
}

export function amountToWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let result = `Rupees ${numToWordsIndian(rupees)}`;
  if (paise > 0) {
    result += ` and ${numToWordsIndian(paise)} Paise`;
  }
  return `${result} Only`;
}

// ─── ID Generator ─────────────────────────────────────────────────────────────

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function newLineItem(): LineItem {
  return {
    id: generateId(),
    productName: "",
    hsnCode: "",
    quantity: 1,
    unitPrice: 0,
    gstRate: 18,
  };
}
