import express from "express";
import ControllerPembelianBarang from "./PembelianBarang/ControllerPembelianBarang.js";
import ControllerPenjualanBarang from "./PenjualanBarang/ControllerPenjualanBarang.js";
import ValidationPembelianBarang from "./PembelianBarang/ValidationPembelianBarang.js";
import ValidationPenjualanBarang from "./PenjualanBarang/ValidationPenjualanBarang.js";
import verifyToken from "../../../middlewares/verifyToken.js";

const ApplicationRouter = express.Router();

ApplicationRouter.post(
  "/pembelian-barang",
  verifyToken,
  ValidationPembelianBarang,
  ControllerPembelianBarang
);
ApplicationRouter.patch(
  "/penjualan-barang/:id",
  verifyToken,
  ValidationPenjualanBarang,
  ControllerPenjualanBarang
);

export default ApplicationRouter;
