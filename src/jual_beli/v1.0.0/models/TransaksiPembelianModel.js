import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    barang_id: { type: mongoose.Schema.Types.ObjectId, ref: "barangs" },
    tanggal_beli: Date,
    penjual_id: { type: mongoose.Schema.Types.ObjectId, ref: "penjuals" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const TransaksiPembelianModel = mongoose.model("transaksi_pembelians", schema);

export default TransaksiPembelianModel;
