import "../Styles/Login.css";
import React, { useContext, useState } from "react";
import { AllSongAlbumContext } from "../App";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  //getting state and function from App file
  const { setIsLogIn, setUserName } = useContext(AllSongAlbumContext);

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  //this will call when put any word on input
  const getdata = (e) => {
    const { value, name } = e.target;

    setUserInput(() => {
      return {
        ...userInput,
        [name]: value,
      };
    });
  };

  //when clicked on Log In it will call
  const addData = async (e) => {
    e.preventDefault();

    const { email, password } = userInput;
    if (email === "") {
      toast.error("Email field is required", {
        position: "top-center",
      });
    } else if (!email.includes("@" && ".")) {
      toast.error("Please enter valid email address", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password field is required", {
        position: "top-center",
      });
    } else if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
    ) {
      toast.error(
        "Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special symbol",
        {
          position: "top-center",
        }
      );
    } else {
      try {
        const apiUrl = "https://academics.newtonschool.co/api/v1/user/login";
        const appType = "music";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "dlzsedvtpspr",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            appType: appType,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          console.log(JSON.stringify(data.token));
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            toast.success("Successfully Logged In");
          }, 1000);
          localStorage.setItem("username", data.data.name);
          localStorage.setItem("email", data.data.email);
          setIsLogIn(true);
          localStorage.setItem("login", true);
          setUserName(data.data.name);
          navigate("/");
        } else {
          toast.error("Login Failed: Invalid Username or Password");
          console.log(error);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  //if click on logo then going to main page
  const handleLogoClick = () => {
    navigate("/");
  };

  //for showing password
  const haldleShow = () => {
    setShow(!show);
  };

  return (
    <div className="login-conatiner">
      <div className="login-left">
        <img
          onClick={handleLogoClick}
          className="login-logo"
          src="./download.png"
          alt=""
        />
        <img className="login-img" src="./Badshah.png" alt="" />
        <h2>All Your Music.</h2>
        <h3>Anytime, anywhere.</h3>
      </div>
      <div className="login-right">
        <section className=" login-right-container">
          <div className="form-container">
            <h1 className="log-in-heading">Welcome to Applemusic.</h1>
            <div className="form-container">
              <input
                className="input-login"
                type="email"
                name="email"
                onChange={getdata}
                placeholder="Enter email"
              />

              <input
                className="input-login"
                type={show ? "text" : "password"}
                name="password"
                onChange={getdata}
                placeholder="Set Password"
              />
              <label className="show-password-log-in" onClick={haldleShow}>
                {show ? "Hide" : "Show"}
              </label>

              <button className="button-signIn" onClick={addData} type="submit">
                Log In
              </button>
            </div>
            <p className="go-to">
              Go to{" "}
              <span>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </span>{" "}
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
