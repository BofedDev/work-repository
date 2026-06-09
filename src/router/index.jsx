import { createBrowserRouter, Outlet } from "react-router";
import HomePage from "@pages/HomePage/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage/ProductDetailPage";
import CategoryPage from "@pages/CategoryPage/categoryPage.jsx";
import CartPage from "@pages/CartPage/CartPage.jsx";
import Navbar from "@components/reusableComponents/navbar.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

const RootLayout = () => (
    <>
        <Navbar />
        <Breadcrumbs />
        <Outlet />
    </>
);

const routerConfig = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/",                    element: <HomePage /> },
            { path: "/about",               element: <div>About</div> },
            { path: "/category",            element: <CategoryPage /> },
            { path: "/category/:category",  element: <CategoryPage /> },
            { path: "/cart",                element: <CartPage /> },
            { path: "/product/:id",         element: <ProductDetailPage /> },
            { path: "*",                    element: <div>404</div> },
        ],
    },
]);

export default routerConfig;