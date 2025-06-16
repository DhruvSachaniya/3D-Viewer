import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPreview from "../components/Preview";
import NoRoutePage from "./NoRoutes";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPreview />} />
        <Route path="*" element={<NoRoutePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
