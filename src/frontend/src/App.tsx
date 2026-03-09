import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { seedIfEmpty } from "@/utils/seed";
import { BookOpen, Building2, FilePlus2, LayoutDashboard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import BillBook from "./pages/BillBook";
import Dashboard from "./pages/Dashboard";
import InvoiceForm from "./pages/InvoiceForm";
import InvoiceView from "./pages/InvoiceView";

type View =
  | { type: "dashboard" }
  | { type: "billbook" }
  | { type: "new-invoice" }
  | { type: "edit-invoice"; id: string }
  | { type: "view-invoice"; id: string };

export default function App() {
  const [view, setView] = useState<View>({ type: "dashboard" });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    seedIfEmpty();
    setRefreshKey((k) => k + 1);
  }, []);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const navItems = [
    { type: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { type: "billbook" as const, label: "Bill Book", icon: BookOpen },
    { type: "new-invoice" as const, label: "New Invoice", icon: FilePlus2 },
  ];

  const activeNav =
    view.type === "edit-invoice" || view.type === "new-invoice"
      ? "new-invoice"
      : view.type === "view-invoice"
        ? "billbook"
        : view.type;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster richColors position="top-right" />

      {/* ─── TOP NAVBAR ─── */}
      <header
        data-ocid="nav.section"
        className="no-print sticky top-0 z-40 border-b border-border/60 bg-white/95 backdrop-blur-sm shadow-xs"
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mr-2">
            <div className="logo-halo">
              <img
                src="/assets/uploads/Fleek-Buy-Logo-Final-01-JPG-1.jpg"
                alt="FleekBuy"
                className="h-8 w-auto object-contain rounded-md bg-white"
                style={{ padding: "2px 8px" }}
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-foreground leading-tight font-display">
                FleekBuy
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                GST Bill Book
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav data-ocid="nav.panel" className="flex items-center gap-1 flex-1">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.type}
                data-ocid={`nav.${item.type.replace("-", "_")}.link`}
                onClick={() => setView({ type: item.type })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeNav === item.type
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Company info */}
          <div className="hidden md:flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              FleekBuy Private Limited
            </span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
              GST
            </Badge>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {view.type === "dashboard" && (
          <Dashboard
            onNewInvoice={() => setView({ type: "new-invoice" })}
            onViewInvoice={(id) => setView({ type: "view-invoice", id })}
            key={refreshKey}
          />
        )}

        {view.type === "billbook" && (
          <BillBook
            onNewInvoice={() => setView({ type: "new-invoice" })}
            onViewInvoice={(id) => setView({ type: "view-invoice", id })}
            onEditInvoice={(id) => setView({ type: "edit-invoice", id })}
            refreshKey={refreshKey}
            key={refreshKey}
          />
        )}

        {view.type === "new-invoice" && (
          <InvoiceForm
            onSaved={(id) => {
              refresh();
              setView({ type: "view-invoice", id });
            }}
            onCancel={() => setView({ type: "billbook" })}
          />
        )}

        {view.type === "edit-invoice" && (
          <InvoiceForm
            editId={view.id}
            onSaved={(id) => {
              refresh();
              setView({ type: "view-invoice", id });
            }}
            onCancel={() => setView({ type: "view-invoice", id: view.id })}
          />
        )}

        {view.type === "view-invoice" && (
          <InvoiceView
            invoiceId={view.id}
            onBack={() => setView({ type: "billbook" })}
            onEdit={(id) => setView({ type: "edit-invoice", id })}
            key={view.id}
          />
        )}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="no-print border-t border-border/60 bg-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} FleekBuy Private Limited · All rights
            reserved
          </div>
          <div className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
