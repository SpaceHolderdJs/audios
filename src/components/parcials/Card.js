import React, { useContext } from "react";

import { Context } from "../../App";

import styles from "../../styles/card.module.css";

const Card = ({ track }) => {
  const {
    title_short,
    link,
    duration,
    rank,
    preview,
    md5_image,
    artist,
    album,
  } = track;

  const { store, dispatch, audioRef } = useContext(Context);

  const durationDate = new Date(duration * 1000);
  const shorterRankValue = +rank.toString().slice(0, 2);

  const dateFixer = (dt) => (toString(dt).length > 1 ? dt : "0" + dt);

  const quantityOfLines = 3;
  const lines = [1, 2, 3];

  const animatedActionFragment = (
    <div className={styles.action}>
      <div className={`row centered ${styles.action}`}>
        {lines.map((line, i) => (
          <div
            className={styles.line}
            style={{ animation: `playing ${i + 1}s linear infinite` }}></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`column ${styles.card}`}>
      <div
        className={styles.img}
        style={{ background: `url(${album.cover_medium})` }}>
        {store.audio === preview && animatedActionFragment}
      </div>
      <button
        className={`row centered ${styles.playBtn}`}
        onClick={() => {
          store.audio !== preview &&
            dispatch({ type: "INIT_AUDIO", payload: preview });
          dispatch({ type: "AUDIO_STATUS", payload: !store.playing });
        }}>
        {!store.playing && store.audio === preview ? "Stop" : "Play"}
      </button>

      <div className={`column ${styles.cardContent}`}>
        {store.audio === preview && (
          <input
            type="range"
            min={0}
            max={30}
            step={1}
            value={store.time}
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
          />
        )}
        <div className={`row centered ${styles.informerRow}`}>
          <h3>{title_short}</h3>
          {store.likeList.find((t) => t.id === track.id) ? (
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_LIKELIST", payload: track })
              }>
              Dislike
            </button>
          ) : (
            <button
              onClick={() =>
                dispatch({ type: "ADD_TO_LIKELIST", payload: track })
              }>
              Like
            </button>
          )}
        </div>
        <div className={`row centered ${styles.informerRow}`}>
          <span>Duration:</span>
          <span>
            {dateFixer(durationDate.getMinutes())}m{" "}
            {dateFixer(durationDate.getSeconds())}s
          </span>
        </div>
        <div className={`row centered ${styles.informerRow}`}>
          Rank:
          <div
            className={`row centered ${styles.rank}`}
            style={{
              width: shorterRankValue + "px",
              background: `rgb(${(100 - shorterRankValue) * 2},${
                (shorterRankValue - 50) * 2
              },70)`,
            }}>
            {rank}
          </div>
        </div>
        <a href={link}>View</a>
      </div>
    </div>
  );
};

export default Card;
