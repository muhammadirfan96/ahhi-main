import express from "express";

import {
  showPenjual,
  findPenjual,
  createPenjual,
  updatePenjual,
  deletePenjual,
} from "../controllers/PenjualController.js";
import {
  showPenjualValidation,
  findPenjualValidation,
  createPenjualValidation,
  updatePenjualValidation,
  deletePenjualValidation,
} from "../validations/PenjualValidation.js";
import verifyToken from "../../../middlewares/verifyToken.js";

const PenjualRouter = express.Router();

PenjualRouter.get(
  "/penjual/:id",
  verifyToken,
  showPenjualValidation,
  showPenjual
);

PenjualRouter.get("/penjuals", verifyToken, findPenjualValidation, findPenjual);

PenjualRouter.post(
  "/penjual",
  verifyToken,
  createPenjualValidation,
  createPenjual
);

PenjualRouter.patch(
  "/penjual/:id",
  verifyToken,
  updatePenjualValidation,
  updatePenjual
);

PenjualRouter.delete(
  "/penjual/:id",
  verifyToken,
  deletePenjualValidation,
  deletePenjual
);

export default PenjualRouter;
