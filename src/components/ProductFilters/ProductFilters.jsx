import { useState } from "react";
import { FunnelFill, SortDown, X } from "react-bootstrap-icons";
import "./ProductFilters.css";

const ProductFilters = ({ onFilterChange, onSortChange, totalProducts }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("default");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  const handlePriceChange = (field, value) => {
    const newRange = { ...priceRange, [field]: value };
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onFilterChange({
      minPrice: priceRange.min ? parseInt(priceRange.min) : null,
      maxPrice: priceRange.max ? parseInt(priceRange.max) : null,
    });
  };

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setSortBy("default");
    onFilterChange({ minPrice: null, maxPrice: null });
    onSortChange("default");
  };

  const hasActiveFilters = priceRange.min || priceRange.max || sortBy !== "default";

  return (
    <div className="filtersContainer">
      <div className="filtersHeader">
        <span className="productCount">{totalProducts} productos</span>

        <div className="filtersActions">
          <button
            className={`filterToggleBtn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelFill /> Filtrar
          </button>

          <div className="sortSelect">
            <SortDown />
            <select value={sortBy} onChange={handleSortChange}>
              <option value="default">Ordenar por</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
              <option value="newest">Más recientes</option>
            </select>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filtersPanel">
          <button
            className="closePanelBtn"
            onClick={() => setShowFilters(false)}
            aria-label="Cerrar filtros"
          >
            <X />
          </button>
          <div className="filterGroup">
            <label>Rango de precio</label>
            <div className="priceInputs">
              <input
                type="number"
                placeholder="Mínimo"
                value={priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Máximo"
                value={priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
              />
              <button className="applyPriceBtn" onClick={applyPriceFilter}>
                Aplicar
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <button className="clearFiltersBtn" onClick={clearFilters}>
              <X /> Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
