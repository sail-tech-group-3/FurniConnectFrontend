/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Input, Select } from "antd";

const { Option } = Select;

const ProductSearch = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [productType, setProductType] = useState("All");
  const [sortOrder, setSortOrder] = useState("ascend");

  const handleSearch = () => {
    onSearch({ searchInput, productType, sortOrder });
  };

  return (
    <div className="grid  md:grid-cols-2 gap-4 mb-6 mt-8">
      <Input
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="h-12"
      />
      <Select
        value={productType}
        onChange={(value) => setProductType(value)}
        className="h-12"
      >
        <Option value="All">All Types</Option>
        <Option value="Chairs">Chairs</Option>
        <Option value="Tables">Tables</Option>
        <Option value="Beds">Beds</Option>
      </Select>
      <Select
        value={sortOrder}
        onChange={(value) => setSortOrder(value)}
        className="h-12"
      >
        <Option value="ascend">A-Z</Option>
        <Option value="descend">Z-A</Option>
      </Select>
      <Button
        type="primary"
        onClick={handleSearch}
        className="h-12 bg-[#2E3192]"
      >
        Search
      </Button>
    </div>
  );
};

export default ProductSearch;
