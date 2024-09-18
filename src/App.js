import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import ProductsApi from "./sevies/Products/Products.js";
function App() {
  useEffect(() => {
    const params = {
      _limit: 10,
    };
    const getuser = async () => {
      const produclist = await ProductsApi.getALL(params);
      console.log("checck ress", produclist);
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

      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
