import {
  IconoBilletera,
  IconoBolsaDinero,
  IconoCalendario,
  IconoGrafico,
} from "../common/Iconos";

const tarjetas = [
  {
    id: 1,
    titulo: "Ventas del dia",
    monto: "S/ 4,280.90",
    comparativa: "Sube 12.5% vs ayer",
    icono: <IconoBilletera size={18} color="var(--ember)" />,
    sparklinePoints: "0,30 30,28 60,32 90,20 120,25 150,15 180,18 210,5 240,10",
  },
  {
    id: 2,
    titulo: "Ventas de la semana",
    monto: "S/ 28,560.40",
    comparativa: "Sube 8.3% vs semana pasada",
    icono: <IconoCalendario size={18} color="var(--ember)" />,
    sparklinePoints: "0,25 30,22 60,30 90,18 120,22 150,10 180,14 210,8 240,12",
  },
  {
    id: 3,
    titulo: "Ventas del mes",
    monto: "S/ 112,450.75",
    comparativa: "Sube 15.7% vs mes pasado",
    icono: <IconoGrafico size={18} color="var(--ember)" />,
    sparklinePoints: "0,28 30,30 60,22 90,24 120,18 150,20 180,15 210,12 240,8",
  },
  {
    id: 4,
    titulo: "Ingresos totales",
    monto: "S/ 354,890.20",
    comparativa: "Sube 10.2% vs mes pasado",
    icono: <IconoBolsaDinero size={18} color="var(--ember)" />,
    sparklinePoints: "0,20 30,25 60,18 90,22 120,15 150,18 180,10 210,14 240,5",
  },
];

export default function TarjetasResumen() {
  return (
    <div className="admin-summary-grid">
      {tarjetas.map((tarjeta) => (
        <article key={tarjeta.id} className="ticket-card admin-summary-card">
          <div>
            <div className="admin-summary-head">
              <div className="admin-summary-icon">{tarjeta.icono}</div>
              <span className="admin-summary-title">{tarjeta.titulo}</span>
            </div>

            <div className="admin-summary-body">
              <strong className="admin-summary-amount">{tarjeta.monto}</strong>
              <span className="admin-summary-badge">{tarjeta.comparativa}</span>
            </div>
          </div>

          <div className="admin-sparkline">
            <svg viewBox="0 0 240 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-${tarjeta.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
                </linearGradient>
              </defs>

              <polygon points={`0,40 ${tarjeta.sparklinePoints} 240,40`} fill={`url(#grad-${tarjeta.id})`} />
              <polyline
                fill="none"
                stroke="var(--ember)"
                strokeLinecap="round"
                strokeWidth="2.5"
                points={tarjeta.sparklinePoints}
              />
            </svg>
          </div>
        </article>
      ))}
    </div>
  );
}
