import { useNavigate } from "react-router-dom";
import "../Styles/UnderConstruction.css";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          flexDirection: "column",
        }}
      >
        <h1 className="header-construction">404 Error ! Page Not Found </h1>
        <div className="construction-button-container">
          {" "}
          Go To Main Page{" "}
          <button onClick={() => navigate("/")} className="construction-btn">
            Click Here
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
