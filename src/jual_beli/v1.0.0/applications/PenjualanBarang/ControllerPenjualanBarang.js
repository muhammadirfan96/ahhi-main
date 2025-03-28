import BarangModel from "../../models/BarangModel.js";
import TransaksiPenjualanModel from "../../models/TransaksiPenjualanModel.js";
const ControllerPenjualanBarang = async (req, res, next) => {
  try {
    const response = req.data;
    const data = {
      status: 0,
      updatedBy: req.uid,
    };

    const updatedBarang = await BarangModel.findByIdAndUpdate(
      response.id,
      data,
      { new: true }
    );

    const transaksi_penjualan = {
      barang_id: updatedBarang._id,
      tanggal_jual: req.body.tanggal_jual,
      pembeli_id: req.body.pembeli_id,
      createdBy: req.uid,
      updatedBy: req.uid,
    };

    const newTransaksiPenjualan = new TransaksiPenjualanModel(
      transaksi_penjualan
    );
    const savedTransaksiPembelian = await newTransaksiPenjualan.save();

    res.status(201).json({ updatedBarang, savedTransaksiPembelian });
  } catch (err) {
    next(err);
  }
};

export default ControllerPenjualanBarang;
