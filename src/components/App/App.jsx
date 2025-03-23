import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";

const HomePage = lazy(() => import("../../page/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../page/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../page/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../page/NotFoundPage/NotFoundPage"));
const Navigation = lazy(() => import("../Navigation/Navigation"));

function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
