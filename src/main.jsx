import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";           // ← Изменено
import routerConfig from "@router/index.jsx";
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={routerConfig} />
    </Provider>
);