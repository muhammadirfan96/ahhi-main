import express from "express";

import {
  showTransaksiPenjualan,
  findTransaksiPenjualan,
} from "../controllers/TransaksiPenjualanController.js";
import {
  showTransaksiPenjualanValidation,
  findTransaksiPenjualanValidation,
} from "../validations/TransaksiPenjualanValidation.js";
import verifyToken from "../../../middlewares/verifyToken.js";

const TransaksiPenjualanRouter = express.Router();

TransaksiPenjualanRouter.get(
  "/transaksi-penjualan/:id",
  verifyToken,
  showTransaksiPenjualanValidation,
  showTransaksiPenjualan
);

TransaksiPenjualanRouter.get(
  "/transaksi-penjualans",
  verifyToken,
  findTransaksiPenjualanValidation,
  findTransaksiPenjualan
);

export default TransaksiPenjualanRouter;
