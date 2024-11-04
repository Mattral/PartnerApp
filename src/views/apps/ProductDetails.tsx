// src/views/apps/ProductDetails.tsx

import React from "react";

type ProductDetailsProps = {
  id: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
    </div>
  );
};

export { ProductDetails };
