import { IconoCelular, IconoDocumento, IconoEfectivo, IconoTarjeta } from "../common/Iconos";

const ventas = [
  {
    id: "#000125",
    cliente: "Juan Perez",
    tipo: "Mesa 4",
    total: "S/ 79.02",
    metodoTexto: "Yape",
    iconoMetodo: <IconoCelular size={15} color="#8A2BE2" />,
    hora: "12:45 PM",
  },
  {
    id: "#000124",
    cliente: "Maria Gomez",
    tipo: "Para llevar",
    total: "S/ 65.50",
    metodoTexto: "Tarjeta",
    iconoMetodo: <IconoTarjeta size={15} color="var(--char)" />,
    hora: "12:30 PM",
  },
  {
    id: "#000123",
    cliente: "Carlos Lopez",
    tipo: "Mesa 2",
    total: "S/ 130.00",
    metodoTexto: "Efectivo",
    iconoMetodo: <IconoEfectivo size={15} color="var(--ember)" />,
    hora: "12:15 PM",
  },
  {
    id: "#000122",
    cliente: "Ana Rodriguez",
    tipo: "Delivery",
    total: "S/ 45.00",
    metodoTexto: "Yape",
    iconoMetodo: <IconoCelular size={15} color="#8A2BE2" />,
    hora: "11:50 AM",
  },
  {
    id: "#000121",
    cliente: "Luis Ramirez",
    tipo: "Para llevar",
    total: "S/ 67.90",
    metodoTexto: "Efectivo",
    iconoMetodo: <IconoEfectivo size={15} color="var(--ember)" />,
    hora: "11:30 AM",
  },
];

export default function HistorialVentas() {
  return (
    <section className="ticket-card admin-history-card">
      <div className="admin-block-title">
        <IconoDocumento size={18} color="var(--ember)" />
        <span className="font-display">Historial de ventas recientes</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-history-table">
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Mesa / Tipo</th>
              <th>Total</th>
              <th>Metodo</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td className="font-mono admin-strong-cell">{venta.id}</td>
                <td className="admin-strong-cell">{venta.cliente}</td>
                <td className="admin-muted-cell">{venta.tipo}</td>
                <td className="font-mono admin-strong-cell">{venta.total}</td>
                <td>
                  <div className="admin-method-cell">
                    {venta.iconoMetodo}
                    <span>{venta.metodoTexto}</span>
                  </div>
                </td>
                <td className="font-mono admin-time-cell">{venta.hora}</td>
                <td>
                  <span className="step-stub done admin-status-badge">Completado</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
