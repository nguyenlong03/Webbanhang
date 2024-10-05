import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/forgotPassword/forgotPassword";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Cart from "./Pages/shoppingcart/shoppingcart";
import Notification from "./Pages/Notify/Notify";
import Payment from "./Pages/Pay/Pay";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="shoppingcart" element={<Cart />} />
          <Route path="notify" element={<Notification />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
