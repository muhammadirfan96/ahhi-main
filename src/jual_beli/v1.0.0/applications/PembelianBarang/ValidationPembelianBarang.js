import { body, param, query } from "express-validator";
import BarangModel from "../../models/BarangModel.js";
import PenjualModel from "../../models/PenjualModel.js";
import runValidation from "../../../../middlewares/runValidation.js";

const ValidationPembelianBarang = [
  body("kode")
    .trim()
    .notEmpty()
    .withMessage("kode required")
    .bail()
    .isString()
    .withMessage("kode must be a string")
    .isLength({ min: 3, max: 10 })
    .withMessage("kode must be between 3 and 10 characters")
    .custom(async (value) => {
      try {
        const existingBarang = await BarangModel.findOne({ kode: value });
        if (existingBarang) throw new Error("kode must be unique");
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    }),
  body("nama")
    .trim()
    .notEmpty()
    .withMessage("nama required")
    .bail()
    .isString()
    .withMessage("nama must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("nama must be between 3 and 50 characters"),
  body("tanggal_beli")
    .trim()
    .notEmpty()
    .withMessage("tanggal_beli required")
    .bail()
    .isISO8601()
    .withMessage("tanggal_beli must be a valid date format (YYYY-MM-DD)")
    .toDate(),
  body("penjual_id")
    .isMongoId()
    .withMessage("invalid ID")
    .bail()
    .custom(async (value, { req }) => {
      try {
        let filter = { _id: value };
        if (req.role !== "admin") filter.createdBy = req.uid;
        const data = await PenjualModel.findOne(filter);
        if (!data) throw new Error("data not found");
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    })
    .bail({ level: "request" }),
  runValidation,
];

export default ValidationPembelianBarang;
