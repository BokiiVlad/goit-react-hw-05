import { useEffect, useState } from "react";
import { fetchQueryFilms } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [filterFilm, setFilterFilm] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const setInputValueForm = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams);
    if (inputValue.trim() !== "") {
      newParams.set("query", inputValue);
    } else {
      newParams.delete("query");
    }
    setSearchParams(newParams);
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
      {filterFilm > 0 && <MovieList film={filterFilm} />}
    </>
  );
}
