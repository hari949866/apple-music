import { memo } from "react";
import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import MainFeed from "./MainFeed";
import Player from "./Player";
import "../Styles/applemusic.css";
import { useEffect, useContext } from "react";
import { AllSongAlbumContext } from "../App";

const OptimizedNavBar = memo(NavBar);
const OptimizedSideBar = memo(SideBar);
const OptimizedMainFeed = memo(MainFeed);
const OptimizedPlayer = memo(Player);

function Applemusic() {
  const { setSelectedMood } = useContext(AllSongAlbumContext);
  useEffect(() => {
    setSelectedMood("noValue");
  }, []);

  return (
    <>
      <div>
        <OptimizedNavBar />
      </div>
      <div className="sideBar-feed">
        <div className="side-bar">
          <OptimizedSideBar />
        </div>
        <div className="feed">
          <OptimizedMainFeed />
        </div>
      </div>
      <div>
        <OptimizedPlayer />
      </div>
    </>
  );
}

export default Applemusic;
