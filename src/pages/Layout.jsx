import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

import Home from "./Home";
import NotFound from "./NotFound";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Single } from "./Single";
import { Demo } from "./Demo";

const Layout = () => {
  const { actions } = useGlobalReducer();

  useEffect(() => {
    actions.getPeople();
    actions.getPlanets();
    actions.getVehicles();
  }, []); // ← este useEffect es el importante

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:type/:uid" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Layout;
