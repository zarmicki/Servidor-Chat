"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, "../UserMens.json");
const leerDatos = () => {
    try {
        const data = fs_1.default.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        console.error("Error al leer los datos:", error);
        return [];
    }
};
exports.router.get("/mensajes", (req, res) => {
    //   res.json({
    //     ok: true,
    //     mensaje: "todo bien !",
    //   });
    const datos = leerDatos();
    res.json(datos);
});
//# sourceMappingURL=router.js.map