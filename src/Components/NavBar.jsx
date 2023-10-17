import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/NavBar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";
import Avatar from "@mui/material/Avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//from MUI
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

//from MUI
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      // bgcolor: "#EF6262",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

//for going to that component which clicked from navBar
const scrollToSection = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

function NavBar() {
  //Getting all satate and function and ref from App file
  const {
    songs,
    selectedMood,
    setSelectedMood,
    search,
    setSearch,
    setSearchedItems,
    isLogIn,
    setIsLogIn,
    userName,
    topPlaylistsRef,
    podcastsRef,
  } = useContext(AllSongAlbumContext);

  const [logToggle, setLogToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginUser, setLoginUser] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  //checking if user name present in local storage then storing in loginUser
  useEffect(() => {
    const storedLogin = localStorage.getItem("username");
    if (storedLogin) {
      setLoginUser(storedLogin);
    }
  }, []);

  //for Searching
  useEffect(() => {
    //for focusing on Search box
    searchInputRef.current.focus();

    if (!search) {
      return;
    }

    //if any word enter on search box then store that word on state and going to /search route
    const filteredItems = songs.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedItems(filteredItems);
    navigate("/search");
  }, [search]);

  //if select any mood the store that mood on state and going to /filter-songs route
  const handleMoodChange = (event) => {
    const newMood = event.target.value;
    if (newMood !== "noValue") {
      setSelectedMood(newMood);
      localStorage.setItem("mood", newMood);
      navigate("/filter-songs");
    }
    setSelectedMood(newMood);
  };

  //if click on logo then going to main page
  const handleNavLogo = () => {
    navigate("/");
  };

  //if clicked on Log In the going to /log-in route
  const handleLogIn = () => {
    navigate("/log-in");
  };

  //if clicked on Sign Up the going to /sign-up route
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  //if clicked on Log Out then delete all data from local storage and going to main page
  const handleLogOut = () => {
    localStorage.clear();
    setIsLogIn(false);
    setLogToggle(!logToggle);
    navigate("/");
    setMenuOpen(false);
    toast.success("You are logged Out", {
      position: "top-center",
    });
  };

  //for handle any dead links
  const handleClick = () => {
    navigate("/under-construction");
  };

  // navBar for mobile or tab
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  //showing search box for mobile
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      {" "}
      <div className="NavBar">
        <div className="leftNav">
          <div className="Saavan-logo" onClick={handleNavLogo}>
          <a aria-label="Apple&nbsp;Music" role="img" href="https://music.apple.com/us/listen-now" class="svelte-45px4b"><svg height="20" viewBox="0 0 83 20" width="83" xmlns="http://www.w3.org/2000/svg" class="logo" aria-hidden="true"><path d="M34.752 19.746V6.243h-.088l-5.433 13.503h-2.074L21.711 6.243h-.087v13.503h-2.548V1.399h3.235l5.833 14.621h.1l5.82-14.62h3.248v18.347h-2.56zm16.649 0h-2.586v-2.263h-.062c-.725 1.602-2.061 2.504-4.072 2.504-2.86 0-4.61-1.894-4.61-4.958V6.37h2.698v8.125c0 2.034.95 3.127 2.81 3.127 1.95 0 3.124-1.373 3.124-3.458V6.37H51.4v13.376zm7.394-13.618c3.06 0 5.046 1.73 5.134 4.196h-2.536c-.15-1.296-1.087-2.11-2.598-2.11-1.462 0-2.436.724-2.436 1.793 0 .839.6 1.41 2.023 1.741l2.136.496c2.686.636 3.71 1.704 3.71 3.636 0 2.442-2.236 4.12-5.333 4.12-3.285 0-5.26-1.64-5.509-4.183h2.673c.25 1.398 1.187 2.085 2.836 2.085 1.623 0 2.623-.687 2.623-1.78 0-.865-.487-1.373-1.924-1.704l-2.136-.508c-2.498-.585-3.735-1.806-3.735-3.75 0-2.391 2.049-4.032 5.072-4.032zM66.1 2.836c0-.878.7-1.577 1.561-1.577.862 0 1.55.7 1.55 1.577 0 .864-.688 1.576-1.55 1.576a1.573 1.573 0 0 1-1.56-1.576zm.212 3.534h2.698v13.376h-2.698zm14.089 4.603c-.275-1.424-1.324-2.556-3.085-2.556-2.086 0-3.46 1.767-3.46 4.64 0 2.938 1.386 4.642 3.485 4.642 1.66 0 2.748-.928 3.06-2.48H83C82.713 18.067 80.477 20 77.317 20c-3.76 0-6.208-2.62-6.208-6.942 0-4.247 2.448-6.93 6.183-6.93 3.385 0 5.446 2.213 5.683 4.845h-2.573zM10.824 3.189c-.698.834-1.805 1.496-2.913 1.398-.145-1.128.41-2.33 1.036-3.065C9.644.662 10.848.05 11.835 0c.121 1.178-.336 2.33-1.01 3.19zm.999 1.619c.624.049 2.425.244 3.578 1.98-.096.074-2.137 1.272-2.113 3.79.024 3.01 2.593 4.012 2.617 4.037-.024.074-.407 1.419-1.344 2.812-.817 1.224-1.657 2.422-3.002 2.447-1.297.024-1.73-.783-3.218-.783-1.489 0-1.97.758-3.194.807-1.297.048-2.28-1.297-3.097-2.52C.368 14.908-.904 10.408.825 7.375c.84-1.516 2.377-2.47 4.034-2.495 1.273-.023 2.45.857 3.218.857.769 0 2.137-1.027 3.746-.93z"></path></svg></a>
            
          </div>

          <div
            onClick={() => scrollToSection(topPlaylistsRef)}
            className="music hov no-tab"
          >
            Music
          </div>

          <div
            onClick={() => scrollToSection(podcastsRef)}
            className="podcasts hov no-tab"
          >
            Podcasts
          </div>

          <div onClick={handleClick} className="goPro hov no-tab">
            Go Pro
          </div>
        </div>
        <div className="show-mobile">
          <div onClick={handleShowSearch} className="search-icon show-mobile">
            {" "}
            <GoSearch />
          </div>

          <div
            className={`${
              showSearch ? " show-mobile search-for-mobile" : "mobile"
            }`}
          >
            <input
              type="text"
              id="searchInput"
              value={search}
              ref={searchInputRef}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>

        <div className="searchBox mobile">
          <div className="search-icon">
            {" "}
            <GoSearch />
          </div>

          <input
            type="text"
            id="searchInput"
            value={search}
            ref={searchInputRef}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>

        <div className="avatar tab">
          {isLogIn ? (
            <Avatar {...(userName ? stringAvatar(userName) : {})} />
          ) : (
            <div className="nav-log-in">
              <div onClick={handleLogIn} className=" hov">
                Log In
              </div>
              <div onClick={handleSignUp} className="signOut hov">
                Sign Up
              </div>
            </div>
          )}
        </div>

        <div onClick={handleMenuOpen} className="hamburger tab">
          <GiHamburgerMenu />
        </div>

        <div className="rightNav no-tab">
          <div className="language">
            <select
              value={selectedMood}
              onChange={handleMoodChange}
              className="select-nav"
            >
              <option value="noValue" className="languages">
                Select Mood
              </option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="romantic">Romantic</option>
            </select>
          </div>

          <div className="avatar-container no-tab">
            {isLogIn ? ( // Checking if the user is logged in
              <div className="nav-avatar logIn">
                <div className="avatar">
                  <Avatar {...(userName ? stringAvatar(userName) : {})} />
                </div>
                <div onClick={handleLogOut} className="log-out hov">
                  Log Out
                </div>
              </div>
            ) : (
              <div className="nav-log-in">
                <div onClick={handleLogIn} className=" hov">
                  Log In
                </div>
                <div onClick={handleSignUp} className="signOut hov">
                  Sign Up
                </div>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
      {/* This is for tab and mobile  */}
      <div className="tab">
        <div className={`${menuOpen ? " menu-open-container" : "no-tab"}`}>
          <div
            onClick={() => scrollToSection(topPlaylistsRef)}
            className=" hov "
          >
            Music
          </div>

          <div onClick={() => scrollToSection(podcastsRef)} className=" hov ">
            Podcasts
          </div>

          <div onClick={handleClick} className=" hov ">
            Go Pro
          </div>

          <div className="select-tab">
            <select
              value={selectedMood}
              onChange={handleMoodChange}
              className="select-nav"
            >
              <option value="noValue" className="languages">
                Select Mood
              </option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="romantic">Romantic</option>
            </select>
          </div>
          {isLogIn ? (
            <div onClick={handleLogOut} className=" hov">
              Log Out
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default NavBar;
