import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";
const Genres = ({
  type,
  geners,
  setGeners,
  setSelectedGeners,
  selectedGeners,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGeners([...selectedGeners, genre]);
    setGeners(geners.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGeners(selectedGeners.filter((selected) => selected.id !== genre.id));
    setGeners([...geners, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
    );
    setGeners(data.genres);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGeners({});
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ padding: "6px 0" }}>
    {selectedGeners &&
        selectedGeners.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            size='small'
            color="primary"
            key={genre.id}
            clickable
            onDelete={()=>handleRemove(genre)}
          />
        ))}
      {geners &&
        geners.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            label={genre.name}
            size='small'
            key={genre.id}
            clickable
            onClick={()=>handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
