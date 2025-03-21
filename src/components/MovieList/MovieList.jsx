import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ film }) {
  return (
    <ul>
      {film.map((el) => (
        <li className={css.topList} key={el.id}>
          <Link to={`/movies/${el.id}`} className={css.filmName}>
            {el.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
