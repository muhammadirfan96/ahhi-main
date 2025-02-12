import { body, param, query } from "express-validator";
import TransaksiPembelianModel from "../models/TransaksiPembelianModel.js";
import runValidation from "../../../middlewares/runValidation.js";

const showTransaksiPembelianValidation = [
  param("id")
    .isMongoId()
    .withMessage("invalid ID")
    .bail()
    .custom(async (value, { req }) => {
      try {
        let filter = { _id: value };
        if (req.role !== "admin") filter.createdBy = req.uid;
        const data = await TransaksiPembelianModel.findOne(filter);
        if (!data) throw new Error("data not found");
        req.data = data;
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    })
    .bail({ level: "request" }),
  runValidation,
];

const findTransaksiPembelianValidation = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit min: 1 and max: 100"),
  query("page").optional().isInt().withMessage("page must integer"),
  runValidation,
];

export { showTransaksiPembelianValidation, findTransaksiPembelianValidation };
