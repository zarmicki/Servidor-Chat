"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = exports.desconectar = void 0;
const desconectar = (cliente) => {
    cliente.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
};
exports.desconectar = desconectar;
// escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on("mensaje", (payload) => {
        console.log("Mensaje Recibido: ", payload);
        io.emit("mensaje-nuevo", payload);
    });
};
exports.mensaje = mensaje;
//# sourceMappingURL=sockets.js.map