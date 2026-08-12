import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Produk() {
    const [produk, setProduk] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProduk = async () => {
        try {
            const res = await fetch("http://localhost:5000/produk");
            const data = await res.json();
            setProduk(data);
        } catch (err) {
            console.error("Gagal fetch data:", err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduk();
    }, [])

    if (loading) {
        return <div className="container mt-4">Sedang memuat data...</div>
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Daftar Produk Glowlist</h2>
                <Link to="/produk/tambah" className="btn btn-primary">
                    + Tambah Produk
                </Link>
            </div>


            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {produk.length > 0 ? (
                        produk.map((item) => (
                            <tr key={item.id_produk}>
                                <td>{item.id_produk}</td>
                                <td>{item.judul}</td>
                                <td>{item.deskripsi}</td>
                                <td>{item.harga}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Belum ada produk
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}