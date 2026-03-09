import "./ProductSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="skeletonCard">
      <div className="skeletonImage"></div>
      <div className="skeletonBody">
        <div className="skeletonTitle"></div>
        <div className="skeletonPrice"></div>
      </div>
    </div>
  );
};

const ProductSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="skeletonGrid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export { ProductSkeleton, ProductSkeletonGrid };
export default ProductSkeleton;
