import { Provider } from "react-redux";
import store, { persistor } from "../redux/store/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./App";
import { createRoot } from "react-dom/client";
import "../App.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </PersistGate>
  </Provider>
);
