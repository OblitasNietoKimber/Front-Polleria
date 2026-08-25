import { IconoGrafico } from "../common/Iconos";

const puntos = [
  { dia: "18 May", x: 40, y: 120 },
  { dia: "19 May", x: 90, y: 110 },
  { dia: "20 May", x: 140, y: 115 },
  { dia: "21 May", x: 190, y: 70 },
  { dia: "22 May", x: 240, y: 50 },
  { dia: "23 May", x: 290, y: 30 },
  { dia: "24 May", x: 340, y: 40 },
];

const linea = puntos.map((punto) => `${punto.x},${punto.y}`).join(" ");
const area = `40,160 ${linea} 340,160`;

export default function Ventas7Dias() {
  return (
    <section className="ticket-card admin-sales-card">
      <div className="admin-sales-head">
        <div className="admin-block-title">
          <IconoGrafico size={18} color="var(--ember)" />
          <span className="font-display">Ventas de los ultimos 7 dias</span>
        </div>

        <select className="admin-select" defaultValue="7dias">
          <option value="7dias">Ultimos 7 dias</option>
          <option value="30dias">Ultimos 30 dias</option>
        </select>
      </div>

      <div className="admin-chart-area">
        <svg className="admin-line-chart" viewBox="0 0 380 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="adminAreaVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line x1="30" y1="30" x2="360" y2="30" stroke="#F0EBE5" strokeDasharray="3 3" />
          <line x1="30" y1="70" x2="360" y2="70" stroke="#F0EBE5" strokeDasharray="3 3" />
          <line x1="30" y1="110" x2="360" y2="110" stroke="#F0EBE5" strokeDasharray="3 3" />
          <line x1="30" y1="150" x2="360" y2="150" stroke="var(--line)" />

          <text x="5" y="34" fill="#9E958C" fontSize="10" fontFamily="IBM Plex Mono">S/ 5K</text>
          <text x="5" y="74" fill="#9E958C" fontSize="10" fontFamily="IBM Plex Mono">S/ 3K</text>
          <text x="5" y="114" fill="#9E958C" fontSize="10" fontFamily="IBM Plex Mono">S/ 1K</text>
          <text x="5" y="154" fill="#9E958C" fontSize="10" fontFamily="IBM Plex Mono">S/ 0</text>

          <polygon points={area} fill="url(#adminAreaVentas)" />
          <polyline fill="none" stroke="var(--ember)" strokeLinecap="round" strokeWidth="3" points={linea} />

          {puntos.map((punto) => (
            <g key={punto.dia}>
              <circle cx={punto.x} cy={punto.y} r="4" fill="var(--ember)" stroke="#FFFFFF" strokeWidth="2" />
              <text x={punto.x - 12} y="172" fill="var(--smoke)" fontSize="10">{punto.dia}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className="admin-chart-legend">
        <span />
        <p>Ventas (S/)</p>
      </div>
    </section>
  );
}
