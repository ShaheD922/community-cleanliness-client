import React from "react";
import logo from "../assets/images.png";
import userIcon from "../assets/user.png";
import { useContext, useState } from "react";
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

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("You Logged Out successfully"))
      .catch(() => toast.error("Error logging out!"));
    setShowLogout(false);
    setShowMenu(false);
  };

  return (
    <Zoom>
      <div className="navbar bg-base-100 shadow-sm px-4 py-3 relative">
        
        
        <div className="navbar-start flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              className="hidden sm:block w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 object-cover rounded-full shadow-md"
              alt="Logo"
            />
            <span className="text-2xl sm:text-3xl md:text-2xl font-bold text-green-700">
              <Typewriter
                words={["BDClean🌿"]}
                loop={0}          
                cursor
                cursorStyle=""
                typeSpeed={100}
              />
            </span>
          </Link>
        </div>

        {/* Menu */}
        <div className="md:hidden ml-auto relative">
          <button
            className="btn btn-ghost text-3xl"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
          {showMenu && (
            <ul className="menu menu-vertical mt-2 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-14 z-50">
              <li><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>
              {user ? (
                <>
                  <li><Link to="/all-issues" onClick={() => setShowMenu(false)}>All Issues</Link></li>
                  <li><Link to="/addissue" onClick={() => setShowMenu(false)}>Add Issue</Link></li>
                  <li><Link to="/my-issues" onClick={() => setShowMenu(false)}>My Issues</Link></li>
                  <li><Link to="/my-contribution" onClick={() => setShowMenu(false)}>My Contribution</Link></li>
                  <li><Link to="/profile" onClick={() => setShowMenu(false)}>Profile</Link></li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn bg-green-700 text-white w-full mt-2"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/auth/login" onClick={() => setShowMenu(false)}>Login</Link></li>
                  <li><Link to="/auth/register" onClick={() => setShowMenu(false)}>Register</Link></li>
                </>
              )}
            </ul>
          )}
        </div>

     
        <div className="navbar-end hidden md:flex items-center gap-4">
          <ul className="menu menu-horizontal px-1 font-semibold text-green-700 flex flex-row gap-4 text-base">
            <li><Link to="/">Home</Link></li>
            {user ? (
              <>
                <li><Link to="/all-issues">All Issues</Link></li>
                <li><Link to="/addissue">Add Issue</Link></li>
                <li><Link to="/my-issues">My Issues</Link></li>
                <li><Link to="/my-contribution">My Contribution</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/auth/login">Login</Link></li>
                <li><Link to="/auth/register">Register</Link></li>
              </>
            )}
          </ul>

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
                  className="btn bg-green-700 px-4 text-white absolute right-0 mt-2"
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
