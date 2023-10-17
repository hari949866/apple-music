import NavBar from "./NavBar";
import Player from "./Player";
import { useContext, useState, useEffect, memo } from "react";
import { AllSongAlbumContext } from "../App";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/FilteredSongs.css";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";

const OptimizedNavBar = memo(NavBar);
const OptimizedPlayer = memo(Player);

//from multi-carousel library
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 9,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

//for all cards details
const Card = ({ title, artist, thumbnail, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-artist">{artist}</div>
    </div>
  );
};

function FilteredSongs() {
  const projectId = "dlzsedvtpspr";
  //getting state and function from App file
  const { setCurrentSong, selectedMood, setSelectedMood, setIsPlaying } =
    useContext(AllSongAlbumContext);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //fetching data which is selected in navBar by mood option
  useEffect(() => {
    setLoading(true);
    if (selectedMood === "noValue") {
      setSelectedMood(selectedMood);
      navigate("/");
    }
    const mood = localStorage.getItem("mood");
    setSelectedMood(mood);

    fetch(
      `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${mood}"}`,
      {
        headers: {
          projectId: projectId,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("filteredData", data);
        setFilteredSongs(data.data);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call completes
      });
  }, [selectedMood]);

  //showing Loading until getting data
  if (loading) {
    return (
      <div className="loading">
        {" "}
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    );
  }

  //creating this generateCarouselForSongs for showing card by choice like 10 to 20 card from Songs array
  const generateCarouselForSongs = (startIndex, endIndex) => {
    if (!filteredSongs || filteredSongs.length === 0) {
      return null;
    }

    return (
      <Carousel responsive={responsive}>
        {filteredSongs.slice(startIndex, endIndex).map((song) => (
          <Card
            onClick={() => {
              setCurrentSong(song);
              setIsPlaying(true);
            }}
            key={song?._id}
            title={song?.title}
            artist={
              (song?.artist[0]?.name ? song?.artist[0]?.name : "") +
              (song?.artist[1]?.name ? ", " + song?.artist[1]?.name : "")
            }
            thumbnail={song?.thumbnail}
          />
        ))}
      </Carousel>
    );
  };
  return (
    <div className="filter-container">
      <div>
        <OptimizedNavBar />
      </div>
      <div>
        <div className="mod ">Music You Choose</div>
        <div className="mod-card">
          {generateCarouselForSongs(0, 15)}
          {generateCarouselForSongs(15, 30)}
          {generateCarouselForSongs(30, 45)}
          {generateCarouselForSongs(45, 60)}
          {generateCarouselForSongs(60, 75)}
          {generateCarouselForSongs(75, 90)}
          {generateCarouselForSongs(90, 100)}
        </div>
      </div>
      <div>
        <OptimizedPlayer />
      </div>
    </div>
  );
}

export default FilteredSongs;
