import { IconoBolsa } from "../common/Iconos";

const productos = [
  {
    num: 1,
    nombre: "Pollo a la brasa entero",
    imagen: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=100&auto=format&fit=crop&q=80",
    cantidad: 86,
    total: "S/ 1,548.00",
    pct: 28.6,
    ancho: "55px",
  },
  {
    num: 2,
    nombre: "Papas fritas familiares",
    imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&auto=format&fit=crop&q=80",
    cantidad: 72,
    total: "S/ 864.00",
    pct: 16.0,
    ancho: "35px",
  },
  {
    num: 3,
    nombre: "1/4 Pollo a la brasa",
    imagen: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100&auto=format&fit=crop&q=80",
    cantidad: 65,
    total: "S/ 806.00",
    pct: 14.9,
    ancho: "30px",
  },
  {
    num: 4,
    nombre: "Gaseosa 1.5 L",
    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&auto=format&fit=crop&q=80",
    cantidad: 58,
    total: "S/ 522.00",
    pct: 9.6,
    ancho: "22px",
  },
  {
    num: 5,
    nombre: "Ensalada fresca",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&auto=format&fit=crop&q=80",
    cantidad: 44,
    total: "S/ 418.00",
    pct: 7.7,
    ancho: "18px",
  },
];

export default function ProductosTop() {
  return (
    <section className="ticket-card admin-products-card">
      <div className="admin-block-title">
        <IconoBolsa size={18} color="var(--ember)" />
        <span className="font-display">Productos mas vendidos</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Cantidad vendida</th>
              <th>Total generado</th>
              <th>Participacion</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item) => (
              <tr key={item.num}>
                <td className="font-mono">{item.num}</td>
                <td>
                  <div className="admin-product-cell">
                    <img src={item.imagen} alt={item.nombre} className="admin-product-img" />
                    <span>{item.nombre}</span>
                  </div>
                </td>
                <td className="font-mono">{item.cantidad}</td>
                <td className="font-mono">{item.total}</td>
                <td>
                  <div className="admin-participation">
                    <span className="admin-pill-bar" style={{ width: item.ancho }} />
                    <span className="font-mono">{item.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
