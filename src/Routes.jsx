import React from "react";
import { Routes, Route } from "react-router-dom";

// Importação das páginas
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
        </Routes>

    );
};

export default AppRoutes;
