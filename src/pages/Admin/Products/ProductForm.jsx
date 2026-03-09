import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts, addProduct, updateProduct } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { uploadImage } from "../../../api/storage";
import { ArrowLeft, Upload, X, Plus } from "react-bootstrap-icons";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");

  // Multiple images support
  const [images, setImages] = useState([]); // Array of { url: string, isNew: boolean, file?: File }
  const [pendingFiles, setPendingFiles] = useState([]); // Files waiting to be uploaded
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    slug: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    isNew: false,
    discount: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        if (isEditing) {
          const products = await getAllProducts();
          const product = products.find((p) => p.id === id);
          if (product) {
            setFormData({
              title: product.title || "",
              name: product.name || "",
              slug: product.slug || "",
              description: product.description || "",
              price: product.price || "",
              originalPrice: product.originalPrice || "",
              category: product.category || "",
              isNew: product.isNew || false,
              discount: product.discount || ""
            });

            // Load existing images
            const existingImages = [];
            if (product.images && product.images.length > 0) {
              product.images.forEach(url => {
                existingImages.push({ url, isNew: false });
              });
            } else if (product.img) {
              // Backward compatibility: single image
              existingImages.push({ url: product.img, isNew: false });
            }
            setImages(existingImages);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Por favor seleccioná solo imágenes válidas");
        continue;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Las imágenes no deben superar 5MB cada una");
        continue;
      }

      // Add to pending files and create preview
      const previewUrl = URL.createObjectURL(file);
      setImages(prev => [...prev, { url: previewUrl, isNew: true, file }]);
      setPendingFiles(prev => [...prev, file]);
    }

    setError("");
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = images[index];

    // If it's a new image with a file, remove from pending files
    if (imageToRemove.isNew && imageToRemove.file) {
      setPendingFiles(prev => prev.filter(f => f !== imageToRemove.file));
      URL.revokeObjectURL(imageToRemove.url);
    }

    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetMainImage = (index) => {
    if (index === 0) return; // Already main
    setImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(index, 1);
      newImages.unshift(movedImage);
      return newImages;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Upload pending files
      const uploadedUrls = [];
      const existingUrls = images.filter(img => !img.isNew).map(img => img.url);

      if (pendingFiles.length > 0) {
        setUploading(true);
        for (let i = 0; i < pendingFiles.length; i++) {
          setUploadProgress(`Subiendo imagen ${i + 1} de ${pendingFiles.length}...`);
          try {
            const url = await uploadImage(pendingFiles[i], "products");
            uploadedUrls.push(url);
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            setError(`Error al subir imagen ${i + 1}. Verificá tu conexión.`);
            setSaving(false);
            setUploading(false);
            setUploadProgress("");
            return;
          }
        }
        setUploading(false);
        setUploadProgress("");
      }

      // Combine URLs maintaining order (new images at their positions)
      const allImageUrls = [];
      let uploadedIndex = 0;

      for (const img of images) {
        if (img.isNew) {
          allImageUrls.push(uploadedUrls[uploadedIndex]);
          uploadedIndex++;
        } else {
          allImageUrls.push(img.url);
        }
      }

      if (allImageUrls.length === 0) {
        setError("Por favor agregá al menos una imagen");
        setSaving(false);
        return;
      }

      const productData = {
        ...formData,
        img: allImageUrls[0], // Main image for backward compatibility
        images: allImageUrls, // All images array
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        discount: formData.discount ? Number(formData.discount) : null
      };

      if (isEditing) {
        await updateProduct(id, productData);
      } else {
        await addProduct(productData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Error al guardar el producto");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="adminLoading">Cargando...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="productForm">
        <header className="formHeader">
          <button onClick={() => navigate("/admin/products")} className="backBtn">
            <ArrowLeft /> Volver
          </button>
          <h1>{isEditing ? "Editar Producto" : "Nuevo Producto"}</h1>
        </header>

        <form onSubmit={handleSubmit} className="formContent">
          {error && <div className="formError">{error}</div>}

          <div className="formGrid">
            <div className="formSection">
              <h2>Información Básica</h2>

              <div className="formGroup">
                <label htmlFor="title">Título *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label htmlFor="name">Nombre corto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  rows={4}
                />
              </div>
            </div>

            <div className="formSection">
              <h2>Precio y Categoría</h2>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="price">Precio *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="originalPrice">Precio Original</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label htmlFor="discount">Descuento (%)</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="formGroup">
                  <label htmlFor="category">Categoría *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="formGroupCheckbox">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                />
                <label htmlFor="isNew">Marcar como "Nuevo"</label>
              </div>
            </div>
          </div>

          {/* Images Section - Full Width */}
          <div className="formSection imagesSection">
            <h2>Imágenes del Producto *</h2>
            <p className="imageHint">La primera imagen será la principal. Podés arrastrar para reordenar.</p>

            <div className="imagesGrid">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`imageCard ${index === 0 ? 'mainImage' : ''}`}
                  onClick={() => handleSetMainImage(index)}
                >
                  <img src={image.url} alt={`Imagen ${index + 1}`} />
                  {index === 0 && <span className="mainBadge">Principal</span>}
                  <button
                    type="button"
                    className="removeImageBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                  >
                    <X />
                  </button>
                </div>
              ))}

              {/* Add More Images Button */}
              <div
                className="imageCard addImageCard"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                <div className="addImageContent">
                  <Plus size={32} />
                  <span>Agregar</span>
                </div>
              </div>
            </div>
          </div>

          <div className="formActions">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="cancelFormBtn"
            >
              Cancelar
            </button>
            <button type="submit" className="submitFormBtn" disabled={saving || uploading}>
              {uploading ? uploadProgress : saving ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
