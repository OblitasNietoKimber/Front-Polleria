import { IconoTarjeta } from "../common/Iconos";

const metodosPago = [
  { nombre: "Efectivo", porcentaje: "45%", monto: "S/ 12,852.18", color: "var(--ember)" },
  { nombre: "Tarjeta", porcentaje: "35%", monto: "S/ 9,998.14", color: "var(--char)" },
  { nombre: "Yape / Plin", porcentaje: "15%", monto: "S/ 4,284.06", color: "var(--rust)" },
  { nombre: "Otros", porcentaje: "5%", monto: "S/ 1,428.02", color: "var(--gold)" },
];

export default function VentasMetodoPago() {
  return (
    <section className="ticket-card admin-payment-card">
      <div className="admin-block-title">
        <IconoTarjeta size={18} color="var(--ember)" />
        <span className="font-display">Ventas por metodo de pago</span>
      </div>

      <div className="admin-payment-content">
        <div className="admin-donut-wrap">
          <svg className="admin-donut" viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--gold)" strokeWidth="5" strokeDasharray="5 95" strokeDashoffset="0" />
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--rust)" strokeWidth="5" strokeDasharray="15 85" strokeDashoffset="-5" />
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--char)" strokeWidth="5" strokeDasharray="35 65" strokeDashoffset="-20" />
            <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--ember)" strokeWidth="5" strokeDasharray="45 55" strokeDashoffset="-55" />
          </svg>

          <div className="admin-donut-center">
            <span>Total</span>
            <strong className="font-mono">S/ 28,560</strong>
          </div>
        </div>

        <div className="admin-payment-list">
          {metodosPago.map((item) => (
            <div className="admin-payment-row" key={item.nombre}>
              <div className="admin-payment-left">
                <span className="admin-color-dot" style={{ backgroundColor: item.color }} />
                <span>{item.nombre}</span>
              </div>

              <div className="admin-payment-values">
                <strong className="font-mono">{item.porcentaje}</strong>
                <span className="font-mono">{item.monto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
