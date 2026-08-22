export const pedidosMock = {
    entrantes: [
        {
            id: 1,
            titulo: "Mesa 5",
            tiempo: "2 min",
            items: ["1x Pollo a la Brasa Entero", "2x Porción Papas Fritas"],
            estado: "nuevo"
        },
        {
            id: 2,
            titulo: "Mesa 8",
            tiempo: "5 min",
            items: ["3x Anticuchos", "1x Chicha Morada 1L"],
            estado: "nuevo"
        }
    ],
    preparacion: [
        {
            id: 3,
            titulo: "Mesa 12",
            tiempo: "18 min",
            items: ["2x Anticuchos de Corazón", "1x Parrillada Mixta Leñas"],
            notas: "Término Medio la carne.",
            estado: "preparacion"
        }
    ],
    paraLlevar: [
        {
            id: 4,
            titulo: "Pedido #104",
            items: ["1/2 Pollo a la Brasa", "1x Ensalada Clásica", "2x Chicha Morada 1L"],
            tipo: "para-llevar",
            estado: "nuevo"
        }
    ],
    delivery: [
        {
            id: 5,
            titulo: "Pedido #203",
            tiempo: "8 min",
            items: ["2x 1/4 Pollo (Pecho)", "2x Inca Kola 500ml"],
            notas: "Empaque doble, cliente pide extra ají.",
            tipo: "delivery",
            estado: "nuevo"
        }
    ]
};