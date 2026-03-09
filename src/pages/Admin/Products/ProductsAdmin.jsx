import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { Plus, Pencil, Trash, Search } from "react-bootstrap-icons";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./ProductsAdmin.css";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId || c.slug === categoryId);
    return category?.name || categoryId;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="adminLoading">Cargando productos...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="productsAdmin">
        <header className="pageHeader">
          <div>
            <h1>Productos</h1>
            <p>{products.length} productos en total</p>
          </div>
          <Link to="/admin/products/new" className="addButton">
            <Plus /> Agregar Producto
          </Link>
        </header>

        <div className="filtersBar">
          <div className="searchBox">
            <Search />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="categoryFilter"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug || cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="noResults">
            <p>No se encontraron productos</p>
          </div>
        ) : (
          <div className="productsTable">
            <table>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.img}
                        alt={product.title}
                        className="productThumb"
                      />
                    </td>
                    <td>
                      <div className="productName">
                        <strong>{product.title || product.name}</strong>
                        {product.slug && (
                          <span className="productSlug">/{product.slug}</span>
                        )}
                      </div>
                    </td>
                    <td>{getCategoryName(product.category)}</td>
                    <td>₡{(product.price || 0).toLocaleString()}</td>
                    <td>
                      <div className="actionButtons">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="editBtn"
                          title="Editar"
                        >
                          <Pencil />
                        </Link>
                        <button
                          className="deleteBtn"
                          onClick={() => setDeleteConfirm(product.id)}
                          title="Eliminar"
                        >
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {deleteConfirm && (
          <div className="deleteModal">
            <div className="deleteModalContent">
              <h3>¿Eliminar producto?</h3>
              <p>Esta acción no se puede deshacer.</p>
              <div className="deleteModalActions">
                <button
                  className="cancelBtn"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancelar
                </button>
                <button
                  className="confirmDeleteBtn"
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductsAdmin;
