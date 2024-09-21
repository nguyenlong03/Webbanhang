import React from "react";
import { useParams } from "react-router-dom";
import ProductSevier from "../../sevies/ProductSevier";

const Productintroduction = () => {
  const { id } = useParams();
  const { data } = ProductSevier("all", 1);

  const product = data.find((item) => item.id === parseInt(id));

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.url_img} alt={product.name} />
      <p className="price">{product.price}đ</p>
      <p className="description">{product.description}</p>
    </div>
  );
};

export default Productintroduction;
