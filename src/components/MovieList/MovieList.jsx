import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ film }) {
  const location = useLocation();
  const placeholder = "https://placehold.co/500x750?text=No+Image";
  return (
    <ul className={css.listPoster}>
      {film.map((el) => (
        <li className={css.topList} key={el.id}>
          <Link
            to={`/movies/${el.id}`}
            className={css.filmName}
            state={location}
          >
            <img
              className={css.poster}
              src={
                el.poster_path
                  ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                  : placeholder
              }
              alt={`Poster ${el.original_title}`}
            />
            {el.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
