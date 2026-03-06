import { motion } from "motion/react";

/* ─── Brand palette ──────────────────────────────────────────── */
const C = {
  navy: "#0a1628",
  crimson: "#e63946",
  gold: "#f4a621",
  teal: "#0d9488",
  sky: "#38bdf8",
  lime: "#84cc16",
  white: "#ffffff",
  offWhite: "#f8fafc",
  ink: "#1e293b",
  muted: "#64748b",
};

/* ─── Helpers ────────────────────────────────────────────────── */
function Pill({
  children,
  bg,
  color = C.white,
  size = "sm",
}: {
  children: React.ReactNode;
  bg: string;
  color?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span
      style={{
        background: bg,
        color,
        borderRadius: 999,
        padding: size === "lg" ? "6px 18px" : "3px 12px",
        fontWeight: 800,
        fontSize: size === "lg" ? "0.85rem" : "0.68rem",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        display: "inline-block",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}

/* ─── Deal Card ──────────────────────────────────────────────── */
function DealCard({
  index,
  accentColor,
  badge,
  title,
  subtitle,
  images,
  price,
  originalPrice,
  saving,
  details,
  freeLabel,
  delay,
}: {
  index: number;
  accentColor: string;
  badge: string;
  title: string;
  subtitle?: string;
  images: {
    src: string;
    alt: string;
    caption: string;
    isFree?: boolean;
    fullImage?: boolean;
  }[];
  price: string;
  originalPrice?: string;
  saving?: string;
  details: string[];
  freeLabel?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      data-ocid={`deal${index}.card`}
      style={{
        background: C.white,
        borderRadius: 20,
        overflow: "visible",
        position: "relative",
        boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {/* Colored top strip */}
      <div
        style={{
          background: accentColor,
          borderRadius: "20px 20px 0 0",
          padding: "14px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "relative",
        }}
      >
        <Pill bg="rgba(255,255,255,0.25)" color={C.white} size="sm">
          {badge}
        </Pill>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: "1rem",
            color: C.white,
            flexShrink: 0,
          }}
        >
          {index}
        </div>
        <div>
          <div
            style={{
              color: C.white,
              fontWeight: 900,
              fontSize: "1.05rem",
              lineHeight: 1.2,
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.72rem",
                fontWeight: 600,
                marginTop: 2,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Images row */}
      <div
        style={{
          padding: "16px 16px 0",
          display: "flex",
          gap: 10,
        }}
      >
        {images.map((img) => (
          <div
            key={img.alt}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: 14,
                overflow: "hidden",
                border: "none",
                background: C.offWhite,
                position: "relative",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: img.fullImage ? "contain" : "cover",
                  objectPosition: "center",
                  display: "block",
                  padding: img.fullImage ? 4 : 0,
                }}
              />
              {img.isFree && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: C.crimson,
                    color: C.white,
                    textAlign: "center",
                    fontWeight: 900,
                    fontSize: "0.65rem",
                    padding: "3px 0",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  FREE!
                </div>
              )}
            </div>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: C.ink,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {img.caption}
            </span>
          </div>
        ))}
      </div>

      {/* Details + price row */}
      <div
        style={{
          padding: "14px 16px 16px",
          display: "flex",
          gap: 12,
          alignItems: "flex-end",
        }}
      >
        {/* Details list */}
        <div style={{ flex: 1 }}>
          {details.map((d) => (
            <div
              key={d}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                marginBottom: 5,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: accentColor,
                  flexShrink: 0,
                  marginTop: 5,
                }}
              />
              <span
                style={{
                  fontSize: "0.72rem",
                  color: C.ink,
                  lineHeight: 1.5,
                }}
              >
                {d}
              </span>
            </div>
          ))}
          {freeLabel && (
            <div
              style={{
                marginTop: 8,
                background: `${accentColor}15`,
                border: `1px dashed ${accentColor}60`,
                borderRadius: 8,
                padding: "5px 10px",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: accentColor,
              }}
            >
              🎁 {freeLabel}
            </div>
          )}
        </div>

        {/* Price block */}
        <div
          style={{
            flexShrink: 0,
            background: C.navy,
            borderRadius: 14,
            padding: "10px 14px",
            textAlign: "center",
            minWidth: 100,
            position: "relative",
          }}
        >
          {saving && (
            <div
              style={{
                background: C.crimson,
                color: C.white,
                borderRadius: 8,
                padding: "3px 8px",
                fontWeight: 800,
                fontSize: "0.62rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 6,
                display: "inline-block",
              }}
            >
              {saving}
            </div>
          )}
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            You Pay
          </div>
          <div
            style={{
              color: C.gold,
              fontWeight: 900,
              fontSize: "1.6rem",
              lineHeight: 1.1,
              marginTop: 2,
            }}
          >
            {price}
          </div>
          {originalPrice && (
            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.62rem",
                textDecoration: "line-through",
                marginTop: 2,
              }}
            >
              {originalPrice}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main App ───────────────────────────────────────────────── */
export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #0a1628 0%, #102040 40%, #0d3050 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 0 60px",
        fontFamily: "'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* ── Hero Header ── */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: 28,
          }}
        >
          {/* Decorative blobs */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -80,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.gold}30 0%, transparent 70%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: -50,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.sky}25 0%, transparent 70%)`,
            }}
          />

          {/* Logo zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 36,
              marginBottom: 20,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="logo-halo">
              <img
                src="/assets/uploads/IMG-20260219-WA0039-1.jpg"
                alt="FleekBuy"
                style={{
                  height: 150,
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: 16,
                  background: C.white,
                  padding: "12px 28px",
                  display: "block",
                }}
                data-ocid="header.logo"
              />
            </div>
          </motion.div>

          {/* Sale headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              textAlign: "center",
              position: "relative",
              zIndex: 2,
              padding: "0 20px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.crimson,
                borderRadius: 999,
                padding: "5px 18px",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: C.white,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ⚡ Limited Time Offer
              </span>
            </div>

            <div
              style={{
                color: C.white,
                fontWeight: 900,
                fontSize: "2rem",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 8,
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              Back to School
              <br />
              <span style={{ color: C.gold }}>Mega Sale! 🎒</span>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Best deals on notebooks, bags & shoes
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
              padding: "0 20px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {[
              { num: "3", label: "Hot Deals" },
              { num: "₹690", label: "Max Savings" },
              { num: "FREE", label: "Gifts Inside" },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  padding: "10px 6px",
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    color: C.gold,
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Deal Cards ── */}
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <DealCard
            index={1}
            accentColor={C.sky}
            badge="Deal 1"
            title="10 Notebooks @ ₹1020/-"
            subtitle="Get notebooks + badminton pair absolutely FREE!"
            images={[
              {
                src: "/assets/generated/notebooks-hd.dim_600x600.jpg",
                alt: "10 Notebooks",
                caption: "10 Notebooks",
              },
              {
                src: "/assets/generated/notebooks-hd.dim_600x600.jpg",
                alt: "Free Notebooks",
                caption: "10 Notebooks",
                isFree: true,
              },
              {
                src: "/assets/generated/badminton-hd.dim_600x600.jpg",
                alt: "Badminton Pair",
                caption: "Badminton Pair",
                isFree: true,
              },
            ]}
            price="₹1000"
            originalPrice="₹1690"
            saving="Save ₹690!"
            details={[
              "Buy 10 Notebooks — MRP ₹1020/-",
              "Get 10 Notebooks FREE (MRP ₹520/-)",
              "Get 1 Badminton Pair FREE (MRP ₹150/-)",
              "Total value ₹1690/-",
            ]}
            delay={0.1}
          />

          <DealCard
            index={2}
            accentColor={C.teal}
            badge="Deal 2"
            title="School Bag with Rain Cover"
            subtitle="Pencil Case absolutely FREE!"
            images={[
              {
                src: "/assets/generated/school-bag-with-rain-cover-combo.dim_600x400.jpg",
                alt: "School Bag with Rain Cover",
                caption: "Bag + Rain Cover",
              },
              {
                src: "/assets/generated/pencilcase-hd.dim_600x600.jpg",
                alt: "Pencil Case",
                caption: "Pencil Case",
                isFree: true,
              },
            ]}
            price="₹565"
            details={[
              "School Bag with Rain Cover — ₹565/-",
              "Pencil Case FREE (MRP ₹100/-)",
            ]}
            freeLabel="Pencil Case MRP ₹100/- FREE!"
            delay={0.22}
          />

          <DealCard
            index={3}
            accentColor={C.lime}
            badge="Deal 3"
            title="School Shoes — Boys & Girls"
            subtitle="For 6th to 10th Class students"
            images={[
              {
                src: "/assets/uploads/IMG-20260221-WA0018-3-1.jpg",
                alt: "Boys Black School Shoes",
                caption: "Boys Shoes 👦",
                fullImage: true,
              },
              {
                src: "/assets/uploads/IMG_20260307_030747-1.jpg",
                alt: "Girls Black School Shoes",
                caption: "Girls Shoes 👧",
                fullImage: true,
              },
            ]}
            price="₹479+"
            details={[
              "Boys Shoes — ₹479/- | ₹489/- | ₹499/-",
              "Girls Shoes — ₹479/- | ₹489/- | ₹499/-",
              "Suitable for 6th to 10th Class",
            ]}
            delay={0.34}
          />
        </div>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            margin: "24px 16px 0",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* CTA strip */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.gold} 0%, #f97316 100%)`,
              padding: "20px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: C.navy,
                fontWeight: 900,
                fontSize: "1.1rem",
                marginBottom: 4,
                letterSpacing: "-0.01em",
              }}
            >
              Shop Now at
            </div>
            <a
              href="https://www.fleekbuy.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: C.navy,
                fontWeight: 900,
                fontSize: "1.6rem",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                display: "block",
                lineHeight: 1.1,
              }}
              data-ocid="footer.link"
            >
              🌐 www.fleekbuy.in
            </a>
            <div
              style={{
                color: "rgba(10,22,40,0.6)",
                fontSize: "0.68rem",
                fontWeight: 600,
                marginTop: 8,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Hurry — Limited Stock Available!
            </div>
          </div>

          {/* Logo footer */}
          <div
            style={{
              background: C.navy,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src="/assets/uploads/IMG-20260219-WA0039-1.jpg"
              alt="FleekBuy"
              style={{
                height: 44,
                width: "auto",
                objectFit: "contain",
                background: C.white,
                borderRadius: 8,
                padding: "4px 12px",
              }}
            />
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.04em",
                }}
              >
                © {new Date().getFullYear()} Built with{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.hostname
                      : "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  caffeine.ai
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
