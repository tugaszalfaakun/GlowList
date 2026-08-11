import { useEffect, useState } from "react";

export default function Kategori() {
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    const getKategori = async () => {
        try {
            const res = await fetch("http://localhost:5000/kategori");
            const data = await res.json();
            setKategori(data);
        } catch (err) {
            console.error("Gagal fetch data:", err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getKategori();
    }, [])

    if (loading) {
        return <div className="container mt-4">Sedang memuat data...</div>
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Daftar Kategori Glowlist</h2>
        </div>
        

        <table className="table table-bordered table-striped">
            <thead className="table-primary">
                <tr>
                    <th>ID Kategori</th>
                    <th>Nama Kategori</th>
                </tr>
            </thead>
            <tbody>
                {kategori.length > 0 ? (
                    kategori.map((item) =>(
                        <tr key={item.id_kategori}>
                            <td>{item.id_kategori}</td>
                            <td>{item.kategori}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                            Belum ada kategori
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}