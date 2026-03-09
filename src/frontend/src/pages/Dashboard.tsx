import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  calcInvoiceTotals,
  formatDate,
  formatINR,
  loadInvoices,
} from "@/utils/invoice";
import { FileText, IndianRupee, Plus, Receipt, TrendingUp } from "lucide-react";
import { useMemo } from "react";

interface DashboardProps {
  onNewInvoice: () => void;
  onViewInvoice: (id: string) => void;
}

export default function Dashboard({
  onNewInvoice,
  onViewInvoice,
}: DashboardProps) {
  const invoices = useMemo(() => loadInvoices(), []);

  const stats = useMemo(() => {
    let totalSales = 0;
    let totalGST = 0;
    for (const inv of invoices) {
      const t = calcInvoiceTotals(
        inv.lineItems,
        inv.discountAmount,
        inv.supplyType,
      );
      totalSales += t.grandTotal;
      totalGST += t.totalGST;
    }
    return { totalInvoices: invoices.length, totalSales, totalGST };
  }, [invoices]);

  const recentInvoices = useMemo(() => invoices.slice(0, 5), [invoices]);

  const statCards = [
    {
      title: "Total Invoices",
      value: stats.totalInvoices.toString(),
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Sales",
      value: formatINR(stats.totalSales),
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total GST Collected",
      value: formatINR(stats.totalGST),
      icon: Receipt,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Avg Invoice Value",
      value:
        stats.totalInvoices > 0
          ? formatINR(stats.totalSales / stats.totalInvoices)
          : formatINR(0),
      icon: IndianRupee,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div data-ocid="dashboard.section" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Overview of your billing activity
          </p>
        </div>
        <Button
          data-ocid="dashboard.primary_button"
          onClick={onNewInvoice}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Card
            key={card.title}
            data-ocid={`dashboard.card.${i + 1}`}
            className="shadow-card border-border/60"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {card.title}
                  </p>
                  <p className="text-lg font-bold text-foreground truncate">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0 ml-2`}
                >
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Invoices */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-lg">
              Recent Invoices
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              Last 5
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentInvoices.length === 0 ? (
            <div
              data-ocid="dashboard.empty_state"
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">
                No invoices yet
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first GST invoice to get started
              </p>
              <Button
                data-ocid="dashboard.secondary_button"
                onClick={onNewInvoice}
                variant="outline"
                size="sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Create Invoice
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="dashboard.table">
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
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                      Grand Total
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide text-right">
                      GST
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((inv, idx) => {
                    const totals = calcInvoiceTotals(
                      inv.lineItems,
                      inv.discountAmount,
                      inv.supplyType,
                    );
                    return (
                      <TableRow
                        key={inv.id}
                        data-ocid={`dashboard.row.${idx + 1}`}
                        className="cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => onViewInvoice(inv.id)}
                      >
                        <TableCell>
                          <span className="font-semibold text-primary text-sm">
                            {inv.invoiceNumber}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
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
                        <TableCell className="text-right font-semibold text-sm">
                          {formatINR(totals.grandTotal)}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {formatINR(totals.totalGST)}
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
    </div>
  );
}
