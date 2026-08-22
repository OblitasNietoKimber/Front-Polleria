export default function PedidoCard({
    titulo,
    tiempo,
    items,
    notas,
    estado = "nuevo",
    tipo,
    onPreparar,
    onListo,
    onDeshacer
}) {
    // Badge de estado
    const getEstadoBadge = () => {
        const map = {
            nuevo: { label: "🆕 Nuevo", clase: "nuevo" },
            preparacion: { label: "⏳ En preparación", clase: "preparacion" },
            listo: { label: "✅ Listo", clase: "listos" }
        };
        return map[estado] || map.nuevo;
    };

    // Badge de tipo
    const getTipoBadge = () => {
        if (tipo === "para-llevar") {
            return <span className="badge-tipo para-llevar">📦 Para llevar</span>;
        }
        if (tipo === "delivery") {
            return <span className="badge-tipo delivery">🛵 Delivery</span>;
        }
        return null;
    };

    const estadoBadge = getEstadoBadge();

    return (
        <div className="pedido-card">
            <div className="pedido-header">
                <div>
                    <div className="pedido-titulo">{titulo}</div>
                    {tiempo && (
                        <div className="pedido-tiempo">
                            <span className="reloj">🕐</span> Hace {tiempo}
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <span className={`badge-estado ${estadoBadge.clase}`}>
                        {estadoBadge.label}
                    </span>
                    {getTipoBadge()}
                </div>
            </div>

            <ul className="pedido-items">
                {items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            {notas && (
                <div className="pedido-notas">💬 {notas}</div>
            )}

            {/* Botones según estado */}
            <div className="pedido-botones">
                {estado === "nuevo" && (
                    <>
                        <button className="btn-preparar" onClick={() => onPreparar?.()}>
                            🔄 Marcar preparación
                        </button>
                    </>
                )}
                {estado === "preparacion" && (
                    <>
                        <button className="btn-listos" onClick={() => onListo?.()}>
                            ✅ Marcar listo
                        </button>
                        <button className="btn-deshacer" onClick={() => onDeshacer?.()}>
                            ↩️ Deshacer
                        </button>
                    </>
                )}
                {estado === "listo" && (
                    <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>
                        ✅ Pedido completado
                    </span>
                )}
            </div>
        </div>
    );
}
