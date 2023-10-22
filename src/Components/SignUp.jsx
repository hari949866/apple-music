import "../Styles/Login.css";
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const userInputRef = useRef({
    name: "",
    email: "",
    password: "",
  });

  //this will call when put any word on input
  const getdata = (e) => {
    const { value, name } = e.target;
    userInputRef.current[name] = value;
  };

  //when clicked on Sign Up it will call
  const addData = async (e) => {
    e.preventDefault();

    const { name, email, password } = userInputRef.current;

    if (name === "") {
      toast.error("Name field is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("Email field is required", {
        position: "top-center",
      });
    } else if (!email.includes("@" && ".")) {
      toast.error("Please enter a valid email address", {
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
        const apiUrl = "https://academics.newtonschool.co/api/v1/user/signup";
        const appType = "music";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectId: "dlzsedvtpspr",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            appType: appType,
          }),
        });

        if (response.ok) {
          setTimeout(() => {
            toast.success("Signup successful!");
          }, 1000);
          navigate("/log-in");
          console.log("Response", response);
        } else {
          toast.error("User Already Exists");
        }
      } catch (error) {
        toast.error("Internal server problem. Please try again later.");
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
        <img className="login-img" src="./KishoreKumar.png" alt="" />
        <h2>All Your Music.</h2>
        <h3>Anytime, anywhere.</h3>
      </div>
      <div className="login-right">
        <section className=" login-right-container">
          <div className="form-container">
            <h1 className="log-in-heading">Welcome to Apple music.</h1>
            <div className="form-container">
              <input
                className="input-login"
                type="text"
                name="name"
                onChange={getdata}
                placeholder="Enter Your Full Name"
              />

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
              <label className="show-password" onClick={haldleShow}>
                {show ? "Hide" : "Show"}
              </label>

              <button className="button-signIn" onClick={addData} type="submit">
                Continue
              </button>
            </div>
            <p className="go-to">
              Already Have an Account{" "}
              <span>
                <NavLink to="/log-in">Sign In</NavLink>
              </span>{" "}
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;
