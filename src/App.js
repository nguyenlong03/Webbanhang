import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import ProductsApi from "./sevies/Products/Products.js";
import { useState } from "react";
function App() {
  const [data, setdata] = useState("");
  useEffect(() => {
    const getuser = async () => {
      const produclist = await ProductsApi.getALL();
      console.log("checck ress", produclist);
      setdata(produclist.products);
    };

    getuser();
  }, []);

  return (
    <div className="App">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-contents">
        <Outlet />
      </div>

      <hr className="border-primary custom-hr my-4" />
      <div className="test-data">
        {
            data&&data.map((item , index)=>{
            return  <div key={index}>
            <ul>
            
              <li>{item.title}</li>
              <img src={item.url_img} alt="" />
            </ul>
            </div>

            })
           }
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
