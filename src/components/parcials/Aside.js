import React, { useEffect, useContext, useCallback, useState } from "react";

import { Bar } from "react-chartjs-2";

import { Context } from "../../App";

import styles from "../../styles/aside.module.css";

const Aside = () => {
  const { store, dispatch, audioRef } = useContext(Context);

  const playHandler = useCallback(() => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      dispatch({ type: "AUDIO_STATUS", payload: false });
    } else {
      audioRef.current.pause();
      dispatch({ type: "AUDIO_STATUS", payload: true });
    }
  }, []);

  const forwardSwitchHandler = useCallback(() => {
    const tracks = store.authorData.tracks;
    const index = tracks.indexOf(
      tracks.find((track) => track.preview === store.audio)
    );

    dispatch({
      type: "INIT_AUDIO",
      payload:
        index + 1 > tracks.length - 1
          ? tracks[0].preview
          : tracks[index + 1].preview,
    });
  }, [store.authorData, store.audio]);

  const prevSwitchHandler = useCallback(() => {
    const tracks = store.authorData.tracks;
    const index = tracks.indexOf(
      tracks.find((track) => track.preview === store.audio)
    );

    dispatch({
      type: "INIT_AUDIO",
      payload:
        index - 1 < 0
          ? tracks[tracks.length - 1].preview
          : tracks[index - 1].preview,
    });
  }, [store.authorData, store.audio]);

  const authorInfoFragment = () => {
    const { name, link, picture_medium } = store.authorData.singer;
    const tracks = store.authorData.tracks;

    const data = {
      labels: tracks.map((track) => track.title_short),
      datasets: [
        {
          label: "Rank",
          data: tracks.map((track) => track.rank),
        },
      ],
    };

    const options = {
      indexAxis: "x",
      responsive: false,
      plugins: {
        legend: false,
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
    };

    return (
      <div className="column centered">
        <img src={picture_medium} alt={name} className={styles.avatar} />
        <h3>{name}</h3>
        <a href={link}>View</a>
        <div className={`column centered ${styles.chartWrapper}`}>
          <Bar data={data} options={options} />
          <h3>Songs raiting</h3>
        </div>
        <div className="row centered">
          <button onClick={() => prevSwitchHandler()}>{"<<"}</button>
          <button onClick={() => playHandler()}>Play</button>
          <button onClick={() => forwardSwitchHandler()}>{">>"}</button>
        </div>
      </div>
    );
  };

  return (
    <aside className={`column centered`}>
      {store.authorData?.singer ? authorInfoFragment() : <h1>Loading...</h1>}
    </aside>
  );
};

export default Aside;
