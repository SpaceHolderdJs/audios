import React, { createContext, useReducer, useEffect, useRef } from "react";

import Header from "./components/parcials/Header";
import Search from "./components/Search";
import LikeList from "./components/LikeList";

import "./App.css";

const reducer = (store, action) => {
  switch (action.type) {
    case "INIT_TAB":
      return { ...store, tab: action.payload };

    case "INIT_AUDIO":
      return { ...store, audio: action.payload };

    case "AUDIO_STATUS":
      return { ...store, playing: action.payload };

    case "INIT_CURR_TIME":
      return { ...store, time: action.payload };

    case "INIT_CURR_AUTHOR":
      return { ...store, authorData: action.payload };

    case "ADD_TO_LIKELIST":
      return { ...store, likeList: [...store.likeList, action.payload] };

    case "REMOVE_FROM_LIKELIST":
      return {
        ...store,
        likeList: store.likeList.filter(
          (song) => song.id !== action.payload.id
        ),
      };

    default:
      return store;
  }
};

export const Context = createContext();

function App() {
  const [store, dispatch] = useReducer(reducer, {
    tab: "info",
    playing: true,
    likeList: localStorage.getItem("likelist")
      ? JSON.parse(localStorage.getItem("likelist"))
      : [],
  });

  const audioRef = useRef();

  useEffect(() => {
    const { current } = audioRef;
    current.load();
    current.src = store.audio;
    current.play();
  }, [store.audio]);

  useEffect(() => {
    store.playing ? audioRef.current.pause() : audioRef.current.play();
  }, [store.playing]);

  useEffect(() => {
    localStorage.setItem("likelist", JSON.stringify(store.likeList));
  }, [store.likeList]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: "INIT_CURR_TIME",
        payload: audioRef.current.currentTime,
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`column centered app`}>
      <Context.Provider value={{ dispatch, store, audioRef }}>
        <audio src={store.audio} ref={audioRef} crossOrigin="anonymous"></audio>

        <Header />
        {store.tab === "search" ? <Search /> : <LikeList />}
      </Context.Provider>
    </div>
  );
}

export default App;
