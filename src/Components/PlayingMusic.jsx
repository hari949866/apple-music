import { useContext } from "react";
import "../Styles/PlayingMusic.css";
import { AllSongAlbumContext } from "../App";

//this component will render from Player for showing small image on Player left corner
function PlayingMusic() {
  const { currentSong } = useContext(AllSongAlbumContext);

  if (!currentSong) {
    return null;
  }

  return (
    <>
      <div className="playing-container">
        <div>
          <img
            className="img-playing-song"
            src={currentSong?.thumbnail}
            alt="player image"
          />
        </div>
        <div>
          <div className="playing-title">{currentSong?.title}</div>
          <div className="playing-artist">
            {(currentSong?.artist[0]?.name
              ? currentSong?.artist[0]?.name
              : "") +
              (currentSong?.artist[1]?.name
                ? ", " + currentSong?.artist[1]?.name
                : "")}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayingMusic;
