import type { Invoice, LineItem } from "../types/invoice";
import { generateId, loadInvoices, saveInvoices } from "./invoice";

const SEED_KEY = "fleekbuy_seeded_v1";

function id() {
  return generateId();
}

const sampleInvoices: Invoice[] = [
  {
    id: id(),
    invoiceNumber: "FB-2026-001",
    date: "2026-03-01",
    supplyType: "intra",
    customerName: "Rajesh Kumar Sharma",
    customerAddress: "45, Gandhi Nagar, Jaipur, Rajasthan - 302015",
    customerGSTIN: "08ABCDE1234F1Z5",
    customerPhone: "9876543210",
    lineItems: [
      {
        id: id(),
        productName: "5-Subject Spiral Notebook (Pack of 10)",
        hsnCode: "4820",
        quantity: 2,
        unitPrice: 510,
        gstRate: 12,
      },
      {
        id: id(),
        productName: "Badminton Racket Set (Pair)",
        hsnCode: "9506",
        quantity: 1,
        unitPrice: 150,
        gstRate: 18,
      },
    ] as LineItem[],
    discountAmount: 50,
    notes: "Payment received via UPI. Thank you for shopping with FleekBuy!",
    createdAt: new Date("2026-03-01").getTime(),
  },
  {
    id: id(),
    invoiceNumber: "FB-2026-002",
    date: "2026-03-03",
    supplyType: "inter",
    customerName: "Priya Venkataraman",
    customerAddress: "12, Koramangala 5th Block, Bengaluru, Karnataka - 560034",
    customerGSTIN: "29XYZAB9876K1Z3",
    customerPhone: "8765432109",
    lineItems: [
      {
        id: id(),
        productName: "School Bag with Rain Cover (Blue)",
        hsnCode: "4202",
        quantity: 1,
        unitPrice: 565,
        gstRate: 12,
      },
      {
        id: id(),
        productName: "Pencil Case (Zip Pouch)",
        hsnCode: "4202",
        quantity: 1,
        unitPrice: 75,
        gstRate: 12,
      },
    ] as LineItem[],
    discountAmount: 0,
    notes: "Back to school offer. Delivery within 3-5 business days.",
    createdAt: new Date("2026-03-03").getTime(),
  },
  {
    id: id(),
    invoiceNumber: "FB-2026-003",
    date: "2026-03-05",
    supplyType: "intra",
    customerName: "Mohammed Aslam Khan",
    customerAddress: "Shop No. 7, Sadar Bazar, Delhi - 110006",
    customerGSTIN: "",
    customerPhone: "9988776655",
    lineItems: [
      {
        id: id(),
        productName: "School Shoes Boys (Black, Size 7)",
        hsnCode: "6403",
        quantity: 2,
        unitPrice: 479,
        gstRate: 18,
      },
      {
        id: id(),
        productName: "School Shoes Girls (Black Strap, Size 5)",
        hsnCode: "6403",
        quantity: 1,
        unitPrice: 499,
        gstRate: 18,
      },
    ] as LineItem[],
    discountAmount: 100,
    notes: "Exchange policy: 7 days from purchase with original bill.",
    createdAt: new Date("2026-03-05").getTime(),
  },
  {
    id: id(),
    invoiceNumber: "FB-2026-004",
    date: "2026-03-07",
    supplyType: "intra",
    customerName: "Sunita Devi Patel",
    customerAddress: "22, Civil Lines, Allahabad, Uttar Pradesh - 211001",
    customerGSTIN: "",
    customerPhone: "7654321098",
    lineItems: [
      {
        id: id(),
        productName: "A4 Ruled Notebook (200 pages, Pack of 10)",
        hsnCode: "4820",
        quantity: 1,
        unitPrice: 1020,
        gstRate: 12,
      },
      {
        id: id(),
        productName: "Geometry Box (Premium Set)",
        hsnCode: "9017",
        quantity: 3,
        unitPrice: 85,
        gstRate: 18,
      },
    ] as LineItem[],
    discountAmount: 0,
    notes: "",
    createdAt: new Date("2026-03-07").getTime(),
  },
];

export function seedIfEmpty() {
  if (localStorage.getItem(SEED_KEY)) return;
  const existing = loadInvoices();
  if (existing.length > 0) return;
  saveInvoices(sampleInvoices);
  localStorage.setItem(SEED_KEY, "1");
}
