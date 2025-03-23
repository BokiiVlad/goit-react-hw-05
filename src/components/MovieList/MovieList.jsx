import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ film }) {
  const location = useLocation();

  return (
    <ul>
      {film.map((el) => (
        <li className={css.topList} key={el.id}>
          <Link
            to={`/movies/${el.id}`}
            className={css.filmName}
            state={location}
          >
            {el.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
