import "../Styles/SideBar.css";
import { GoHistory } from "react-icons/go";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { RiAlbumLine } from "react-icons/ri";
import { MdPodcasts } from "react-icons/md";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { AllSongAlbumContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//for going to that component which clicked from SideBar
const scrollToSection = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

function SideBar() {
  const navigate = useNavigate();

  //getting all ref from App file
  const {
    newReleasesRef,
    topChartsRef,
    topPlaylistsRef,
    podcastsRef,
    albumsRef,
  } = useContext(AllSongAlbumContext);

  //handle dead links
  const handleClick = () => {
    navigate("/under-construction");
  };

  return (
    <div className="sideBar">
      <div className="aside-heading">BROWSE</div>
      <div
        onClick={() => scrollToSection(newReleasesRef)}
        className="aside-tag"
      >
        New Releases
      </div>
      <div onClick={() => scrollToSection(topChartsRef)} className="aside-tag">
        Top Charts
      </div>
      <div
        onClick={() => scrollToSection(topPlaylistsRef)}
        className="aside-tag"
      >
        Top Playlists
      </div>
      <div onClick={() => scrollToSection(podcastsRef)} className="aside-tag">
        Podcasts
      </div>
      <div onClick={handleClick} className="aside-tag">
        Top Artists
      </div>
      <div onClick={handleClick} className="aside-tag">
        Radio
      </div>

      <div className="aside-heading library">LIBRARY</div>
      <div onClick={() => scrollToSection(albumsRef)} className="aside-tag">
        <RiAlbumLine />
        Albums
      </div>

      <div onClick={() => scrollToSection(podcastsRef)} className="aside-tag">
        <MdPodcasts />
        Podcasts
      </div>

      <div
        onClick={() => scrollToSection(topPlaylistsRef)}
        className="aside-tag"
      >
        <IoMusicalNoteOutline /> Songs
      </div>

      <div onClick={handleClick} className="aside-tag">
        <GoHistory /> History
      </div>

      <div onClick={handleClick} className="aside-tag">
        <LiaMicrophoneAltSolid />
        Artists
      </div>
    </div>
  );
}

export default SideBar;
