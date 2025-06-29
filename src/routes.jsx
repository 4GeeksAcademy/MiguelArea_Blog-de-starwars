import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            {/* Ruta principal (index) */}
            <Route index element={<Home />} />

            {/* Ruta dinámica con parámetros correctos */}
            <Route path="single/:type/:uid" element={<Single />} />

            {/* Ruta demo */}
            <Route path="demo" element={<Demo />} />
        </Route>
    )
);
