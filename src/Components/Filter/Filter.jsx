import './Filter.scss';

function Filter() {
    return <div className="filter"> 
        <h1>Hôm nay mua gì</h1>
        <ul className="nav-navbar">
          <li className="filter-item"><a href="">Toàn bộ</a></li>
          <li className="filter-item"><a href="">Áo phông</a></li>
          <li className="filter-item"><a href="">Áo sơ mi</a></li>
          <li className="filter-item"><a href="">Chân váy</a></li>
          <li className="filter-item"><a href="">Quần short</a></li>
          <li className="filter-item"><a href="">Phụ kiện</a></li>
        </ul>
    </div>
} 

export default Filter;