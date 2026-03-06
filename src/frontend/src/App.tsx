import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

// Deal section colors
const BLUE = "#1a4f9d";
const GREEN = "#3aaa35";
const YELLOW = "#f5a623";
const RED = "#e53e3e";

function FreeBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute top-2 right-2 z-10 ${className}`}
      style={{
        background: RED,
        color: "#fff",
        fontWeight: 900,
        fontSize: "0.75rem",
        padding: "3px 8px",
        borderRadius: "20px",
        letterSpacing: "0.05em",
        boxShadow: "0 2px 6px rgba(229,62,62,0.5)",
        textTransform: "uppercase",
      }}
    >
      FREE!
    </span>
  );
}

function DealBadge({ number, color }: { number: number; color: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: color,
        color: "#fff",
        borderRadius: "20px",
        padding: "4px 14px",
        fontWeight: 800,
        fontSize: "0.8rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        boxShadow: `0 3px 10px ${color}60`,
        marginBottom: "8px",
      }}
    >
      ⭐ DEAL {number}
    </div>
  );
}

function ProductImage({
  src,
  alt,
  label,
  showFree = false,
}: {
  src: string;
  alt: string;
  label: string;
  showFree?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center" style={{ flex: 1 }}>
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "12px",
          border: "2px solid #e5e7eb",
          background: "#f9fafb",
          width: "100%",
          aspectRatio: "1 / 1",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {showFree && <FreeBadge />}
      </div>
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: "#374151",
          marginTop: "6px",
          textAlign: "center",
          lineHeight: "1.2",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function SectionHeader({
  color,
  title,
  subtitle,
}: {
  color: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        background: color,
        borderRadius: "10px 10px 0 0",
        padding: "10px 16px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontWeight: 900,
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          lineHeight: "1.2",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.75rem",
            fontWeight: 600,
            marginTop: "2px",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

function Deal1() {
  return (
    <motion.div
      className="deal-card"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        border: `2px solid ${BLUE}30`,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      data-ocid="deal1.card"
    >
      <SectionHeader
        color={BLUE}
        title="📚 Buy 10 Notebooks @ ₹1020/-"
        subtitle="And Get Amazing FREE Gifts!"
      />

      <div style={{ padding: "14px" }}>
        <DealBadge number={1} color={BLUE} />

        {/* Product images */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <ProductImage
            src="/assets/generated/notebooks-new-design.dim_400x400.jpg"
            alt="10 Notebooks"
            label="10 Notebooks 📚"
          />
          <ProductImage
            src="/assets/generated/notebooks-new-design.dim_400x400.jpg"
            alt="10 Notebooks FREE"
            label="10 Notebooks FREE"
            showFree
          />
          <ProductImage
            src="/assets/generated/badminton-rackets-pair.dim_400x400.jpg"
            alt="Badminton Racket Pair"
            label="Badminton Pair FREE"
            showFree
          />
        </div>

        {/* Deal details box */}
        <div
          style={{
            background: "#f0f7ff",
            border: `1px solid ${BLUE}30`,
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: "0.78rem",
              color: "#1e3a5f",
              lineHeight: "1.7",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>📖</span>
              <span>
                <strong>Buy:</strong> 10 Notebooks — MRP ₹1020/-
              </span>
            </div>
            <div
              style={{
                marginTop: "6px",
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
              }}
            >
              <span>🎁</span>
              <span>
                <strong>Get FREE:</strong> 10 Notebooks (worth ₹520/-) + <br />1
                Badminton Pair (worth ₹150/-)
              </span>
            </div>
            <div
              style={{
                borderTop: `1px dashed ${BLUE}40`,
                paddingTop: "8px",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>🏷️</span>
              <span>
                Total value: <strong>₹1690/-</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Big price callout */}
        <div
          className="shimmer-gold"
          style={{
            borderRadius: "10px",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#7c4a00",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            YOU PAY ONLY
          </div>
          <div
            style={{
              fontSize: "2.2rem",
              fontWeight: 900,
              color: "#1a1a1a",
              lineHeight: "1.1",
            }}
          >
            ₹1000<span style={{ fontSize: "1.2rem" }}>/-</span>
          </div>
          <div
            className="pulse-badge"
            style={{
              display: "inline-block",
              background: RED,
              color: "#fff",
              borderRadius: "20px",
              padding: "3px 14px",
              fontSize: "0.75rem",
              fontWeight: 800,
              marginTop: "4px",
              letterSpacing: "0.05em",
            }}
          >
            🔥 SAVE ₹690/-!
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Deal2() {
  return (
    <motion.div
      className="deal-card"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        border: `2px solid ${GREEN}30`,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      data-ocid="deal2.card"
    >
      <SectionHeader
        color={GREEN}
        title="🎒 School Bag with Rain Cover"
        subtitle="Worth ₹565/- — Pencil Case FREE!"
      />

      <div style={{ padding: "14px" }}>
        <DealBadge number={2} color={GREEN} />

        {/* Product images */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <ProductImage
            src="/assets/generated/school-bag-with-rain-cover.dim_400x400.jpg"
            alt="School Bag with Rain Cover"
            label="School Bag + Rain Cover"
          />
          <ProductImage
            src="/assets/generated/pencil-case-only.dim_400x400.jpg"
            alt="Pencil Case FREE"
            label="Pencil Case FREE!"
            showFree
          />
        </div>

        {/* Deal details */}
        <div
          style={{
            background: "#f0fdf4",
            border: `1px solid ${GREEN}30`,
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{ fontSize: "0.78rem", color: "#14532d", lineHeight: "1.7" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🎒</span>
              <span>
                <strong>School Bag with Rain Cover</strong> — Worth ₹565/-
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              <span>🎁</span>
              <span>
                Get <strong>Pencil Case ABSOLUTELY FREE!</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            background: `linear-gradient(135deg, ${GREEN}, #2d8829)`,
            borderRadius: "10px",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Price
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "#fff",
              lineHeight: "1.1",
            }}
          >
            ₹565<span style={{ fontSize: "1rem" }}>/-</span>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.72rem",
              fontWeight: 600,
            }}
          >
            + Pencil Case worth ₹100/- FREE
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Deal3() {
  const prices = ["₹479/-", "₹489/-", "₹499/-"];

  return (
    <motion.div
      className="deal-card"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        border: `2px solid ${BLUE}30`,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      data-ocid="deal3.card"
    >
      <SectionHeader
        color={BLUE}
        title="👟 School Shoes — Boys & Girls"
        subtitle="For 6th to 10th Class Students"
      />

      <div style={{ padding: "14px" }}>
        <DealBadge number={3} color={BLUE} />

        {/* Product images — 3 in a row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <ProductImage
            src="/assets/generated/boys-school-shoes.dim_400x400.jpg"
            alt="Boys School Shoes"
            label="Boys Shoes 👦"
          />
          <ProductImage
            src="/assets/generated/girls-school-shoes.dim_400x400.jpg"
            alt="Girls School Shoes"
            label="Girls Shoes 👧"
          />
          <ProductImage
            src="/assets/generated/shoes-strap-design.dim_400x400.jpg"
            alt="Strap Design"
            label="Strap Design ✨"
          />
        </div>

        {/* Price chips */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              color: "#6b7280",
              fontWeight: 600,
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Choose Your Size — Starting From
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {prices.map((price) => (
              <span
                key={price}
                style={{
                  background:
                    price === "₹479/-"
                      ? BLUE
                      : price === "₹489/-"
                        ? GREEN
                        : YELLOW,
                  color: price === "₹499/-" ? "#1a1a1a" : "#fff",
                  borderRadius: "20px",
                  padding: "5px 14px",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                  boxShadow:
                    price === "₹479/-"
                      ? `0 2px 8px ${BLUE}40`
                      : price === "₹489/-"
                        ? `0 2px 8px ${GREEN}40`
                        : `0 2px 8px ${YELLOW}40`,
                }}
                data-ocid="deal3.price.item"
              >
                {price}
              </span>
            ))}
          </div>
        </div>

        {/* Class info */}
        <div
          style={{
            background: "#f8f9fa",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px 12px",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#374151",
            fontWeight: 600,
          }}
        >
          🎓 Suitable for <strong>6th to 10th Class</strong> — Boys & Girls Both
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f4fd 0%, #f0fdf4 50%, #fff8e6 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "16px 8px 40px",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {/* Poster wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
            border: "2px solid rgba(26,79,157,0.15)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, ${BLUE} 0%, #1e3a8a 100%)`,
              padding: "20px 16px 14px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: -20,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(58,170,53,0.15)",
              }}
            />

            {/* Logo */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "12px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <img
                src="/assets/uploads/IMG-20260306-WA0088-1.jpg"
                alt="FleekBuy Logo"
                style={{
                  height: "70px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                  background: "#fff",
                  padding: "6px 12px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                }}
                data-ocid="header.logo"
              />
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              style={{
                background: `linear-gradient(90deg, ${GREEN}, #2d8829)`,
                borderRadius: "25px",
                padding: "8px 20px",
                display: "inline-block",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "1.05rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                🎒 BACK TO SCHOOL MEGA SALE! 🎒
              </div>
            </motion.div>

            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.7rem",
                marginTop: "8px",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              ✦ Limited Time Offer ✦
            </div>
          </div>

          {/* Deals */}
          <div
            style={{
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
            }}
          >
            <Deal1 />
            <Deal2 />
            <Deal3 />
          </div>

          {/* Footer */}
          <div
            style={{
              background: `linear-gradient(135deg, ${BLUE}, #1e3a8a)`,
              padding: "16px",
              textAlign: "center",
            }}
          >
            {/* Logo small */}
            <img
              src="/assets/uploads/IMG-20260306-WA0088-1.jpg"
              alt="FleekBuy"
              style={{
                height: "40px",
                width: "auto",
                objectFit: "contain",
                background: "#fff",
                borderRadius: "8px",
                padding: "4px 10px",
                marginBottom: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />

            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.7rem",
                marginBottom: "4px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Visit us at
            </div>

            <a
              href="https://www.fleekbuy.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: YELLOW,
                fontWeight: 900,
                fontSize: "1.15rem",
                textDecoration: "none",
                letterSpacing: "0.03em",
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                display: "inline-block",
                borderBottom: `2px solid ${YELLOW}60`,
                paddingBottom: "1px",
              }}
              data-ocid="footer.link"
            >
              🌐 www.fleekbuy.in
            </a>

            <div
              style={{
                marginTop: "12px",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.6rem",
                letterSpacing: "0.04em",
              }}
            >
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
