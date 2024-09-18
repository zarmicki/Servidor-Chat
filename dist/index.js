"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const env_1 = require("./global/env");
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = require("./routes/router");
const cors_1 = __importDefault(require("cors"));
const server = server_1.default.instance;
//bodyPaarse
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//configuracion de Cors
server.app.use((0, cors_1.default)({
    origin: "https://cliente-socket-unandes.vercel.app",
    credentials: true,
}));
//Rutas del servicio
server.app.use("/", router_1.router);
server.start(() => {
    console.log(`Servidor corriendo en puerto:${env_1.SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map