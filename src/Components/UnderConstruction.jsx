import "../Styles/UnderConstruction.css";
import { useNavigate } from "react-router-dom";

function UnderConstruction() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="constuction-page">
        <img src="./gif.gif" alt="gif" />
        <h1 className="header-construction">Page Is Under Construction</h1>
        <div className="construction-button-container">
          {" "}
          Go To Main Page{" "}
          <button onClick={handleClick} className="construction-btn">
            Click Here
          </button>
        </div>
      </div>
    </>
  );
}

export default UnderConstruction;
