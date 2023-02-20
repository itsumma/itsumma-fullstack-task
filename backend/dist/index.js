"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const serverPort = process.env.SERVER_PORT;
const poolConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
};
exports.pool = new pg_1.Pool(poolConfig);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use('/api', index_1.default);
app.listen(serverPort, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${serverPort}`);
});
