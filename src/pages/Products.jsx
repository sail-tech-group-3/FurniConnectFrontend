import { useState, useCallback, useEffect } from "react";
import useProducts from "../customHooks/useProducts";
import {
  Loading,
  ProductCard,
  ProductSearch,
  SectionTitle,
} from "../components";
import { Pagination } from "antd";
const Products = () => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
      setCurrentPage(1);
    },
    [products]
  );

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="align-element py-20">
      <SectionTitle text="Products" />
      <ProductSearch onSearch={handleSearch} />
      <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center pt-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts.length}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default Products;
