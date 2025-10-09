import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "../Layout/Layout.jsx";
import Home from "../../pages/Home/Home.jsx";
import Teachers from "../../pages/Teachers/Teachers.jsx";
import Favorites from "../../pages/Favorites/Favorites.jsx";
import NotFound from "../NotFound/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="favorites" element={<Favorites />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
