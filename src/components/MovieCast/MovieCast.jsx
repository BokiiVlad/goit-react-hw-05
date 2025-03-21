import { useParams } from "react-router-dom";
import { fetchCast } from "../../api";
import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCastDetail = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchCast(movieId);
        setCast(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCastDetail();
  }, [movieId]);
  console.log(cast);

  return (
    <div>
      {error && <p>An error occurred, please reload the page.</p>}
      {isLoading && <p>Please wait, loading is in progress.</p>}
      <ul className={css.imageList}>
        {cast.map((el) => (
          <li className={css.personCard} key={el.id}>
            <img
              className={css.imageActor}
              src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
              alt="Image actor"
            />
            <p>{el.original_name}</p>
            <p>{el.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
