import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Series.css";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenre";
const Series = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [selectedGeners, setSelectedGeners] = useState([]);
  const [geners, setGeners] = useState([]);
  const genreforURL = useGenres(selectedGeners);
  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setTotalPages(data.total_pages);
    setContent(data.results);
  };
  useEffect(() => {
    fetchSeries();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [page,genreforURL]);
  return (
    <div>
      <span className='pageTitle'>Tv Series</span>
      <Genres
        type='tv'
        geners={geners}
        setGeners={setGeners}
        setSelectedGeners={setSelectedGeners}
        selectedGeners={selectedGeners}
        setPage={setPage}
      />
      <div className='series'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {totalPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={totalPages} />
      )}
    </div>
  );
};

export default Series;
