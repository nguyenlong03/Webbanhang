import React from "react";
import { useParams } from "react-router-dom";
import ProductSevier from "../../sevies/ProductSevier";
import './ProductDetail.scss';

function ProductDetail() {
    const { id } = useParams();
    const { data } = ProductSevier("all", 1);
    const product = data.find((item) => item.id === parseInt(id));
    if (!product) return <div>Không tìm thấy sản phẩm.</div>;

    return <div className="productDetail-container">  
        <div className="image-container">
            <div className='btn-img'>
                <button className='active'><img src={product.url_img} alt="" /></button>
            </div>
            <div className='img'>
                <img src={product.url_img} alt=""/>
            </div>
        </div> 
        <div className="detail">
            <div className="content">
                <p className="product-name">{product.name}</p>
                <p className="price">{product.price.toLocaleString("VI-VN")}<span>₫</span></p>
                <p className="description">dây là áo dẹp</p>
            </div>
            <div className="size-color">
                <div className="size">
                    <label for="size">Size:</label>
                    <select id="size">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="L">XL</option>
                        <option value="L">2XL</option>
                    </select>
                </div>
                <div className="color">
                    <label for="color">Color:</label>
                    <select id="color">
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>
                </div>
            </div>
            <div className="btn-detail">
                <button className='buy'>Buy Now</button>
                <button className='add-cart'>Add Shopping Cart</button>
            </div>
        </div>
    </div>;
}

export default ProductDetail;