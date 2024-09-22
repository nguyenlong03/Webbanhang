import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dress from "./Pages/Dress/Dress";
import Poloshirt from "./Pages/Poloshirt/Poloshirt";
import TShirt from "./Pages/T-shirt/T-shirt";
import Trouser from "./Pages/Trouser/Trouser";
import Trousershort from "./Pages/TrouserShorts/Trousershort";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProductDetail from "./Components/ProductDetail/ProductDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        {/* <Route path="hotProduct/:id" element={<ProductDetail />} /> */}
        <Route path="dress" element={<Dress />} />
        <Route path="poloshirt" element={<Poloshirt />} />
        <Route path="t-shirt" element={<TShirt />} />
        <Route path="trouser" element={<Trouser />} />
        <Route path="trouserShort" element={<Trousershort />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);
