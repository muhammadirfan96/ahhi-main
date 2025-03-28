import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ApplicationRouter from "./jual_beli/v1.0.0/applications/Route.js";
import BarangRouter from "./jual_beli/v1.0.0/routes/BarangRouter.js";
import PembeliRouter from "./jual_beli/v1.0.0/routes/PembeliRouter.js";
import PenjualRouter from "./jual_beli/v1.0.0/routes/PenjualRouter.js";
import TransaksiPembelianRouter from "./jual_beli/v1.0.0/routes/TransaksiPembelianRouter.js";
import TransaksiPenjualanRouter from "./jual_beli/v1.0.0/routes/TransaksiPenjualanRouter.js";
import UsersRouter from "./routers/UsersRouter.js";
import logsMeta from "./middlewares/logsMeta.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { port } from "./config/app.js";
import logger from "./config/logger.js";
import database, { uri } from "./config/database.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use(cors({ origin: "http://localhost:4173", credentials: true }));
const allowedOrigins = [
  "http://localhost:4173",
  "http://localhost:5173",
  // "https://myproductiondomain.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(logsMeta);

app.use((req, res, next) => {
  // req.logMeta.userId = req.uid;
  logger.info("route accessed...", { meta: req.logMeta });
  next();
});

app.use(UsersRouter);
app.use("/jual_beli/v1.0.0", ApplicationRouter);
app.use("/jual_beli/v1.0.0", BarangRouter);
app.use("/jual_beli/v1.0.0", PembeliRouter);
app.use("/jual_beli/v1.0.0", PenjualRouter);
app.use("/jual_beli/v1.0.0", TransaksiPembelianRouter);
app.use("/jual_beli/v1.0.0", TransaksiPenjualanRouter);
// app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/public", express.static("public"));

app.use((err, req, res, next) => {
  logger.error(err.stack, { meta: req.logMeta });
  res.status(err.status || 500).json({ error: err.message });
});

database()
  .then(() => console.log(`database connected ${uri}`))
  .catch((err) => console.log("database not connect !"));

app.listen(port, () => console.log(`server running on port ${port}`));
