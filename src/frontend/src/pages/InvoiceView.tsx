import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  amountToWords,
  calcInvoiceTotals,
  formatDate,
  formatINR,
  getInvoiceById,
} from "@/utils/invoice";
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useMemo } from "react";

interface InvoiceViewProps {
  invoiceId: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

// Company settings — in production these could come from a settings store
const COMPANY = {
  name: "FleekBuy Private Limited",
  gstin: "Enter GSTIN",
  website: "www.fleekbuy.in",
  logo: "/assets/uploads/Fleek-Buy-Logo-Final-01-JPG-1.jpg",
};

export default function InvoiceView({
  invoiceId,
  onBack,
  onEdit,
}: InvoiceViewProps) {
  const invoice = useMemo(() => getInvoiceById(invoiceId), [invoiceId]);

  const totals = useMemo(
    () =>
      invoice
        ? calcInvoiceTotals(
            invoice.lineItems,
            invoice.discountAmount,
            invoice.supplyType,
          )
        : null,
    [invoice],
  );

  if (!invoice || !totals) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-semibold text-foreground mb-2">
          Invoice not found
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          The invoice you are looking for does not exist.
        </p>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Go Back
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div data-ocid="invoice_view.section">
      {/* Action bar — hidden on print */}
      <div className="no-print flex items-center gap-3 mb-5">
        <Button
          data-ocid="invoice_view.cancel_button"
          variant="ghost"
          size="icon"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-display text-foreground">
            Invoice Preview
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {invoice.invoiceNumber}
          </p>
        </div>
        <Button
          data-ocid="invoice_view.edit_button"
          variant="outline"
          onClick={() => onEdit(invoice.id)}
          className="gap-2"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
        <Button
          data-ocid="invoice_view.primary_button"
          onClick={handlePrint}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Printer className="w-4 h-4" />
          Print / Save PDF
        </Button>
      </div>

      {/* Invoice Print Area */}
      <div
        data-ocid="invoice_view.card"
        className="invoice-print-area bg-white border border-gray-200 rounded-xl shadow-card max-w-4xl mx-auto overflow-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", Arial, sans-serif' }}
      >
        {/* ─── HEADER ─── */}
        <div
          className="px-8 py-6"
          style={{
            background:
              "linear-gradient(135deg, #1565C0 0%, #1976D2 60%, #1565C0 100%)",
          }}
        >
          <div className="flex items-start justify-between gap-6">
            {/* Logo + Company */}
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-2 shadow-sm">
                <img
                  src={COMPANY.logo}
                  alt="FleekBuy"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {COMPANY.name}
                </h2>
                <div className="text-blue-100 text-sm mt-0.5">
                  {COMPANY.website}
                </div>
                <div className="text-blue-100 text-xs mt-1 font-mono">
                  GSTIN: {COMPANY.gstin}
                </div>
              </div>
            </div>

            {/* Invoice Badge */}
            <div className="text-right shrink-0">
              <div
                className="text-white font-bold text-3xl tracking-tight"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
              >
                TAX INVOICE
              </div>
              <div className="mt-2 text-blue-100 text-sm space-y-0.5">
                <div>
                  <span className="opacity-75">Invoice No.: </span>
                  <strong className="text-white">
                    {invoice.invoiceNumber}
                  </strong>
                </div>
                <div>
                  <span className="opacity-75">Date: </span>
                  <strong className="text-white">
                    {formatDate(invoice.date)}
                  </strong>
                </div>
                <div className="mt-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    {invoice.supplyType === "intra"
                      ? "Intra-State Supply"
                      : "Inter-State Supply"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CUSTOMER DETAILS ─── */}
        <div className="px-8 py-5 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-6">
            {/* Bill To */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Bill To
              </div>
              <div className="font-bold text-gray-900 text-base">
                {invoice.customerName}
              </div>
              <div className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                {invoice.customerAddress}
              </div>
              {invoice.customerGSTIN && (
                <div className="text-gray-500 text-xs mt-1.5 font-mono">
                  GSTIN: {invoice.customerGSTIN}
                </div>
              )}
              {invoice.customerPhone && (
                <div className="text-gray-500 text-sm mt-1">
                  📞 {invoice.customerPhone}
                </div>
              )}
            </div>

            {/* Supply Info */}
            <div className="flex flex-col items-end text-right">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Supply Info
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>
                  <span className="text-gray-400">Type: </span>
                  <Badge
                    variant={
                      invoice.supplyType === "intra" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {invoice.supplyType === "intra" ? "CGST + SGST" : "IGST"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── LINE ITEMS TABLE ─── */}
        <div className="px-8 py-4">
          <table
            className="w-full text-sm"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {[
                  "Sr.",
                  "Product / Description",
                  "HSN",
                  "Qty",
                  "Rate (₹)",
                  "Taxable Amt",
                  "GST%",
                  "Tax Amt",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2.5 px-2.5 text-xs font-bold uppercase tracking-wide text-gray-500 border-b-2 border-gray-200"
                    style={
                      h === "Sr."
                        ? { width: "36px" }
                        : h === "HSN"
                          ? { width: "80px" }
                          : undefined
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item, idx) => {
                const taxable = item.quantity * item.unitPrice;
                const taxAmt = taxable * (item.gstRate / 100);
                return (
                  <tr
                    key={item.id}
                    style={{ background: idx % 2 === 0 ? "#fff" : "#FAFBFD" }}
                  >
                    <td className="py-2.5 px-2.5 text-gray-500 text-xs border-b border-gray-100">
                      {idx + 1}
                    </td>
                    <td className="py-2.5 px-2.5 font-medium text-gray-900 border-b border-gray-100">
                      {item.productName}
                    </td>
                    <td className="py-2.5 px-2.5 text-gray-500 font-mono text-xs border-b border-gray-100">
                      {item.hsnCode || "—"}
                    </td>
                    <td className="py-2.5 px-2.5 text-gray-700 border-b border-gray-100">
                      {item.quantity}
                    </td>
                    <td className="py-2.5 px-2.5 text-gray-700 border-b border-gray-100">
                      {formatINR(item.unitPrice)}
                    </td>
                    <td className="py-2.5 px-2.5 text-gray-700 border-b border-gray-100">
                      {formatINR(taxable)}
                    </td>
                    <td className="py-2.5 px-2.5 text-gray-700 border-b border-gray-100">
                      {item.gstRate}%
                    </td>
                    <td className="py-2.5 px-2.5 text-gray-700 border-b border-gray-100">
                      {formatINR(taxAmt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ─── TAX SUMMARY + TOTALS ─── */}
        <div className="px-8 pb-5">
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Tax Breakdown */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Tax Breakdown
              </div>
              <table
                className="w-full text-xs"
                style={{ borderCollapse: "collapse" }}
              >
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    <th className="text-left py-2 px-2 font-semibold text-gray-500 border-b border-gray-200">
                      Taxable Amt
                    </th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-500 border-b border-gray-200">
                      GST Rate
                    </th>
                    {invoice.supplyType === "intra" ? (
                      <>
                        <th className="text-right py-2 px-2 font-semibold text-gray-500 border-b border-gray-200">
                          CGST
                        </th>
                        <th className="text-right py-2 px-2 font-semibold text-gray-500 border-b border-gray-200">
                          SGST
                        </th>
                      </>
                    ) : (
                      <th className="text-right py-2 px-2 font-semibold text-gray-500 border-b border-gray-200">
                        IGST
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {totals.gstBreakdown.map((b) => (
                    <tr key={b.rate} className="border-b border-gray-100">
                      <td className="py-1.5 px-2 text-gray-700">
                        {formatINR(b.taxableAmount)}
                      </td>
                      <td className="py-1.5 px-2 text-gray-700">{b.rate}%</td>
                      {invoice.supplyType === "intra" ? (
                        <>
                          <td className="py-1.5 px-2 text-gray-700 text-right">
                            {formatINR(b.cgst ?? 0)}
                          </td>
                          <td className="py-1.5 px-2 text-gray-700 text-right">
                            {formatINR(b.sgst ?? 0)}
                          </td>
                        </>
                      ) : (
                        <td className="py-1.5 px-2 text-gray-700 text-right">
                          {formatINR(b.igst ?? 0)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Invoice Totals
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800">
                    {formatINR(totals.subtotal)}
                  </span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>- {formatINR(totals.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Taxable Amount</span>
                  <span className="text-gray-800">
                    {formatINR(totals.taxableAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total GST</span>
                  <span className="text-gray-800">
                    {formatINR(totals.totalGST)}
                  </span>
                </div>
                <Separator className="my-1.5" />
                <div
                  className="flex justify-between items-center py-2 px-3 rounded-lg font-bold"
                  style={{ background: "#EBF4FF" }}
                >
                  <span className="text-blue-900 text-base">Grand Total</span>
                  <span className="text-blue-700 text-xl">
                    {formatINR(totals.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Amount in Words */}
          <div
            className="mt-5 p-3 rounded-lg text-sm"
            style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}
          >
            <span className="font-semibold text-green-800">
              Amount in Words:{" "}
            </span>
            <span className="text-green-700 italic">
              {amountToWords(totals.grandTotal)}
            </span>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Notes
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {invoice.notes}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-xs text-gray-400">
              This is a computer-generated invoice.
            </div>
            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Authorised Signature
              </div>
              <div className="border-t border-gray-300 pt-1 text-xs text-gray-500 min-w-[140px]">
                {COMPANY.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
