import { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [formData, setformData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async
}