import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPreview from "../components/Preview";
import NoRoutePage from "./NoRoutes";
import ModelView from "../components/model";
import AdminLayout from "../components/AdminLayout";
import "../App.css";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPreview />} />
        <Route path="*" element={<NoRoutePage />} />
        <Route
          path="/model"
          element={<AdminLayout children={<ModelView />}></AdminLayout>}
        />
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
