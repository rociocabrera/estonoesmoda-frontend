import { useState, useEffect } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../../../api/categories";
import { Plus, Pencil, Trash, X } from "react-bootstrap-icons";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./CategoriesAdmin.css";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    img: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", slug: "", description: "", img: "" });
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      img: category.img || ""
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
        setCategories(categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c
        ));
      } else {
        const newId = await addCategory(formData);
        setCategories([...categories, { ...formData, id: newId }]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
    }
    setSaving(false);
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter((c) => c.id !== categoryId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="adminLoading">Cargando categorías...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="categoriesAdmin">
        <header className="pageHeader">
          <div>
            <h1>Categorías</h1>
            <p>{categories.length} categorías en total</p>
          </div>
          <button onClick={() => setShowForm(true)} className="addButton">
            <Plus /> Nueva Categoría
          </button>
        </header>

        {categories.length === 0 ? (
          <div className="noResults">
            <p>No hay categorías todavía</p>
          </div>
        ) : (
          <div className="categoriesGrid">
            {categories.map((category) => (
              <div key={category.id} className="categoryCard">
                {category.img && (
                  <img src={category.img} alt={category.name} className="categoryImg" />
                )}
                <div className="categoryInfo">
                  <h3>{category.name}</h3>
                  <span className="categorySlug">/{category.slug}</span>
                  {category.description && (
                    <p className="categoryDescription">{category.description}</p>
                  )}
                </div>
                <div className="categoryActions">
                  <button
                    className="editBtn"
                    onClick={() => handleEdit(category)}
                    title="Editar"
                  >
                    <Pencil />
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => setDeleteConfirm(category.id)}
                    title="Eliminar"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="categoryModal">
            <div className="categoryModalContent">
              <div className="modalHeader">
                <h3>{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</h3>
                <button onClick={resetForm} className="closeModalBtn">
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="categoryForm">
                <div className="formGroup">
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="slug">Slug (URL)</label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="img">URL de Imagen</label>
                  <input
                    type="url"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                  />
                  {formData.img && (
                    <img src={formData.img} alt="Preview" className="imagePreview" />
                  )}
                </div>

                <div className="formActions">
                  <button type="button" onClick={resetForm} className="cancelFormBtn">
                    Cancelar
                  </button>
                  <button type="submit" className="submitFormBtn" disabled={saving}>
                    {saving ? "Guardando..." : editingCategory ? "Guardar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteConfirm && (
          <div className="deleteModal">
            <div className="deleteModalContent">
              <h3>¿Eliminar categoría?</h3>
              <p>Esta acción no se puede deshacer. Los productos de esta categoría quedarán sin categoría.</p>
              <div className="deleteModalActions">
                <button className="cancelBtn" onClick={() => setDeleteConfirm(null)}>
                  Cancelar
                </button>
                <button className="confirmDeleteBtn" onClick={() => handleDelete(deleteConfirm)}>
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

export default CategoriesAdmin;
