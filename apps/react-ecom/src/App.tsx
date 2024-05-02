import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/Products";

import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function App() {

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     console.log("accesstoken not found!")
  //     return redirect("/login");
  //     // window.location.href = "/login"
  //   } else {
  //     console.log("accesstoken found!")
  //     return redirect("/products");
  //     // window.location.href = "/products"
  //   }
  // }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;