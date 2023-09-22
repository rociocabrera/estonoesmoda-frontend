import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ItemListContainer, ItemDetailContainer, NavBar } from "./components"; // Barrel de componentes
import getCategories from "./api/categories";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categoriesResult) => {
      setCategories(categoriesResult);
    });
  }, []);

  return (
    <Router>
      <NavBar categories={categories} />
      <Routes>
        <Route index element={<ItemListContainer greeting="Bienvenidx a Esto no es Moda👠" />} />
        <Route path="/category/:id" element={<ItemListContainer greeting="Esta es la categoría shoes" />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
