import { useParams } from "react-router-dom";

export default function MoviesPage({ film }) {
  const { movieId } = useParams();

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
        alt="movie picture"
      />
    </>
  );
}
