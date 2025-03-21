import { useEffect, useState } from "react";
import { fetchQueryFilms } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [filterFilm, setFilterFilm] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const setInputValueForm = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleClick = () => {
    setQuery(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (!query.trim()) return;

    const loadQueryFilm = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchQueryFilms(query);
        setFilterFilm(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadQueryFilm();
  }, [query]);

  return (
    <>
      <div className={css.inputField}>
        <input
          className={css.inputQuery}
          type="text"
          name="search"
          value={inputValue}
          onChange={setInputValueForm}
        ></input>
        <button className={css.queryBtn} type="button" onClick={handleClick}>
          Search
        </button>
      </div>
      {error && <p>An error occurred, please reload the page.</p>}
      {isLoading && <p>Please wait, loading is in progress.</p>}
      {filterFilm.length === 0 && <p>Movies not found</p>}
      <MovieList film={filterFilm} />
    </>
  );
}
