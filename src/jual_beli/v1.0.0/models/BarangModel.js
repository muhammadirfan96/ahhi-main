import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    kode: String,
    nama: String,
    spesifikasi: String,
    catatan: String,
    harga_beli: Number,
    harga_jual: Number,
    diskon: Number,
    status: String,
    photo: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const BarangModel = mongoose.model("barangs", schema);

export default BarangModel;
