import React, { useContext } from "react";
import { Context } from "../../App.js";

import styles from "../../styles/header.module.css";

const Header = () => {
  const tabs = ["search", "likelist"];

  const { store, dispatch } = useContext(Context);

  return (
    <header className={`row centered ${styles.header}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => dispatch({ type: "INIT_TAB", payload: tab })}>
          {tab}
        </button>
      ))}
    </header>
  );
};

export default Header;
