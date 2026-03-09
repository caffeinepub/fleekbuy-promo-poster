export interface LineItem {
  id: string;
  productName: string;
  hsnCode: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // 0, 5, 12, 18, 28
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerAddress: string;
  customerGSTIN: string;
  customerPhone: string;
  supplyType: "intra" | "inter";
  lineItems: LineItem[];
  discountAmount: number;
  notes: string;
  createdAt: number;
}

export interface GSTBreakdown {
  rate: number;
  taxableAmount: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  gstBreakdown: GSTBreakdown[];
  totalGST: number;
  grandTotal: number;
}
