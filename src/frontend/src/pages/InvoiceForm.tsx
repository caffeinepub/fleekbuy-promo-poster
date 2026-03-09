import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Invoice, LineItem } from "@/types/invoice";
import {
  calcInvoiceTotals,
  calcLineItemTaxable,
  formatINR,
  generateId,
  generateInvoiceNumber,
  getInvoiceById,
  loadInvoices,
  newLineItem,
  saveInvoice,
} from "@/utils/invoice";
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const GST_RATES = [0, 5, 12, 18, 28];

interface InvoiceFormProps {
  editId?: string;
  onSaved: (id: string) => void;
  onCancel: () => void;
}

type Errors = Partial<Record<string, string>>;

function validate(data: Partial<Invoice>, lineItems: LineItem[]): Errors {
  const errors: Errors = {};
  if (!data.customerName?.trim())
    errors.customerName = "Customer name is required";
  if (!data.customerAddress?.trim())
    errors.customerAddress = "Customer address is required";
  if (!data.date) errors.date = "Invoice date is required";
  if (lineItems.length === 0) errors.lineItems = "Add at least one line item";
  for (let i = 0; i < lineItems.length; i++) {
    const item = lineItems[i];
    if (!item.productName.trim())
      errors[`item_${i}_name`] = "Product name required";
    if (item.quantity <= 0) errors[`item_${i}_qty`] = "Qty must be > 0";
    if (item.unitPrice < 0) errors[`item_${i}_price`] = "Price must be ≥ 0";
  }
  return errors;
}

export default function InvoiceForm({
  editId,
  onSaved,
  onCancel,
}: InvoiceFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState(today);
  const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerGSTIN, setCustomerGSTIN] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([newLineItem()]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  // Load existing invoice for edit
  useEffect(() => {
    if (editId) {
      const inv = getInvoiceById(editId);
      if (inv) {
        setInvoiceNumber(inv.invoiceNumber);
        setDate(inv.date);
        setSupplyType(inv.supplyType);
        setCustomerName(inv.customerName);
        setCustomerAddress(inv.customerAddress);
        setCustomerGSTIN(inv.customerGSTIN);
        setCustomerPhone(inv.customerPhone);
        setLineItems(
          inv.lineItems.length > 0 ? inv.lineItems : [newLineItem()],
        );
        setDiscountAmount(inv.discountAmount);
        setNotes(inv.notes);
      }
    } else {
      setInvoiceNumber(generateInvoiceNumber());
    }
  }, [editId]);

  const totals = useMemo(
    () => calcInvoiceTotals(lineItems, discountAmount, supplyType),
    [lineItems, discountAmount, supplyType],
  );

  const updateItem = (
    id: string,
    field: keyof LineItem,
    value: string | number,
  ) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const removeItem = (id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = () => {
    setLineItems((prev) => [...prev, newLineItem()]);
  };

  const handleSave = async () => {
    const errs = validate({ customerName, customerAddress, date }, lineItems);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fix the errors before saving");
      return;
    }
    setSaving(true);
    try {
      const invoices = loadInvoices();
      const invoice: Invoice = {
        id: editId ?? generateId(),
        invoiceNumber,
        date,
        supplyType,
        customerName: customerName.trim(),
        customerAddress: customerAddress.trim(),
        customerGSTIN: customerGSTIN.trim(),
        customerPhone: customerPhone.trim(),
        lineItems,
        discountAmount,
        notes: notes.trim(),
        createdAt: editId
          ? (invoices.find((i) => i.id === editId)?.createdAt ?? Date.now())
          : Date.now(),
      };
      saveInvoice(invoice);
      toast.success(editId ? "Invoice updated!" : "Invoice created!");
      onSaved(invoice.id);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-ocid="invoice_form.section" className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          data-ocid="invoice_form.cancel_button"
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            {editId ? "Edit Invoice" : "New Invoice"}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {editId ? `Editing ${invoiceNumber}` : "Create a new GST invoice"}
          </p>
        </div>
      </div>

      {/* Invoice Details */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">
            Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Invoice Number */}
            <div className="space-y-1.5">
              <Label
                htmlFor="invoice-number"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Invoice Number
              </Label>
              <Input
                data-ocid="invoice_form.input"
                id="invoice-number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="FB-2026-001"
              />
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <Label
                htmlFor="invoice-date"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Invoice Date <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid="invoice_form.input"
                id="invoice-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && (
                <p
                  data-ocid="invoice_form.error_state"
                  className="text-xs text-destructive"
                >
                  {errors.date}
                </p>
              )}
            </div>

            {/* Supply Type */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Supply Type
              </Label>
              <ToggleGroup
                data-ocid="invoice_form.toggle"
                type="single"
                value={supplyType}
                onValueChange={(v) =>
                  v && setSupplyType(v as "intra" | "inter")
                }
                className="justify-start"
              >
                <ToggleGroupItem
                  value="intra"
                  className="text-xs flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  Intra-State (CGST+SGST)
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="inter"
                  className="text-xs flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  Inter-State (IGST)
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">
            Customer Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="cust-name"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Customer Name <span className="text-destructive">*</span>
              </Label>
              <Input
                data-ocid="invoice_form.input"
                id="cust-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Rajesh Kumar"
              />
              {errors.customerName && (
                <p
                  data-ocid="invoice_form.error_state"
                  className="text-xs text-destructive"
                >
                  {errors.customerName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="cust-phone"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Phone Number
              </Label>
              <Input
                data-ocid="invoice_form.input"
                id="cust-phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="98765 43210"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label
                htmlFor="cust-address"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Customer Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                data-ocid="invoice_form.textarea"
                id="cust-address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="123, Main Street, City, State - PIN"
                rows={2}
              />
              {errors.customerAddress && (
                <p
                  data-ocid="invoice_form.error_state"
                  className="text-xs text-destructive"
                >
                  {errors.customerAddress}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="cust-gstin"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Customer GSTIN (Optional)
              </Label>
              <Input
                data-ocid="invoice_form.input"
                id="cust-gstin"
                value={customerGSTIN}
                onChange={(e) => setCustomerGSTIN(e.target.value.toUpperCase())}
                placeholder="29ABCDE1234F1Z5"
                maxLength={15}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base">Line Items</CardTitle>
            <Button
              data-ocid="invoice_form.secondary_button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="gap-1.5 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Item
            </Button>
          </div>
          {errors.lineItems && (
            <p
              data-ocid="invoice_form.error_state"
              className="text-xs text-destructive"
            >
              {errors.lineItems}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-3 p-3 sm:p-6">
          {/* Desktop table header */}
          <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_0.8fr_1fr_0.8fr_1fr_auto] gap-2 px-1">
            {[
              "Product Name",
              "HSN Code",
              "Qty",
              "Unit Price (₹)",
              "GST %",
              "Amount",
              "",
            ].map((h) => (
              <div
                key={h}
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {h}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {lineItems.map((item, idx) => (
              <div
                key={item.id}
                data-ocid={`invoice_form.item.${idx + 1}`}
                className="p-3 rounded-lg bg-muted/30 border border-border/50 space-y-3 lg:space-y-0 lg:grid lg:grid-cols-[2fr_1fr_0.8fr_1fr_0.8fr_1fr_auto] lg:gap-2 lg:items-start lg:bg-transparent lg:border-0 lg:p-0"
              >
                {/* Product Name */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground lg:hidden">
                    Product Name *
                  </Label>
                  <Input
                    data-ocid={`invoice_form.input.${idx + 1}`}
                    value={item.productName}
                    onChange={(e) =>
                      updateItem(item.id, "productName", e.target.value)
                    }
                    placeholder="Product name"
                    className="text-sm"
                  />
                  {errors[`item_${idx}_name`] && (
                    <p className="text-xs text-destructive">
                      {errors[`item_${idx}_name`]}
                    </p>
                  )}
                </div>

                {/* HSN Code */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground lg:hidden">
                    HSN Code
                  </Label>
                  <Input
                    value={item.hsnCode}
                    onChange={(e) =>
                      updateItem(item.id, "hsnCode", e.target.value)
                    }
                    placeholder="HSN"
                    className="text-sm"
                  />
                </div>

                {/* Qty */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground lg:hidden">
                    Qty *
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "quantity",
                        Number.parseFloat(e.target.value) || 0,
                      )
                    }
                    className="text-sm"
                  />
                  {errors[`item_${idx}_qty`] && (
                    <p className="text-xs text-destructive">
                      {errors[`item_${idx}_qty`]}
                    </p>
                  )}
                </div>

                {/* Unit Price */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground lg:hidden">
                    Unit Price (₹) *
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "unitPrice",
                        Number.parseFloat(e.target.value) || 0,
                      )
                    }
                    className="text-sm"
                  />
                  {errors[`item_${idx}_price`] && (
                    <p className="text-xs text-destructive">
                      {errors[`item_${idx}_price`]}
                    </p>
                  )}
                </div>

                {/* GST Rate */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground lg:hidden">
                    GST %
                  </Label>
                  <Select
                    value={String(item.gstRate)}
                    onValueChange={(v) =>
                      updateItem(item.id, "gstRate", Number.parseInt(v))
                    }
                  >
                    <SelectTrigger
                      data-ocid={`invoice_form.select.${idx + 1}`}
                      className="text-sm"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GST_RATES.map((r) => (
                        <SelectItem key={r} value={String(r)}>
                          {r}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount (read-only) */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground lg:hidden">
                    Amount
                  </Label>
                  <div className="h-9 px-3 flex items-center rounded-md bg-muted/60 text-sm font-semibold text-foreground border border-border/50">
                    {formatINR(calcLineItemTaxable(item))}
                  </div>
                </div>

                {/* Delete */}
                <div className="flex justify-end lg:justify-center lg:pt-0 pt-1">
                  <Button
                    data-ocid={`invoice_form.delete_button.${idx + 1}`}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                    disabled={lineItems.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Discount */}
          <Separator className="my-4" />
          <div className="flex items-center justify-end gap-3">
            <Label
              htmlFor="discount"
              className="text-sm font-medium text-muted-foreground shrink-0"
            >
              Discount Amount (₹)
            </Label>
            <Input
              data-ocid="invoice_form.input"
              id="discount"
              type="number"
              min="0"
              step="0.01"
              value={discountAmount}
              onChange={(e) =>
                setDiscountAmount(Number.parseFloat(e.target.value) || 0)
              }
              className="w-36 text-sm text-right"
            />
          </div>
        </CardContent>
      </Card>

      {/* GST Summary Box */}
      <Card className="shadow-card border-2 border-primary/20 bg-primary/[0.02]">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base text-primary">
            GST Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatINR(totals.subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-700">
              <span>Discount</span>
              <span>- {formatINR(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxable Amount</span>
            <span className="font-medium">
              {formatINR(totals.taxableAmount)}
            </span>
          </div>

          {totals.gstBreakdown.length > 0 && (
            <>
              <Separator className="my-2" />
              {totals.gstBreakdown.map((b) =>
                supplyType === "intra" ? (
                  <div key={b.rate}>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>CGST @ {b.rate / 2}%</span>
                      <span>{formatINR(b.cgst ?? 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>SGST @ {b.rate / 2}%</span>
                      <span>{formatINR(b.sgst ?? 0)}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    key={b.rate}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span>IGST @ {b.rate}%</span>
                    <span>{formatINR(b.igst ?? 0)}</span>
                  </div>
                ),
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total GST</span>
                <span className="font-medium">
                  {formatINR(totals.totalGST)}
                </span>
              </div>
            </>
          )}

          <Separator className="my-2" />
          <div className="flex justify-between text-base font-bold text-foreground">
            <span>Grand Total</span>
            <span className="text-primary text-lg">
              {formatINR(totals.grandTotal)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            data-ocid="invoice_form.textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Payment terms, bank details, or any other notes..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          data-ocid="invoice_form.cancel_button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          data-ocid="invoice_form.submit_button"
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 min-w-[120px]"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />{" "}
              {editId ? "Update Invoice" : "Save Invoice"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
