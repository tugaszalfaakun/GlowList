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
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok && data.auth) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("idPengguna", data.id_pengguna);
                localStorage.setItem("nama", data.nama);
                alert("Login berhasil, selamat datang ", + data.nama + "!");
                navigate("/produk");
            } else {
                alert(data.message || "Login gagal");
            } 
        } catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat login")
        }
    };

    return (
        <div className="d-flex align-items-center py-4 bg-body-tertiary vh-100">
            <main style={{ width: "320px"}} className="m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Login Glowlist</h1>
                    <div className="form-floating mb-2">
                        <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={handleChange}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                        <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn w-100 py-2" type="submit">
                            Sign in
                        </button>
                </form>
            </main>
        </div>
    );
}
