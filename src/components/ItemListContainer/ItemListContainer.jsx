/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import { getAllProducts, getProductsByCategoryId } from "../../api/products";
import { getCategoryBySlug } from "../../api/categories";
import { Layout } from "../Layout";
import { ItemList } from "../ItemList";
import { Hero } from "../Hero";
import { FeaturedCarousel } from "../FeaturedCarousel";
import { ProductFilters } from "../ProductFilters";

// Mapeo de categorías a español
const categoryTranslations = {
  "dress": "Vestidos",
  "shirts": "Partes de arriba",
  "pants": "Partes de abajo",
};

function ItemListContainer() {
  const { id: categorySlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [filters, setFilters] = useState({ minPrice: null, maxPrice: null });
  const [sortBy, setSortBy] = useState("default");

  const isHomePage = !categorySlug;

  // Obtener nombre traducido de la categoría
  const getCategoryName = () => {
    if (!category.slug) return "";
    return categoryTranslations[category.slug.toLowerCase()] || category.name;
  };

  useEffect(() => {
    setLoading(true);
    if (categorySlug) {
      getCategoryBySlug(categorySlug).then((categoryResult) => {
        setCategory(categoryResult || {});
        // Use slug to filter products (works with both slug and ID references)
        getProductsByCategoryId(categorySlug).then((productsResult) => {
          setProducts(productsResult);
          setLoading(false);
        });
      });
    } else {
      setCategory({});
      getAllProducts().then((productsResult) => {
        setProducts(productsResult);
        setLoading(false);
      });
    }
  }, [categorySlug]);

  // Aplicar filtros y ordenamiento
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Aplicar filtros de precio
    if (filters.minPrice !== null) {
      result = result.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  return (
    <Layout>
      {isHomePage && <Hero />}
      {isHomePage && <FeaturedCarousel />}
      <div className="render" id="productos">
        {category.name && (
          <h1 className="categoryTitle">{getCategoryName()}</h1>
        )}
        {isHomePage && (
          <h2 className="sectionTitle">Nuestros Productos</h2>
        )}
        {!loading && (
          <ProductFilters
            onFilterChange={setFilters}
            onSortChange={setSortBy}
            totalProducts={filteredAndSortedProducts.length}
          />
        )}
        <ItemList products={filteredAndSortedProducts} loading={loading} />
      </div>
    </Layout>
  );
}

export default ItemListContainer;
