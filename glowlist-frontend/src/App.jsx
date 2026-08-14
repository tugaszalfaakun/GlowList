import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import Kategori from "./pages/Kategori";
import Tentang from "./pages/Tentang";
import EditProduk from "./pages/EditProduk";
import AddProduk from "./pages/AddProduk";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="produk/tambah" element={<AddProduk />} />
          <Route path="produk/edit/:id" element={<EditProduk />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
