import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSevier from "../../sevies/ProductSevier";
import './ProductDetail.scss';

function ProductDetail() {
    const { id } = useParams();
    const { data } = ProductSevier("all", 1);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data.length > 0) {
            const foundProduct = data.find((item) => item.id === parseInt(id));
            setProduct(foundProduct);
            if (foundProduct && foundProduct.url_img) {
                if (Array.isArray(foundProduct.url_img)) {
                    setSelectedImage(foundProduct.url_img[0]);
                } else if (typeof foundProduct.url_img === 'string') {
                    setSelectedImage(foundProduct.url_img);
                }
            }
            setIsLoading(false);
        }
    }, [data, id]);

    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    if (isLoading) return <div>Đang tải...</div>;
    if (!product) return <div>Không tìm thấy sản phẩm.</div>;

    // Lấy danh sách size từ API (giả sử API trả về mảng product.sizes)
    const sizes = product.sizes || []; // Mặc định là mảng rỗng nếu không có size

    return (
        <div className="productDetail-container">
            <div className="image-container">
                {product.url_img ? (
                    <>
                        {Array.isArray(product.url_img) && product.url_img.length > 1 && (
                            <div className="toggle-container">
                                {product.url_img.map((url, i) => (
                                    <button 
                                        key={i} 
                                        className={`toggle ${url === selectedImage ? 'active' : ''}`} 
                                        onClick={() => handleImageClick(url)}
                                    >
                                        <img 
                                            src={url} 
                                            alt={`Product Image ${i}`} 
                                            className="toggle-img"
                                            onError={(e) => {
                                                console.error(`Error loading image: ${url}`);
                                                e.target.src = 'placeholder.jpg';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className='img'>
                            <img 
                                src={selectedImage} 
                                alt="Selected Product" 
                                onError={(e) => {
                                    console.error(`Error loading main image: ${selectedImage}`);
                                    e.target.src = 'placeholder.jpg';
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div className='img'>
                        <img 
                            src={product.url_img} 
                            alt="Selected Product" 
                        />
                    </div>
                )}
            </div>

            <div className="detail">
                <div className="content">
                    <p className="product-name">{product.name}</p>
                    <p className="price">
                        {product.price.toLocaleString("Vi-VN")}
                        <span>₫</span>
                    </p>
                    <p className="desc">{product.description}</p>
                </div>

                <div className="size-color">
                    <div className="size">
                        <label htmlFor="size">Size:</label>
                        <select id="size">
                            {sizes.length > 0 ? (
                                sizes.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))
                            ) : (
                                <option value="N/A">Không có size</option>
                            )}
                        </select>
                    </div>

                    <div className="color">
                        <label htmlFor="color">Color:</label>
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
        </div>
    );
}

export default ProductDetail;
