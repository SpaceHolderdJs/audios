import React, { useContext, useEffect } from "react";
import { Context } from "../App";

import Card from "./parcials/Card";

import styles from "../styles/likelist.module.css";

const LikeList = () => {
  const { store, dispatch } = useContext(Context);

  return (
    <div className={`column centered ${styles.likelist}`}>
      <h3>LikeList</h3>
      <div className={`row centered ${styles.wrapper}`}>
        {store.likeList.length ? (
          store.likeList.map((track) => <Card track={track} />)
        ) : (
          <h4>There is no any song yet</h4>
        )}
      </div>
    </div>
  );
};

export default LikeList;
