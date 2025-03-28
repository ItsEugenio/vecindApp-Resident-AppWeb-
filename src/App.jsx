import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Residents from "./pages/Residents";
import Neighborhood from "./pages/Neighborhood";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/residentes" element={<Residents />} />
        <Route path="/residencial" element={<Neighborhood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
