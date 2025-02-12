import express from "express";

import {
  showTransaksiPembelian,
  findTransaksiPembelian,
} from "../controllers/TransaksiPembelianController.js";
import {
  showTransaksiPembelianValidation,
  findTransaksiPembelianValidation,
} from "../validations/TransaksiPembelianValidation.js";
import verifyToken from "../../../middlewares/verifyToken.js";

const TransaksiPembelianRouter = express.Router();

TransaksiPembelianRouter.get(
  "/transaksi-pembelian/:id",
  verifyToken,
  showTransaksiPembelianValidation,
  showTransaksiPembelian
);

TransaksiPembelianRouter.get(
  "/transaksi-pembelians",
  verifyToken,
  findTransaksiPembelianValidation,
  findTransaksiPembelian
);

export default TransaksiPembelianRouter;
