import NavBar from "./NavBar";
import Player from "./Player";
import { useContext, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/SearchItem.css";

const OptimizedNavBar = memo(NavBar);
const OptimizedPlayer = memo(Player);

//This is from multi-carousel library
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

//Creating this for all card details
const Card = ({ title, artist, thumbnail, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-artist">{artist}</div>
    </div>
  );
};

function SearchItem() {
  const navigate = useNavigate();

  //getting all state, function from App file
  const { search, searchItem, setCurrentSong, setIsPlaying } =
    useContext(AllSongAlbumContext);

  //if search box is empty then going to main page
  useEffect(() => {
    if (!search) {
      navigate("/");
    }
  }, [search]);

  //creating this generateCarouselForSongs for showing card by choice like 10 to 20 card from Songs array
  const generateCarouselForSongs = (startIndex, endIndex) => (
    <Carousel responsive={responsive}>
      {searchItem?.slice(startIndex, endIndex).map((song) => (
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

  return (
    <>
      <div>
        <OptimizedNavBar />
      </div>
      <div className="search-card-container">
        <div className="new-release search-heading">Search Items</div>
        <div className="search-card"> {generateCarouselForSongs(0, 10)}</div>
        <div className="search-card"> {generateCarouselForSongs(10, 20)}</div>
        <div className="search-card"> {generateCarouselForSongs(20, 30)}</div>
        <div className="search-card"> {generateCarouselForSongs(30, 40)}</div>
        <div className="search-card"> {generateCarouselForSongs(40, 50)}</div>
        <div className="search-card"> {generateCarouselForSongs(50, 60)}</div>
        <div className="search-card"> {generateCarouselForSongs(60, 70)}</div>
        <div className="search-card"> {generateCarouselForSongs(70, 80)}</div>
        <div className="search-card"> {generateCarouselForSongs(80, 90)}</div>
        <div className="search-card"> {generateCarouselForSongs(90, 100)}</div>
      </div>
      <div>
        <OptimizedPlayer />
      </div>
    </>
  );
}

export default SearchItem;
