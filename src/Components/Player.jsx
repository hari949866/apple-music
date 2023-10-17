import "../Styles/Player.css";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { AiTwotoneSound } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { HiPause } from "react-icons/hi";
import {
  useState,
  useContext,
  useRef,
  useEffect,
  memo,
  useCallback,
} from "react";
import PlayingMusic from "./PlayingMusic";
import { AllSongAlbumContext } from "../App";
import CurrentPlayingSong from "./CurrentPlayingSong";

const OptimizedCurrentPlayingSong = memo(CurrentPlayingSong);
const OptimizedPlayingMusic = memo(PlayingMusic);

function Player() {
  //Getting all satate and function from App file
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    setCurrentSong,
    songs,
  } = useContext(AllSongAlbumContext);

  const [isOpenInFull, setIsOpenInFull] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const [index, setIndex] = useState(0);

  const audioPlayer = useRef();

  // Memoize the callback functions for updating duration and currentTime
  const updateDurationAndCurrentTime = useCallback(() => {
    if (audioPlayer.current) {
      const _duration = Math.floor(audioPlayer.current.duration);
      const _currentTime = Math.floor(audioPlayer.current.currentTime);

      setDuration(_duration);
      setCurrentTime(_currentTime);
    }
  }, []);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
    }

    if (isPlaying) {
      const intervalId = setInterval(updateDurationAndCurrentTime, 100);

      // Clear the interval when the component unmounts or when isPlaying becomes false
      return () => clearInterval(intervalId);
    }
  }, [volume, isPlaying, updateDurationAndCurrentTime]);

  //for play and pause music
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }, [isPlaying, currentSong]);

  //when clicked the button then handle play and pause
  const handlePlay = () => {
    if (Object.keys(currentSong).length > 0) {
      setIsPlaying(!isPlaying);
    }
  };

  //for formation the time of music
  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return "00:00";
  }

  //for handle next song
  const handleChangeTrackForward = () => {
    // Calculate the index of the next song
    const nextSongIndex = (index + 1) % songs.length;

    // Set the index of the next song
    setIndex(nextSongIndex);

    // Set the current song using the next index
    setCurrentSong(songs[nextSongIndex]);
  };

  //for handle prev song
  const handleChangeTrackBackward = () => {
    // Calculate the index of the previous song
    const prevSongIndex = (index - 1 + songs.length) % songs.length;

    // Set the index of the previous song
    setIndex(prevSongIndex);

    // Set the current song using the previous index
    setCurrentSong(songs[prevSongIndex]);
  };

  //for showing volume scale
  const handleVolume = () => {
    setIsVolume(!isVolume);
  };

  //for showing song on full screen
  const handleOpenInFull = () => {
    setIsOpenInFull(!isOpenInFull);
  };

  return (
    <>
      <audio src={currentSong.audio_url} ref={audioPlayer} />
      {currentSong && Object.keys(currentSong).length > 0 && (
        <div
          className={
            isOpenInFull ? "big-screen-playing" : "big-screen-playing-down"
          }
        >
          <OptimizedCurrentPlayingSong
            isPlaying={isPlaying}
            currentSong={currentSong}
            setIsPlaying={setIsPlaying}
          />
        </div>
      )}

      <div className="player for-tab-conatiners">
        <div className="progressBarContainer">
          <input
            type="range"
            className="progressBar"
            value={currentTime}
            max={duration || 0}
            onChange={(e) => setCurrentTime(e.target.value)}
          />
        </div>
        <div className="player-icons-parent for-tab-conatiner">
          <div className="player-img first">
            {currentSong && Object.keys(currentSong).length > 0 && (
              <OptimizedPlayingMusic />
            )}
          </div>
          <div className="player-icons second ">
            <div className="player-icon" onClick={handleChangeTrackBackward}>
              <IoPlaySkipBack />
            </div>
            <div className="player-icon" onClick={handlePlay}>
              {isPlaying ? <HiPause /> : <IoPlay />}
            </div>
            <div className="player-icon" onClick={handleChangeTrackForward}>
              <IoPlaySkipForward />
            </div>
          </div>
          <div className="duration forth">
            {formatTime(currentTime)}
            {" / "}
            {formatTime(duration)}
          </div>
          <div className="player-icons third">
            <div className="player-icon volume">
              <input
                className={isVolume ? "volume-control" : "volume-control-none"}
                type="range"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                max={100}
              />
              <div onClick={handleVolume}>
                {" "}
                <AiTwotoneSound />
              </div>
            </div>
            <div className="player-icon" onClick={handleOpenInFull}>
              <MdOutlineOpenInFull />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
