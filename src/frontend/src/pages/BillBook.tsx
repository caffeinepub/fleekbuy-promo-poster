import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Invoice } from "@/types/invoice";
import {
  calcInvoiceTotals,
  deleteInvoice,
  formatDate,
  formatINR,
  loadInvoices,
} from "@/utils/invoice";
import { Eye, FileText, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface BillBookProps {
  onNewInvoice: () => void;
  onViewInvoice: (id: string) => void;
  onEditInvoice: (id: string) => void;
  refreshKey: number;
}

export default function BillBook({
  onNewInvoice,
  onViewInvoice,
  onEditInvoice,
  refreshKey,
}: BillBookProps) {
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadInvoices());

  // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey is a prop-controlled reload signal
  useEffect(() => {
    setInvoices(loadInvoices());
  }, [refreshKey]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return invoices;
    return invoices.filter(
      (inv) =>
        inv.customerName.toLowerCase().includes(q) ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.customerPhone.includes(q),
    );
  }, [invoices, search]);

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    deleteInvoice(deleteTarget.id);
    setDeleteTarget(null);
    // Trigger refresh by navigating back to same page
    window.location.reload();
  }, [deleteTarget]);

  return (
    <div data-ocid="billbook.section" className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Bill Book
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Button
          data-ocid="billbook.primary_button"
          onClick={onNewInvoice}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="billbook.search_input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by customer name or invoice no..."
                className="pl-9"
              />
            </div>
            {search && (
              <span className="text-sm text-muted-foreground">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div
              data-ocid="billbook.empty_state"
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">
                {search ? "No matching invoices" : "No invoices yet"}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {search
                  ? "Try a different search term"
                  : "Create your first invoice to get started"}
              </p>
              {!search && (
                <Button
                  data-ocid="billbook.secondary_button"
                  onClick={onNewInvoice}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Create Invoice
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="billbook.table">
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Invoice No.
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Customer
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Type
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                      Amount
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                      GST
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                      Grand Total
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((inv, idx) => {
                    const totals = calcInvoiceTotals(
                      inv.lineItems,
                      inv.discountAmount,
                      inv.supplyType,
                    );
                    return (
                      <TableRow
                        key={inv.id}
                        data-ocid={`billbook.row.${idx + 1}`}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <TableCell>
                          <span className="font-semibold text-primary text-sm">
                            {inv.invoiceNumber}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {formatDate(inv.date)}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-sm">
                            {inv.customerName}
                          </div>
                          {inv.customerPhone && (
                            <div className="text-xs text-muted-foreground">
                              {inv.customerPhone}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              inv.supplyType === "intra"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {inv.supplyType === "intra"
                              ? "Intra-State"
                              : "Inter-State"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {formatINR(totals.taxableAmount)}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {formatINR(totals.totalGST)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-sm">
                          {formatINR(totals.grandTotal)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              data-ocid={`billbook.edit_button.${idx + 1}`}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => onViewInvoice(inv.id)}
                              title="View Invoice"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              data-ocid={`billbook.secondary_button.${idx + 1}`}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                              onClick={() => onEditInvoice(inv.id)}
                              title="Edit Invoice"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              data-ocid={`billbook.delete_button.${idx + 1}`}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => setDeleteTarget(inv)}
                              title="Delete Invoice"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="billbook.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete invoice{" "}
              <strong>{deleteTarget?.invoiceNumber}</strong> for{" "}
              <strong>{deleteTarget?.customerName}</strong>. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="billbook.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="billbook.confirm_button"
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Invoice
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
