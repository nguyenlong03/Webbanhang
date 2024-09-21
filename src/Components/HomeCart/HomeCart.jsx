import './HomeCart.scss';
import { TiShoppingCart } from "react-icons/ti";
import ProductSevier from "../../sevies/ProductSevier";


function HomeCart () {
    const {data} = ProductSevier('all', 1); 
    

   
    
    return (
       <div className="container-cart">
            <div className="list-cart">
            {data && data.map((item, index) => (
                <div className="card" key={index}>
                    <div className="image-container">
                        <img src={item.url_img} alt="" />        
                    </div>
                    <p className="price">{item.price.toLocaleString("Vi-VN")}<span>₫</span></p>
                    <div className="content">
                        <p className="product-name">{item.name}</p>
                    </div>

                    <div className="button-container">
                        <button 
                            className="buy-button button"
                        >Buy Now</button>
                        <button className="cart-button button">
                            <i><TiShoppingCart /></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
       </div>
    );
}

export default HomeCart;
