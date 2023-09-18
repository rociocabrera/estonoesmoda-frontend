import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
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
        <Route path="/category/:id" element={<ItemListContainer greeting="Estas son las categorías" />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
