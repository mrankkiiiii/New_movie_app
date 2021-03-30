import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Movies.css";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenre";
const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [selectedGeners, setSelectedGeners] = useState([]);
  const [geners, setGeners] = useState([]);
  const genreforURL = useGenres(selectedGeners);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setTotalPages(data.total_pages);
    setContent(data.results);
  };
  useEffect(() => {
    fetchMovies();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [page,genreforURL]);
  return (
    <div>
      <span className='pageTitle'>Movies</span>
      <Genres
        type='movie'
        geners={geners}
        setGeners={setGeners}
        setSelectedGeners={setSelectedGeners}
        selectedGeners={selectedGeners}
        setPage={setPage}
      />
      <div className='movies'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
          {totalPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={totalPages} />
      )}
      </div>
    </div>
  );
};

export default Movies;
