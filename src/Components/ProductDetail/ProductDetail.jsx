//import ProductSevier from "../../sevies/ProductSevier";
import './ProductDetail.scss';

function ProductDetail() {
   
    //const {data} = ProductSevier('all', 1);
    return <div className="productDetail-container">  
        <div className="image-container">
            <div className='btn-img'>
                <button className='active'><img src="https://product.hstatic.net/200000174405/product/gl0483-1_4e757a50a97644af982fe572a53912b2_master.jpg" alt="" /></button>
            </div>
            <div className='img'>
                <img src='https://product.hstatic.net/200000174405/product/gl0483-1_4e757a50a97644af982fe572a53912b2_master.jpg' alt=""/>
            </div>
        </div> 
        <div className="detail">
            <div className="content">
                <p className="product-name">áo</p>
                <p className="price">200<span>₫</span></p>
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