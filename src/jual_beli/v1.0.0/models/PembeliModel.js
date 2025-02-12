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

const PembeliModel = mongoose.model("pembelis", schema);

export default PembeliModel;
