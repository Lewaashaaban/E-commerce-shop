import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrums from "../Components/Breaducrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productid } = useParams();
  const product = all_product.find((e) => e.id === Number(productid));

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product}/>
    </div>
  );
};

export default Product;
