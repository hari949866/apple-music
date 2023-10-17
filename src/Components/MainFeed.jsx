import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { AllSongAlbumContext } from "../App";
import "../Styles/MainFeed.css";
import { useNavigate } from "react-router-dom";

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

function MainFeed() {
  const navigate = useNavigate();
  //getting all state, function and ref from App file
  const {
    songs,
    albums,
    setCurrentSong,
    setAlbumsId,
    newReleasesRef,
    topChartsRef,
    topPlaylistsRef,
    podcastsRef,
    albumsRef,
    setIsPlaying,
  } = useContext(AllSongAlbumContext);

  //when clicked on any album card then going to /albums route and showing all song and data
  const handleAlbumID = (id) => {
    navigate("/albums");
  };

  //creating this generateCarouselForSongs for showing card by choice like 10 to 20 card from Songs array
  const generateCarouselForSongs = (startIndex, endIndex) => (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      slidesToSlide={1}
    >
      {songs?.slice(startIndex, endIndex).map((song) => (
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

  //creating this generateCarouselForAlbums for showing card by choice like 10 to 20 card from albums array
  const generateCarouselForAlbums = (startIndex, endIndex) => {
    return (
      <Carousel responsive={responsive}>
        {albums?.slice(startIndex, endIndex).map((album) => (
          <Card
            onClick={() => {
              handleAlbumID(album?._id),
                setAlbumsId(album?._id),
                localStorage.setItem("albumId", album._id);
            }}
            key={album?._id}
            title={album?.title}
            artist={
              (album?.artists[0]?.name ? album?.artists[0]?.name : "") +
              (album?.artists[1]?.name ? ", " + album?.artists[1]?.name : "")
            }
            thumbnail={album?.image}
          />
        ))}
      </Carousel>
    );
  };

  return (
    <div className="main-feed">
      <div className="trending ">Trending Now</div>
      {generateCarouselForSongs(0, 15)}
      {generateCarouselForSongs(15, 30)}

      <div ref={topChartsRef} className="new-release">
        Top Charts
      </div>
      {generateCarouselForAlbums(0, 5)}
      {generateCarouselForAlbums(5, 9)}

      <div ref={newReleasesRef} className="new-release">
        New Releases
      </div>
      {generateCarouselForSongs(30, 45)}
      {generateCarouselForSongs(45, 60)}

      <div ref={albumsRef} className="new-release">
        Albums
      </div>
      {generateCarouselForAlbums(9, 24)}
      {generateCarouselForAlbums(24, 39)}
      {generateCarouselForAlbums(39, 54)}
      {generateCarouselForAlbums(54, 69)}

      <div ref={podcastsRef} className="new-release">
        Trending Podcasts
      </div>
      {generateCarouselForSongs(60, 75)}
      {generateCarouselForSongs(75, 90)}
      {generateCarouselForSongs(90, 100)}

      <div ref={topPlaylistsRef} className="new-release">
        Top Playlists | Music | Songs{" "}
      </div>
      {generateCarouselForAlbums(69, 84)}
      {generateCarouselForAlbums(84, 100)}
    </div>
  );
}

export default MainFeed;
