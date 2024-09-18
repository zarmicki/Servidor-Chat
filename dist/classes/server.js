"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("../global/env");
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/sockets"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = env_1.SERVER_PORT;
        this.dataFilePath = path_1.default.join(__dirname, "../UserMens.json");
        this.httpServer = new http_1.default.Server(this.app);
        // this.io = new SocketOIServer(this.httpServer);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "https://cliente-socket-unandes.vercel.app",
                methods: ["GET", "POST"],
            },
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
        this.listenSocket();
        // this.app.listen(this.port, callback);
    }
    listenSocket() {
        this.io.on("connection", (cliente) => {
            console.log(`Cliente Conectado:${cliente.id}`);
            //Desconectar
            socket.desconectar(cliente);
            //Mensajes
            socket.mensaje(cliente, this.io);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map