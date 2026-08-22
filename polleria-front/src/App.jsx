import { useState } from "react";
import Columna from "./components/Columna";
import PedidoCard from "./components/PedidoCard";
import { pedidosMock } from "./data/pedidosMock";

function App() {
    // Estado para manejar los pedidos
    const [pedidos, setPedidos] = useState(pedidosMock);

    // Funciones para cambiar estados
    const moverAPreparacion = (id, columna) => {
        setPedidos(prev => {
            const nuevo = { ...prev };
            const pedido = nuevo[columna].find(p => p.id === id);
            if (pedido) pedido.estado = "preparacion";
            return nuevo;
        });
    };

    const moverAListo = (id, columna) => {
        setPedidos(prev => {
            const nuevo = { ...prev };
            const pedido = nuevo[columna].find(p => p.id === id);
            if (pedido) pedido.estado = "listo";
            return nuevo;
        });
    };

    const deshacer = (id, columna) => {
        setPedidos(prev => {
            const nuevo = { ...prev };
            const pedido = nuevo[columna].find(p => p.id === id);
            if (pedido) pedido.estado = "nuevo";
            return nuevo;
        });
    };

    return (
        <div>
            {/* HEADER */}
            <header className="header">
                <div className="header-left">
                    <span className="logo">🔥 <span>Leña</span> y Sabores</span>
                    <span className="badge-version">KDS v2</span>
                </div>
                <div className="header-right">
                    <div className="chef-badge">
                        <span className="icon">👨‍🍳</span> Chef Principal
                    </div>
                    <span className="estacion-badge">📍 Estación Central</span>
                </div>
            </header>

            {/* ACCIONES */}
            <div className="acciones">
                <button className="btn-accion activos">📋 Pedidos Activos</button>
                <button className="btn-accion listos">✅ Listos para Entrega</button>
                <button className="btn-accion inventario">📦 Inventario</button>
                <button className="btn-accion pausar">⏸️ Pausar Pedidos</button>
            </div>

            {/* GRID */}
            <div className="grid-columnas">
                {/* ENTRANTES */}
                <Columna titulo="Entrantes" tipo="entrantes" count={pedidos.entrantes.length}>
                    {pedidos.entrantes.map(pedido => (
                        <PedidoCard
                            key={pedido.id}
                            {...pedido}
                            onPreparar={() => moverAPreparacion(pedido.id, "entrantes")}
                        />
                    ))}
                </Columna>

                {/* EN PREPARACIÓN */}
                <Columna titulo="En Preparación" tipo="preparacion" count={pedidos.preparacion.length}>
                    {pedidos.preparacion.map(pedido => (
                        <PedidoCard
                            key={pedido.id}
                            {...pedido}
                            onListo={() => moverAListo(pedido.id, "preparacion")}
                            onDeshacer={() => deshacer(pedido.id, "preparacion")}
                        />
                    ))}
                </Columna>

                {/* PARA LLEVAR */}
                <Columna titulo="Para Llevar" tipo="llevar" count={pedidos.paraLlevar.length}>
                    {pedidos.paraLlevar.map(pedido => (
                        <PedidoCard
                            key={pedido.id}
                            {...pedido}
                            onPreparar={() => moverAPreparacion(pedido.id, "paraLlevar")}
                        />
                    ))}
                </Columna>

                {/* DELIVERY */}
                <Columna titulo="Delivery - PedidosYa" tipo="delivery" count={pedidos.delivery.length}>
                    {pedidos.delivery.map(pedido => (
                        <PedidoCard
                            key={pedido.id}
                            {...pedido}
                            onPreparar={() => moverAPreparacion(pedido.id, "delivery")}
                        />
                    ))}
                </Columna>
            </div>
        </div>
    );
}

export default App;
