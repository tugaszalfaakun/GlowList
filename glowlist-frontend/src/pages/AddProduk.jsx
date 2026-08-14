import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [formData, setformData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });
    const [file, setFile] = useState(null);

    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        const getKategori = async () => {
            try {
                const res = await fetch("http://localhost:5000/kategori");
                const data = await res.json();
                setKategori(data);
            } catch (err) {
                console.error("Gagal mengambil kategori:", err);
            }
        };

        getKategori();
    }, []);


    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("judul", formData.judul);
        data.append("deskripsi", formData.deskripsi);
        data.append("harga", formData.harga);
        data.append("id_kategori", formData.id_kategori);
        data.append("file", file);

        try {
            const res = await fetch("http://localhost:5000/produk", {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
                body: data,
            });
            if (res.ok) {
                alert("Produk berhasil ditambahkan!");
                navigate("/produk");
            } else {
                const data = await res.json();
                alert(data.message || "Gagal menambah produk");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat menambah produk");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Judul Produk</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan nama produk"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan deskripsi produk"
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
                        placeholder="Masukkan harga"
                        required
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

                <div className="mb-3">
                    <label className="form-label">Foto Produk</label>
                    <input 
                    type="file"
                    accept="image/"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Simpan
                </button>
            </form>
        </div>
    )
}
