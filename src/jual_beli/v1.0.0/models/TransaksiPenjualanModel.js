import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    barang_id: { type: mongoose.Schema.Types.ObjectId, ref: "barangs" },
    tanggal_jual: Date,
    pembeli_id: { type: mongoose.Schema.Types.ObjectId, ref: "pembelis" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const TransaksiPenjualanModel = mongoose.model("transaksi_penjualans", schema);

export default TransaksiPenjualanModel;
