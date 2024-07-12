import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../redux/slices/userLoginSlice";

function Header() {
  const loginStatus = useSelector((state) => state.login.loginStatus);
  const currentUser = useSelector((state) => state.login.currentUser);
  const dispatch = useDispatch();

  const userLogout = () => {
    // Clear state and remove token from storage
    dispatch(clearState());
    sessionStorage.removeItem("token");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="https://externaltrainer-backend.vercel.app/">
          <img
            src="CTSH_BIG.D.png"
            height="50px"
            width="290px"
            alt="Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="justify-content-end" id="navbarNav">
          <ul className="nav nav-tabs p-3 ml-auto text-white">
            {loginStatus && (
              <>
                {currentUser && currentUser.userType === "coach" && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link bi bi-card-checklist text-white" to="coach-login">
                        Batches
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link bi bi-person-standing text-white" to="trainers">
                        Trainers
                      </NavLink>
                    </li>
                  </>
                )}
                <li className="nav-item" onClick={userLogout}>
                  <NavLink className="nav-link bi bi-person-walking text-white" to="login">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            {!loginStatus && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link bi bi-house-door-fill text-white" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link bi bi-power text-white" to="register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link bi bi-power text-white" to="login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
