import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPreview from "../components/Preview";
import NoRoutePage from "./NoRoutes";
import ModelView from "../components/model";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPreview />} />
        <Route path="*" element={<NoRoutePage />} />
        <Route path="/model" element={<ModelView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
