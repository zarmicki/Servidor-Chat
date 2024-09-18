import express from "express";
import { SERVER_PORT } from "../global/env";
import path from "path";
import { Server as SocketOIServer } from "socket.io";
import http from "http";
import * as socket from "../sockets/sockets";
export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  public dataFilePath: string;
  public io: SocketOIServer;
  private httpServer: http.Server;
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.dataFilePath = path.join(__dirname, "../UserMens.json");
    this.httpServer = new http.Server(this.app);
    // this.io = new SocketOIServer(this.httpServer);
    this.io = new SocketOIServer(this.httpServer, {
      cors: {
        origin: "https://cliente-socket-unandes.vercel.app",
        methods: ["GET", "POST"],
      },
    });
  }
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
    this.listenSocket();
    // this.app.listen(this.port, callback);
  }

  private listenSocket() {
    this.io.on("connection", (cliente) => {
      console.log(`Cliente Conectado:${cliente.id}`);
      //Desconectar
      socket.desconectar(cliente);
      //Mensajes
      socket.mensaje(cliente, this.io);
    });
  }
}
