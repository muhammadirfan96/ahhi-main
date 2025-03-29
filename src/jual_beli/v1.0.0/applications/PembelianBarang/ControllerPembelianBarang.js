import BarangModel from "../../models/BarangModel.js";
import TransaksiPembelianModel from "../../models/TransaksiPembelianModel.js";
const ControllerPembelianBarang = async (req, res, next) => {
  try {
    const barang = {
      kode: req.body.kode,
      nama: req.body.nama,
      status: 0,
      createdBy: req.uid,
      updatedBy: req.uid,
    };

    const newBarang = new BarangModel(barang);
    const savedBarang = await newBarang.save();

    const transaksi_pembelian = {
      barang_id: savedBarang._id,
      tanggal_beli: req.body.tanggal_beli,
      penjual_id: req.body.penjual_id,
      createdBy: req.uid,
      updatedBy: req.uid,
    };

    const newTransaksiPembelian = new TransaksiPembelianModel(
      transaksi_pembelian
    );
    const savedTransaksiPembelian = await newTransaksiPembelian.save();

    res.status(201).json({ savedBarang, savedTransaksiPembelian });
  } catch (err) {
    next(err);
  }
};

export default ControllerPembelianBarang;
