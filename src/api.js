import axios from "axios"

const options = {
    headers: {
        // Замість api_read_access_token вставте свій токен
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmNkOWVkNWM3Yjk2ODI5YmU5ZDY3NTY1YTMyYzc4ZCIsIm5iZiI6MTc0MjQ2ODYxNC42MzEsInN1YiI6IjY3ZGJmNjA2YzYwZDUxNzdhZGVhMDZkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.56w6yMPE3bnksDaSzFvqXONP76brpRJkVYifJRbMRmM`
    }
};

export const fetchFilms = async () => {
    const apiFilm = await axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US", options)
    return apiFilm.data.results;
}

export const fetchQueryFilms = async (queryValue) => {
    const apiFilm = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${queryValue}&language=en-US`, options)
    return apiFilm.data.results;
}


export const fetchDetail = async (id) => {
    const detail = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options)
    return detail.data;
}


export const fetchReviews = async (id) => {
    const detail = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, options)
    return detail.data.results;
}
export const fetchCast = async (id) => {
    const detail = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
    const cast = detail.data.cast.slice(0, 8);
    return cast;
}

