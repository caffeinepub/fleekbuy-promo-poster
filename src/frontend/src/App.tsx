/* ─── Brand palette ──────────────────────────────────────────── */
const C = {
  navy: "#0a1628",
  blue: "#1565C0",
  green: "#2E7D32",
  gold: "#FDD835",
  amber: "#FF8F00",
  white: "#ffffff",
  offWhite: "#f0f9ff",
  lightGreen: "#E8F5E9",
  lightBlue: "#E3F2FD",
  ink: "#1a2744",
  emerald: "#00897B",
  cyan: "#0288D1",
};

/* ─── Step Badge ─────────────────────────────────────────────── */
function StepBadge({
  icon,
  label,
  color,
}: { icon: string; label: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        flex: 1,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          boxShadow: `0 4px 14px ${color}55`,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: C.navy,
          textAlign: "center",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Arrow ──────────────────────────────────────────────────── */
function Arrow() {
  return (
    <div style={{ display: "flex", alignItems: "center", paddingBottom: 18 }}>
      <div
        style={{ color: C.gold, fontSize: 22, fontWeight: 900, lineHeight: 1 }}
      >
        →
      </div>
    </div>
  );
}

/* ─── Referral Tree ──────────────────────────────────────────── */
function ReferralTree() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.50)",
        border: "1.5px solid rgba(255,255,255,0.70)",
        borderRadius: 20,
        padding: "18px 14px",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* YOU box */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 100%)`,
            color: C.navy,
            fontWeight: 900,
            fontSize: 18,
            borderRadius: 12,
            padding: "8px 32px",
            boxShadow: `0 4px 18px ${C.gold}55`,
            letterSpacing: "0.06em",
          }}
        >
          👤 YOU
        </div>
      </div>
      {/* Down arrow */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: C.gold,
          fontSize: 20,
          lineHeight: 1.2,
        }}
      >
        ↓
      </div>
      {/* Level 1 label */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span
          style={{
            background: C.cyan,
            color: C.white,
            borderRadius: 999,
            padding: "3px 16px",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          LEVEL 1 — DIRECT REFERRALS
        </span>
      </div>
      {/* Level 1 boxes */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        {["Friend 1", "Friend 2", "Friend 3"].map((f) => (
          <div
            key={f}
            style={{
              background: C.cyan,
              color: C.white,
              borderRadius: 10,
              padding: "6px 10px",
              fontSize: 11,
              fontWeight: 700,
              textAlign: "center",
              flex: 1,
              maxWidth: 80,
            }}
          >
            👤 {f}
          </div>
        ))}
        <div
          style={{
            background: "rgba(2,136,209,0.3)",
            color: C.white,
            borderRadius: 10,
            padding: "6px 8px",
            fontSize: 11,
            fontWeight: 700,
            textAlign: "center",
            flex: 1,
            maxWidth: 60,
            border: `1px dashed ${C.cyan}`,
          }}
        >
          & more
        </div>
      </div>
      {/* Down arrow */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: C.emerald,
          fontSize: 20,
          lineHeight: 1.2,
        }}
      >
        ↓
      </div>
      {/* Level 2 label */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span
          style={{
            background: C.emerald,
            color: C.white,
            borderRadius: 999,
            padding: "3px 16px",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          LEVEL 2 — INDIRECT REFERRALS
        </span>
      </div>
      {/* Level 2 boxes */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {(["Their Friends 1", "Their Friends 2"] as const).map((f) => (
          <div
            key={f}
            style={{
              background: C.emerald,
              color: C.white,
              borderRadius: 10,
              padding: "6px 10px",
              fontSize: 11,
              fontWeight: 700,
              textAlign: "center",
              flex: 1,
            }}
          >
            👥 {f}
          </div>
        ))}
        <div
          style={{
            background: "rgba(0,137,123,0.3)",
            color: C.white,
            borderRadius: 10,
            padding: "6px 8px",
            fontSize: 11,
            fontWeight: 700,
            textAlign: "center",
            flex: 1,
            maxWidth: 60,
            border: `1px dashed ${C.emerald}`,
          }}
        >
          & more
        </div>
      </div>
    </div>
  );
}

/* ─── Earnings Table ─────────────────────────────────────────── */
function EarningsTable() {
  const rows = [
    {
      emoji: "📒",
      product: "Notebooks",
      deal: "Deal 1",
      level1: "₹120/-",
      level2: "₹50/-",
      bg: "rgba(255,255,255,0.04)",
    },
    {
      emoji: "🎒",
      product: "School Bag",
      deal: "Deal 2",
      level1: "₹50/-",
      level2: "₹30/-",
      bg: "rgba(255,255,255,0.08)",
    },
    {
      emoji: "👟",
      product: "Shoes",
      deal: "Deal 3",
      level1: "₹50/-",
      level2: "₹30/-",
      bg: "rgba(255,255,255,0.04)",
    },
  ];

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        border: "1.5px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          background: `linear-gradient(135deg, ${C.blue} 0%, ${C.emerald} 100%)`,
          padding: "12px 8px",
        }}
      >
        <div
          style={{
            color: C.white,
            fontWeight: 900,
            fontSize: 13,
            textAlign: "center",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Product
        </div>
        <div
          style={{
            color: C.gold,
            fontWeight: 900,
            fontSize: 13,
            textAlign: "center",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Level 1
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 10,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Direct
          </div>
        </div>
        <div
          style={{
            color: "#80DEEA",
            fontWeight: 900,
            fontSize: 13,
            textAlign: "center",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Level 2
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 10,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Indirect
          </div>
        </div>
      </div>

      {/* Rows */}
      {rows.map((row, rowIndex) => (
        <div
          key={row.deal}
          data-ocid={`earnings.row.${row.deal.replace(" ", "").toLowerCase()}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: row.bg,
            borderBottom:
              rowIndex < rows.length - 1
                ? "1px solid rgba(255,255,255,0.08)"
                : "none",
            padding: "10px 8px",
            alignItems: "center",
          }}
        >
          {/* Product */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, lineHeight: 1.2 }}>{row.emoji}</div>
            <div
              style={{
                color: C.white,
                fontWeight: 800,
                fontSize: 13,
                lineHeight: 1.3,
              }}
            >
              {row.product}
            </div>
            <div
              style={{
                color: C.gold,
                fontSize: 10,
                fontWeight: 700,
                background: "rgba(253,216,53,0.15)",
                borderRadius: 6,
                padding: "1px 6px",
                display: "inline-block",
                marginTop: 3,
                letterSpacing: "0.06em",
              }}
            >
              {row.deal}
            </div>
          </div>

          {/* Level 1 */}
          <div
            style={{
              textAlign: "center",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                color: "#69F0AE",
                fontWeight: 900,
                fontSize: 22,
                lineHeight: 1.1,
              }}
            >
              {row.level1}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 10,
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              Per Deal
            </div>
          </div>

          {/* Level 2 */}
          <div
            style={{
              textAlign: "center",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                color: "#80D8FF",
                fontWeight: 900,
                fontSize: 22,
                lineHeight: 1.1,
              }}
            >
              {row.level2}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 10,
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              Per Deal
            </div>
          </div>
        </div>
      ))}

      {/* Total row */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(21,101,192,0.5) 0%, rgba(0,137,123,0.5) 100%)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "10px 8px",
          borderTop: "1.5px solid rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: C.white,
            fontWeight: 800,
            fontSize: 12,
          }}
        >
          Max Earn
        </div>
        <div
          style={{
            textAlign: "center",
            borderLeft: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ color: "#69F0AE", fontWeight: 900, fontSize: 18 }}>
            ₹220/-
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
            Per Deal
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            borderLeft: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ color: "#80D8FF", fontWeight: 900, fontSize: 18 }}>
            ₹110/-
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
            Per Deal
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────── */
export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #87CEEB 0%, #b3e0f7 45%, #e0f4ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "fixed",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, #1565C040 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 300,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, #0288D130 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 200,
          right: -50,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content column */}
      <div
        data-ocid="poster.section"
        style={{
          width: "100%",
          maxWidth: 580,
          padding: "28px 16px 40px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ textAlign: "center" }}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <div className="logo-halo">
              <img
                src="/assets/uploads/Fleek-Buy-Logo-Final-01-JPG-1.jpg"
                alt="FleekBuy"
                data-ocid="header.logo"
                style={{
                  height: 110,
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: 12,
                  background: C.white,
                  padding: "10px 28px",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Hero headline */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 100%)`,
              borderRadius: 999,
              padding: "6px 24px",
              marginBottom: 14,
              boxShadow: `0 4px 20px ${C.gold}44`,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: C.navy,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              🤝 Referral Program
            </span>
          </div>

          <div
            style={{
              color: C.navy,
              fontWeight: 900,
              fontSize: 34,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 6,
              textShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Register, Refer
            <br />
            <span style={{ color: C.gold }}>&amp; Earn! 💰</span>
          </div>

          <div
            style={{
              color: "rgba(10,22,40,0.7)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Earn commissions on every deal your friends buy
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div>
          <div
            style={{
              textAlign: "center",
              color: C.gold,
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            ✦ HOW IT WORKS ✦
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              padding: "16px 12px",
              background: "rgba(255,255,255,0.45)",
              borderRadius: 18,
              border: "1.5px solid rgba(255,255,255,0.60)",
              backdropFilter: "blur(8px)",
            }}
          >
            <StepBadge icon="📝" label="Register" color={C.blue} />
            <Arrow />
            <StepBadge icon="📤" label="Refer Friends" color={C.emerald} />
            <Arrow />
            <StepBadge icon="💵" label="Earn Commission" color={C.amber} />
          </div>
        </div>

        {/* ── REFERRAL TREE ── */}
        <div>
          <div
            style={{
              textAlign: "center",
              color: C.gold,
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            ✦ YOUR REFERRAL NETWORK ✦
          </div>
          <ReferralTree />
        </div>

        {/* ── EARNINGS TABLE ── */}
        <div>
          <div
            style={{
              textAlign: "center",
              color: C.gold,
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            ✦ EARN PER DEAL ✦
          </div>
          <EarningsTable />
        </div>

        {/* ── BONUS CALLOUT ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(253,216,53,0.25) 0%, rgba(255,143,0,0.20) 100%)",
            border: `1.5px solid ${C.gold}88`,
            borderRadius: 18,
            padding: "16px 18px",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>💡</div>
          <div>
            <div
              style={{
                color: C.gold,
                fontWeight: 900,
                fontSize: 15,
                marginBottom: 6,
              }}
            >
              2-Level Earning Power!
            </div>
            <div
              style={{
                color: "rgba(10,22,40,0.85)",
                fontSize: 13,
                lineHeight: 1.55,
              }}
            >
              <span style={{ color: C.gold, fontWeight: 800 }}>Level 1</span> —
              Earn when your direct friends buy a deal.
              <br />
              <span style={{ color: "#80D8FF", fontWeight: 800 }}>Level 2</span>{" "}
              — Also earn when your friends' friends buy a deal!
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ borderRadius: 20, overflow: "hidden" }}>
          {/* Gold CTA strip */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 100%)`,
              padding: "18px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: C.navy,
                fontWeight: 900,
                fontSize: 16,
                marginBottom: 4,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              🌐 Visit Us Now
            </div>
            <a
              href="https://www.fleekbuy.in"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.link"
              style={{
                color: C.navy,
                fontWeight: 900,
                fontSize: 26,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              www.fleekbuy.in
            </a>
            <div
              style={{
                color: "rgba(10,22,40,0.6)",
                fontSize: 13,
                fontWeight: 700,
                marginTop: 6,
                letterSpacing: "0.04em",
              }}
            >
              Register Today — Start Earning Immediately!
            </div>
          </div>

          {/* Navy footer with logo */}
          <div
            style={{
              background: C.navy,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src="/assets/uploads/Fleek-Buy-Logo-Final-01-JPG-1.jpg"
              alt="FleekBuy"
              style={{
                height: 44,
                width: "auto",
                objectFit: "contain",
                background: C.white,
                borderRadius: 8,
                padding: "3px 12px",
              }}
            />
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                }}
              >
                © {new Date().getFullYear()} Built with ❤️{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.hostname
                      : "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                  }}
                >
                  caffeine.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
