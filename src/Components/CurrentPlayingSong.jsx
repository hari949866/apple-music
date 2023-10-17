import "../Styles/CurrentPlayingSong.css";

//this component will render when click on for full screen from Player
function CurrentPlayingSong({ isPlaying, currentSong, setIsPlaying }) {
  //if clicked on play button then set value on true
  const handlePlaySong = () => {
    if (isPlaying === false) {
      setIsPlaying(true);
    }
  };

  //id current song empty then return
  if (!currentSong) {
    return null;
  }
  return (
    <>
      <div className="current-box-container">
        <div className="upper-details">
          <div className="left-side-current">
            {" "}
            <img className="current-img" src={currentSong?.thumbnail} alt="" />
          </div>
          <div className="right-side-current">
            <div className="current-heading">{currentSong?.title}</div>
            <div className="rel-date">
              Released on {currentSong?.dateOfRelease?.slice(0, 10)}
            </div>
            <button onClick={handlePlaySong} className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="lower-details">
          <div className="singer-heading">Singers</div>
          <div className="singers">
            {currentSong &&
              Object.keys(currentSong).length > 0 &&
              currentSong?.artist &&
              currentSong?.artist.length > 0 &&
              currentSong?.artist?.map((singer, index) => (
                <div key={index}>{singer?.name}</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentPlayingSong;
