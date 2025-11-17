import React, { useEffect, useState, useContext } from "react";
import logo from "../assets/images.png";
import userIcon from "../assets/user.png";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import "react-tooltip/dist/react-tooltip.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("You Logged Out successfully"))
      .catch(() => toast.error("Error logging out!"));
    setShowLogout(false);
    setShowMenu(false);
  };

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Zoom>
      <div className="navbar bg-base-100 shadow-sm px-4 py-3 relative z-[1000]">
        <div className="navbar-start flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="hidden sm:block w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full shadow-md"
            />
            <span className="text-2xl sm:text-3xl font-bold text-green-700">
              <Typewriter
                words={["BDClean🌿"]}
                loop={0}
                cursor=""
                typeSpeed={100}
              />
            </span>
          </Link>
        </div>

        <div className="md:hidden ml-auto relative">
          <button
            className="btn btn-ghost text-3xl"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-base-100 shadow-lg rounded-lg z-[9999]">
              <ul className="flex flex-col gap-2 p-3 font-semibold text-green-700">
                <li className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={theme === "dark"}
                    onChange={(e) => handleTheme(e.target.checked)}
                  />
                  <span>Dark Mode</span>
                </li>
                <li>
                  <Link to="/" onClick={() => setShowMenu(false)}>
                    Home
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link to="/all-issues" onClick={() => setShowMenu(false)}>
                        All Issues
                      </Link>
                    </li>
                    <li>
                      <Link to="/addissue" onClick={() => setShowMenu(false)}>
                        Add Issue
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-issues" onClick={() => setShowMenu(false)}>
                        My Issues
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-contribution"
                        onClick={() => setShowMenu(false)}
                      >
                        My Contribution
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" onClick={() => setShowMenu(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="btn bg-green-700 text-white w-full"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/auth/login" onClick={() => setShowMenu(false)}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth/register"
                        onClick={() => setShowMenu(false)}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="navbar-end hidden md:flex items-center gap-6">
          <ul className="menu menu-horizontal px-1 font-semibold text-green-700 flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/all-issues">All Issues</Link>
                </li>
                <li>
                  <Link to="/addissue">Add Issue</Link>
                </li>
                <li>
                  <Link to="/my-issues">My Issues</Link>
                </li>
                <li>
                  <Link to="/my-contribution">My Contribution</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                <li>
                  <Link to="/auth/register">Register</Link>
                </li>
              </>
            )}
          </ul>

          {/* Theme Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="toggle"
              checked={theme === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
            />
          </label>

          {/* User */}
          {user && (
            <div className="relative ml-3">
              <img
                id="user-avatar"
                src={user.photoURL || userIcon}
                alt={user.displayName || user.email}
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              />
              <Tooltip
                anchorId="user-avatar"
                place="top"
                content={`${user.displayName || "No Name"} | ${user.email}`}
              />
              {showLogout && (
                <button
                  onClick={handleLogOut}
                  className="btn bg-green-700 px-4 text-white absolute right-0 mt-2 z-[9999]"
                >
                  Log Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Zoom>
  );
};

export default Header;
