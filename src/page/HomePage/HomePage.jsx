import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";
import { useEffect, useState } from "react";
import { fetchFilms } from "../../api";

export default function HomePage() {
  const [film, setFilm] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFilm = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchFilms();
        setFilm(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadFilm();
  }, []);

  return (
    <>
      {error && <p>An error occurred, please reload the page.</p>}
      {isLoading && <p>Please wait, loading is in progress.</p>}
      <MovieList film={film} />
    </>
  );
}
