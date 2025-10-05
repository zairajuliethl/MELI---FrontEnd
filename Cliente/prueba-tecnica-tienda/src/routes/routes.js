import { Routes, Route } from "react-router-dom";
import Search from "../pages/search/search.component";
import {DetailsProduct} from "../pages/details-product/details-product";
import { Layout } from "../layout/layout";
import { Result } from "../pages/result/result";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="/items" element={<Result />} />
        <Route path="/items/:id" element={<DetailsProduct />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
