import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../layouts/MainLayout";

const Home = lazy(() => import("../pages/Home"));
const Packages = lazy(() => import("../pages/Packages"));
const Destination = lazy(() => import("../pages/Destination"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        {/* Layout wrapper MUST wrap children */}
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/packages" element={<Packages/>} />
          <Route path="/destination" element={<Destination/>} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;