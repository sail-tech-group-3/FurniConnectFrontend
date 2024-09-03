import { useState, useCallback, useEffect } from "react";
import useProducts from "../customHooks/useProducts";
import {
  Loading,
  ProductCard,
  ProductSearch,
  SectionTitle,
} from "../components";

const Products = () => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleSearch = useCallback(
    ({ searchInput, productType, sortOrder }) => {
      let filtered = [...products];

      if (searchInput) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      if (productType !== "All") {
        filtered = filtered.filter(
          (product) => product.productType === productType
        );
      }

      filtered = filtered.sort((a, b) => {
        if (sortOrder === "ascend") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      setFilteredProducts(filtered);
    },
    [products]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="align-element py-20">
      <SectionTitle text="Products" />
      <ProductSearch onSearch={handleSearch} />
      <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
