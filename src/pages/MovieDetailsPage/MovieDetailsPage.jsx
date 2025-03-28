import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchDetail } from "../../api";
import css from "./MovieDetailsPage.module.css";

export default function MoviesPage() {
  const { movieId } = useParams();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const locationRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const loadDetail = await fetchDetail(movieId);
        setDetail(loadDetail);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetailMovie();
  }, [movieId]);

  if (!detail) return <p>No movie details available.</p>;

  return (
    <div>
      {error && <p>An error occurred, please reload the page.</p>}
      {isLoading && <p>Please wait, loading is in progress.</p>}
      <Link to={locationRef.current}>Go back</Link>
      <div className={css.imgDetails}>
        <div>
          <img
            className={css.poster}
            src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`}
            alt="image movies"
          />
        </div>
        <div className={css.detailField}>
          <h3>{detail.title}</h3>
          <p>User score {detail.vote_average}</p>
          <ul className={css.list}>
            <li>
              <p className={css.nameSection}>Owerview:</p>
              <p>{detail.overview}</p>
            </li>
            <li>
              <p className={css.nameSection}>Genres:</p>
              <p>{detail.genres && detail.genres[0]?.name}</p>
            </li>
          </ul>
        </div>
      </div>
      <p>Additional information</p>
      <div className={css.link}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
