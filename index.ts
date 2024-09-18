import Server from "./classes/server";
import { SERVER_PORT } from "./global/env";
import bodyParser from "body-parser";
import { router } from "./routes/router";
import cors from "cors";
const server = Server.instance;
//bodyPaarse
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//configuracion de Cors

server.app.use(
  cors({
    origin: "https://cliente-socket-unandes.vercel.app",
    credentials: true,
  })
);
//Rutas del servicio
server.app.use("/", router);
server.start(() => {
  console.log(`Servidor corriendo en puerto:${SERVER_PORT}`);
});
