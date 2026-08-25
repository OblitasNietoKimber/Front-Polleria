import { Flame, ShoppingCart } from "lucide-react";

export default function SiteHeader({ view, cartCount, onHome, onCatalog, onOpenCart }) {
  return (
    <nav className="lys-nav">
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <button
          onClick={onHome}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
        >
          <span className="lys-logo-badge">
            <Flame size={19} color="var(--ember)" strokeWidth={2} />
          </span>
          <span className="font-display" style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--ember)" }}>
            Leña y Sabores
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <button className={`lys-navlink ${view === "home" ? "active" : ""}`} onClick={onHome}>Inicio</button>
          <button className={`lys-navlink ${view === "catalog" ? "active" : ""}`} onClick={onCatalog}>Menú</button>
          <button
            onClick={onOpenCart}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "var(--ink)", display: "flex", alignItems: "center" }}
            aria-label="Ver carrito"
          >
            <ShoppingCart size={22} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="badge-count" style={{ position: "absolute", top: -8, right: -10 }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}