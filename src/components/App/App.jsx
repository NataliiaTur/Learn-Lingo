import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@context/AuthContext.jsx";
import "./App.css";
import Layout from "@components/Layout/Layout.jsx";
import PrivateRoute from "@components/PrivateRoute/PrivateRoute.jsx";
import Loading from "@components/Loading/Loading.jsx";

const Home = lazy(() => import("@pages/Home/Home.jsx"));
const Teachers = lazy(() => import("@pages/Teachers/Teachers.jsx"));
const Favorites = lazy(() => import("@pages/Favorites/Favorites.jsx"));
const NotFound = lazy(() => import("../NotFound/NotFound.jsx"));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />

            <Route
              path="teachers"
              element={
                <Suspense fallback={<Loading />}>
                  <Teachers />
                </Suspense>
              }
            />

            <Route
              path="favorites"
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
