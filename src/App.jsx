import "./App.css";
import applemusic from "./Components/applemusic";
import { createContext, useState, useEffect, useRef, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Albums from "./Components/Albums";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SearchItem from "./Components/SearchItem";
import FilteredSongs from "./Components/FilteredSongs";
import UnderConstruction from "./Components/UnderConstruction";
import Error from "./Components/Error";
import { Vortex } from "react-loader-spinner";

const OptimizedAlbums = memo(Albums);
const Optimizedapplemusic = memo(applemusic);
const OptimizedSearchItem = memo(SearchItem);
const OptimizedFilteredSongs = memo(FilteredSongs);
const OptimizedLogIn = memo(Login);
const OptimizedSignUp = memo(SignUp);

export const AllSongAlbumContext = createContext();

function App() {
  const apiUrl =
    "https://academics.newtonschool.co/api/v1/music/song?limit=100";
  const albumApiUrl =
    "https://academics.newtonschool.co/api/v1/music/album?limit=100";
  const projectId = "dlzsedvtpspr";

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [albumsId, setAlbumsId] = useState("");
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [search, setSearch] = useState("");
  const [searchItem, setSearchedItems] = useState([]);
  const [isLogIn, setIsLogIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const newReleasesRef = useRef(null);
  const topChartsRef = useRef(null);
  const topPlaylistsRef = useRef(null);
  const podcastsRef = useRef(null);
  const songsRef = useRef(null);
  const albumsRef = useRef(null);

  //If user logged in then storing the boolean value in local storage
  useEffect(() => {
    const storedLogin = localStorage.getItem("login");

    if (storedLogin) {
      setIsLogIn(storedLogin);
    }
  }, []);

  //If user logged in then storing the user name in local storage
  useEffect(() => {
    const storedLogin = localStorage.getItem("username");

    if (storedLogin) {
      setUserName(storedLogin);
    }
  }, []);

  useEffect(() => {
    fetchData1();
  }, []);

  useEffect(() => {
    fetchData2();
  }, []);

  //Fetch data for Songs
  const fetchData1 = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          projectId: projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setSongs(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  //Fetch data for Albums
  const fetchData2 = async () => {
    try {
      const response = await fetch(albumApiUrl, {
        headers: {
          projectId: projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setAlbums(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  //showing Loading until getting data
  if (loading) {
    return (
      <div className="loading">
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

  return (
    <>
      <AllSongAlbumContext.Provider
        value={{
          songs,
          setSongs,
          albums,
          setAlbums,
          currentSong,
          setCurrentSong,
          isPlaying,
          setIsPlaying,
          duration,
          setDuration,
          albumsId,
          setAlbumsId,
          filteredSongs,
          setFilteredSongs,
          selectedMood,
          setSelectedMood,
          search,
          setSearch,
          searchItem,
          setSearchedItems,
          isLogIn,
          setIsLogIn,
          userName,
          setUserName,
          newReleasesRef,
          topChartsRef,
          topPlaylistsRef,
          podcastsRef,
          songsRef,
          albumsRef,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Optimizedapplemusic />} />
            <Route path="/albums" element={<OptimizedAlbums />} />
            <Route path="/filter-songs" element={<OptimizedFilteredSongs />} />
            <Route path="/log-in" element={<OptimizedLogIn />} />
            <Route path="/sign-up" element={<OptimizedSignUp />} />
            <Route path="/search" element={<OptimizedSearchItem />} />
            <Route path="/under-construction" element={<UnderConstruction />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AllSongAlbumContext.Provider>
    </>
  );
}

export default App;
