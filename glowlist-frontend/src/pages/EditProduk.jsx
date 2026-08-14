import { useState, useEffect } from "react";
import {useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    })
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/produk/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData(data[0]); // ambil data pertama hasil query
            setLoading(false);
        })
        .catch((err) => console.error(err));

        fetch("http://localhost:5000/kategori")
        .then((res) => res.json())
        .then((data) => {
            setKategori(data);
        })
    }, [id]);

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("Yakin mau menyimpan perubahan ini?")) {
            return;
        }
        await fetch(`http://localhost:5000/produk/${id}`, {
            method: "PUT",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            body: JSON.stringify(formData),
        });
        alert("Produk berhasil diperbarui!")
        navigate("/produk");
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>
    }
    return (
        <div className="container mt-4">
            <h2>Edit Produk</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>

                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">-- Pilih Kategori --</option>

                        {kategori.map((item) => (
                            <option key={item.id_kategori} value={item.id_kategori}>
                                {item.kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    )

    
}