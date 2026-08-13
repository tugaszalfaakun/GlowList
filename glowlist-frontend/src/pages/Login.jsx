import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (res.ok && data.auth) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("idPengguna", data.id_pengguna);
                localStorage.setItem("nama", data.nama);as                
                

            }
        }
    }
}
