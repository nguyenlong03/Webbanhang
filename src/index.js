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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="dress" element={<Dress />} />
          <Route path="poloshirt" element={<Poloshirt />} />
          <Route path="t-shirt" element={<TShirt />} />
          <Route path="trouser" element={<Trouser />} />
          <Route path="trouserShort" element={<Trousershort />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
