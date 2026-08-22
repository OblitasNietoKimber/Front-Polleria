export default function Columna({ titulo, children, tipo, count }) {
    const getClaseTipo = () => {
        const map = {
            entrantes: "entrantes",
            preparacion: "preparacion",
            llevar: "llevar",
            delivery: "delivery"
        };
        return map[tipo] || "";
    };

    return (
        <div className={`columna ${getClaseTipo()}`}>
            <div className="columna-header">
                <h2>{titulo}</h2>
                {count !== undefined && <span className="count">{count}</span>}
            </div>
            <div className="columna-scroll">
                {children}
            </div>
        </div>
    );
}