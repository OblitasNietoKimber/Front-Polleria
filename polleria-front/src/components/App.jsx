import React, { useMemo, useState } from "react";
import {
  Flame, Search, ArrowLeft,
  
} from "lucide-react";
import CategoryIcon from "./CategoryIcon";
import SiteHeader from "./SiteHeader";
import ProductDetailModal from "./ProductDetailModal";
import CartDrawer from "./CartDrawer";
import DeliveryForm from "./DeliveryForm";
import PaymentMethod from "./PaymentMethod";
import { OrderSummary, OrderConfirmation } from "./OrderSummary";
import { CATEGORIES, DELIVERY_COST, PRODUCTS } from "../data/menu";
import { money } from "../utils/currency";

export default function LenasYSaboresApp() {
  const [view, setView] = useState("home"); // home | catalog | checkout | confirmation
  const [cart, setCart] = useState({}); // { productId: qty }
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [form, setForm] = useState({ name: "", address: "", reference: "", phone: "" });
  const [payment, setPayment] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
        .filter((x) => x.product && x.qty > 0),
    [cart]
  );
  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);
  const subtotal = cartItems.reduce((a, i) => a + i.qty * i.product.price, 0);
  const shipping = deliveryType === "delivery" && subtotal > 0 ? DELIVERY_COST : 0;
  const total = subtotal + shipping;

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "todos" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function addToCart(id, qty = 1) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
  }
  function setQty(id, qty) {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }
  function removeItem(id) {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }

  function goToCatalog(catId) {
    setActiveCategory(catId || "todos");
    setView("catalog");
    window.scrollTo?.(0, 0);
  }

  function validateDelivery() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Ingresa tu nombre.";
    if (!form.phone.trim()) errs.phone = "Ingresa un teléfono de contacto.";
    if (deliveryType === "delivery" && !form.address.trim()) errs.address = "Ingresa tu dirección.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function confirmOrder() {
    const num = "LS-" + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(num);
    setView("confirmation");
  }

  function resetAll() {
    setCart({});
    setForm({ name: "", address: "", reference: "", phone: "" });
    setPayment("");
    setDeliveryType("delivery");
    setCheckoutStep(1);
    setOrderNumber(null);
    setView("home");
  }

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", background: "var(--cream)", color: "var(--ink)", minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root {
          --char: #17130F;
          --cream: #FFFFFF;
          --paper: #FFFFFF;
          --ember: #E23A32;
          --rust: #B32B24;
          --gold: #E8A33D;
          --ink: #17130F;
          --smoke: #6E655D;
          --line: #E7E2DA;
        }
        * { box-sizing: border-box; }
        .lys-root { position: relative; }
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }

        .lys-nav {
          background: #FFFFFF;
          color: var(--ink);
          border-bottom: 1px solid var(--line);
          position: sticky; top: 0; z-index: 40;
        }
        .lys-logo-badge {
          width: 38px; height: 38px; border-radius: 50%; background: var(--char);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .lys-navlink {
          font-size: 0.9rem; font-weight: 500;
          color: #57534C; background: none; border: none; cursor: pointer;
          padding: 6px 4px; transition: color .15s ease;
        }
        .lys-navlink:hover, .lys-navlink.active { color: var(--ember); }

        .btn-ember {
          background: var(--ember); color: #fff; border: none; border-radius: 3px;
          padding: 12px 22px; font-weight: 600; letter-spacing: .02em; cursor: pointer;
          transition: transform .12s ease, background .15s ease;
        }
        .btn-ember:hover { background: var(--rust); }
        .btn-ember:active { transform: scale(0.98); }
        .btn-ember:disabled { background: #C9BEB0; cursor: not-allowed; }

        .btn-outline {
          background: transparent; color: var(--ink); border: 1.5px solid var(--ink);
          border-radius: 3px; padding: 11px 20px; font-weight: 600; cursor: pointer;
          transition: all .15s ease;
        }
        .btn-outline:hover { background: var(--ink); color: var(--cream); }

        .ticket-card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-top: none;
          position: relative;
          transition: transform .15s ease, box-shadow .15s ease;
          cursor: pointer;
        }
        .ticket-card::before {
          content: "";
          display: block;
          height: 6px;
          background-image: repeating-linear-gradient(90deg, var(--ember) 0 10px, transparent 10px 18px);
          opacity: .85;
        }
        .ticket-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(27,21,18,0.12); }

        .chip {
          font-size: 0.78rem; padding: 8px 14px; border-radius: 999px;
          border: 1.5px solid var(--line); background: var(--paper); color: var(--smoke);
          cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;
          transition: all .15s ease; font-weight: 500;
        }
        .chip.active { background: var(--ink); border-color: var(--ink); color: var(--cream); }
        .chip:hover:not(.active) { border-color: var(--ember); color: var(--rust); }

        .lys-input {
          width: 100%; padding: 11px 12px; border: 1.5px solid var(--line); border-radius: 3px;
          background: var(--paper); font-family: inherit; font-size: 0.92rem; color: var(--ink);
          transition: border-color .15s ease;
        }
        .lys-input:focus { outline: none; border-color: var(--ember); }
        .lys-input.err { border-color: #B23A2E; }

        .qty-btn {
          width: 30px; height: 30px; border-radius: 3px; border: 1.5px solid var(--line);
          background: var(--paper); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all .15s ease;
        }
        .qty-btn:hover { border-color: var(--ember); color: var(--ember); }

        .cart-drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: min(420px, 100vw);
          background: var(--paper); z-index: 60; box-shadow: -8px 0 30px rgba(0,0,0,0.18);
          transform: translateX(100%); transition: transform .25s ease;
          display: flex; flex-direction: column;
        }
        .cart-drawer.open { transform: translateX(0); }
        .cart-backdrop {
          position: fixed; inset: 0; background: rgba(27,21,18,0.45); z-index: 55;
          opacity: 0; pointer-events: none; transition: opacity .2s ease;
        }
        .cart-backdrop.open { opacity: 1; pointer-events: auto; }

        .step-stub {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; font-weight: 600;
          padding: 8px 14px; border: 1.5px solid var(--line); color: var(--smoke);
          border-radius: 3px; display: flex; align-items: center; gap: 8px;
        }
        .step-stub.active { border-color: var(--ember); color: var(--ember); background: #FCEDE5; }
        .step-stub.done { border-color: var(--gold); color: var(--rust); background: #FBF3E1; }

        .badge-count {
          background: var(--ember); color: #fff; font-size: 0.68rem; font-weight: 700;
          border-radius: 999px; min-width: 18px; height: 18px; display: flex; align-items: center;
          justify-content: center; padding: 0 4px; font-family: 'IBM Plex Mono', monospace;
        }

        .icon-tile {
          aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #201C18, #3A322B);
          color: var(--ember);
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      <SiteHeader
        view={view}
        cartCount={cartCount}
        onHome={() => setView("home")}
        onCatalog={() => goToCatalog()}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* ---------- HOME ---------- */}
      {view === "home" && (
        <>
          <header style={{ background: "var(--char)", color: "var(--cream)", padding: "70px 20px 90px", position: "relative", overflow: "hidden" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7, background: "var(--gold)", color: "#2A1B05",
                fontSize: "0.8rem", fontWeight: 700, padding: "7px 16px", borderRadius: 999, marginBottom: 20
              }}>
                <Flame size={14} strokeWidth={2.4} /> Pollería a la leña
              </div>
              <h1 className="font-display" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", lineHeight: 1.05, fontWeight: 600, margin: "0 0 20px" }}>
                El sabor que solo <em style={{ color: "var(--ember)", fontStyle: "italic" }}>da la leña</em>.
              </h1>
              <p style={{ color: "#C7C2BB", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto 34px", lineHeight: 1.6 }}>
                Pollos y parrillas cocinados a fuego de leña, con la receta de siempre. Pide online y recíbelo en tu mesa o en tu puerta.
              </p>
              <button className="btn-ember" onClick={() => goToCatalog()}>Ver el menú completo</button>
            </div>
          </header>

          <section style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 20px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
              <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 600 }}>Nuestras categorías</h2>
              <button onClick={() => goToCatalog()} className="lys-navlink" style={{ color: "var(--rust)" }}>Ver todo →</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => goToCatalog(c.id)}
                  className="ticket-card"
                  style={{ textAlign: "left", padding: 0, border: "1px solid var(--line)" }}
                >
                  <div className="icon-tile" style={{ aspectRatio: "3/2" }}>
                    <c.icon size={34} strokeWidth={1.5} />
                  </div>
                  <div style={{ padding: "16px 16px 20px" }}>
                    <div className="font-display" style={{ fontWeight: 600, fontSize: "1.05rem" }}>{c.label}</div>
                    <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--smoke)", marginTop: 4 }}>
                      {PRODUCTS.filter((p) => p.category === c.id).length} productos
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ---------- CATALOG ---------- */}
      {view === "catalog" && (
        <section style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 20px 80px" }}>
          <h1 className="font-display" style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 4 }}>Nuestro menú</h1>
          <p style={{ color: "var(--smoke)", marginBottom: 28 }}>Elige tus platos y arma tu pedido.</p>

          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: "1 1 240px", minWidth: 220 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--smoke)" }} />
              <input
                className="lys-input"
                style={{ paddingLeft: 36 }}
                placeholder="Buscar un plato..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 30 }}>
            <button className={`chip ${activeCategory === "todos" ? "active" : ""}`} onClick={() => setActiveCategory("todos")}>
              Todos
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.id} className={`chip ${activeCategory === c.id ? "active" : ""}`} onClick={() => setActiveCategory(c.id)}>
                <c.icon size={14} strokeWidth={2} /> {c.label}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--smoke)" }}>
              No encontramos platos que coincidan con tu búsqueda.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
              {filteredProducts.map((p) => (
                <div key={p.id} className="ticket-card" onClick={() => setSelectedProduct(p)}>
                  <div className="icon-tile" style={{ opacity: p.available ? 1 : 0.4 }}>
                    <CategoryIcon id={p.category} size={40} />
                  </div>
                  <div style={{ padding: "16px" }}>
                    {!p.available && (
                      <span className="font-mono" style={{ fontSize: "0.68rem", color: "#B23A2E", fontWeight: 700, letterSpacing: "0.05em" }}>
                        NO DISPONIBLE
                      </span>
                    )}
                    <div className="font-display" style={{ fontWeight: 600, fontSize: "1.05rem", margin: "6px 0 6px", opacity: p.available ? 1 : 0.55 }}>
                      {p.name}
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--smoke)", lineHeight: 1.5, marginBottom: 14, minHeight: 40 }}>
                      {p.desc.slice(0, 70)}{p.desc.length > 70 ? "…" : ""}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="font-mono" style={{ fontWeight: 600, color: "var(--rust)", fontSize: "0.98rem" }}>
                        {money(p.price)}
                      </span>
                      <button
                        className="btn-outline"
                        style={{ padding: "7px 14px", fontSize: "0.8rem" }}
                        disabled={!p.available}
                        onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}
                      >
                        {p.available ? "Agregar" : "Agotado"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ---------- CHECKOUT ---------- */}
      {view === "checkout" && (
        <section style={{ maxWidth: 720, margin: "0 auto", padding: "36px 20px 100px" }}>
          <button onClick={() => setView("catalog")} className="lys-navlink" style={{ color: "var(--rust)", display: "flex", alignItems: "center", gap: 6, marginBottom: 22 }}>
            <ArrowLeft size={15} /> Seguir comprando
          </button>

          <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
            <div className={`step-stub ${checkoutStep === 1 ? "active" : checkoutStep > 1 ? "done" : ""}`}>01 · Entrega</div>
            <div className={`step-stub ${checkoutStep === 2 ? "active" : checkoutStep > 2 ? "done" : ""}`}>02 · Pago</div>
            <div className={`step-stub ${checkoutStep === 3 ? "active" : ""}`}>03 · Resumen</div>
          </div>

          {/* STEP 1: DELIVERY */}
          {checkoutStep === 1 && <DeliveryForm
            deliveryType={deliveryType}
            form={form}
            errors={formErrors}
            onTypeChange={setDeliveryType}
            onFormChange={(field, value) => setForm({ ...form, [field]: value })}
            onContinue={() => { if (validateDelivery()) setCheckoutStep(2); }}
          />}

          {/* STEP 2: PAYMENT */}
          {checkoutStep === 2 && <PaymentMethod
            payment={payment}
            onChange={setPayment}
            onBack={() => setCheckoutStep(1)}
            onContinue={() => setCheckoutStep(3)}
          />}

          {/* STEP 3: SUMMARY */}
          {checkoutStep === 3 && <OrderSummary items={cartItems} subtotal={subtotal} shipping={shipping} total={total} deliveryType={deliveryType} form={form} payment={payment} money={money} onBack={() => setCheckoutStep(2)} onConfirm={confirmOrder} />}
        </section>
      )}

      {/* ---------- CONFIRMATION ---------- */}
      {view === "confirmation" && <OrderConfirmation name={form.name} orderNumber={orderNumber} onReset={resetAll} />}

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        subtotal={subtotal}
        money={money}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeItem}
        onCheckout={() => { setCartOpen(false); setCheckoutStep(1); setView("checkout"); }}
      />

      <ProductDetailModal
        product={selectedProduct}
        money={money}
        onClose={() => setSelectedProduct(null)}
        onAdd={(id) => { addToCart(id); setSelectedProduct(null); setCartOpen(true); }}
      />
    </div>
  );
}