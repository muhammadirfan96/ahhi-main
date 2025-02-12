import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    nama: String,
    alamat: String,
    kontak: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const PenjualModel = mongoose.model("penjuals", schema);

export default PenjualModel;
