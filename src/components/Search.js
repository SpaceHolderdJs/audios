import React, { useContext, useState } from "react";
import { Context } from "../App";

import Card from "./parcials/Card";

import styles from "../styles/search.module.css";

import Aside from "./parcials/Aside";

const Search = () => {
  const { store, dispatch } = useContext(Context);

  const [value, setValue] = useState("");
  const [tracksArray, setTracksArray] = useState();

  const getTracks = (req) => {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${req}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error)
          return alert(
            "API Refused request due to limits per second. Please try again :("
          );
        setTracksArray(data.data);
        console.log(data.data);
        data.data &&
          dispatch({
            type: "INIT_CURR_AUTHOR",
            payload: {
              singer: data.data[0].artist,
              tracks: data.data,
            },
          });
        console.log(data);
      });
  };

  return (
    <div className="row centered section">
      {tracksArray && <Aside />}
      <div className={`column centered ${styles.main}`}>
        <div className="row centered">
          <input
            type="text"
            placeholder="Track..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={() => {
              getTracks(value);
              setValue("");
            }}>
            Search
          </button>
        </div>
        <div className={`row ${styles.wrapper}`}>
          {tracksArray?.map((track) => (
            <Card track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
