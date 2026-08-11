import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import Kategori from "./pages/Kategori";
import Tentang from "./pages/Tentang";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
