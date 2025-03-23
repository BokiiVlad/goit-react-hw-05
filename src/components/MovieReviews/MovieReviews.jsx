import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviewsDetails = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviewsDetails();
  }, [movieId]);
  console.log(movieId);
  console.log(reviews);

  const data = reviews.map((el) => (
    <li className={css.reviewsCard} key={el.id}>
      <p>{el.author}</p>
      <p>{el.content}</p>
    </li>
  ));

  return (
    <>
      {error && <p>An error occurred, please reload the page.</p>}
      {isLoading && <p>Please wait, loading is in progress.</p>}
      <ul>{reviews.length > 0 ? data : <p>Not found</p>}</ul>
    </>
  );
}
