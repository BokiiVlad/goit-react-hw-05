import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetail } from "../../api";
import css from "./MovieDetailsPage.module.css";

export default function MoviesPage() {
  const { movieId } = useParams();
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
  console.log(movieId);
  console.log(detail);

  return (
    <div>
      {error && <p>An error occurred, please reload the page.</p>}
      {isLoading && <p>Please wait, loading is in progress.</p>}
      <button>Go back</button>
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
    </div>
  );
}
