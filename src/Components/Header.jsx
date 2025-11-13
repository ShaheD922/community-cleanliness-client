import logo from "../assets/images.png";
import userIcon from "../assets/user.png";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router"; // ✅ react-router-dom import
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
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
    <div className="navbar bg-base-100 shadow-sm px-4 py-3 relative">
      {/* Logo + BD Clean Text */}
      <div className="navbar-start flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            className="hidden sm:block w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 object-cover rounded-full shadow-md"
            alt="Logo"
          />
          <span className="text-2xl sm:text-3xl md:text-2xl font-bold text-green-700">
            BD<span>Clean🌿</span>
          </span>
        </Link>
      </div>

      {/* Hamburger menu for small devices */}
      <div className="md:hidden ml-auto relative">
        <button
          className="btn btn-ghost text-3xl"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>
        {showMenu && (
          <ul className="menu menu-vertical mt-2 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-14 z-50">
            <li>
              <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/all-issues" onClick={() => setShowMenu(false)}>All Issues</Link>
                </li>
                <li>
                  <Link to="/addissue" onClick={() => setShowMenu(false)}>Add Issue</Link>
                </li>
                <li>
                  <Link to="/my-issues" onClick={() => setShowMenu(false)}>My Issues</Link>
                </li>
                <li>
                  <Link to="/my-contribution" onClick={() => setShowMenu(false)}>My Contribution</Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setShowMenu(false)}>Profile</Link>
                </li>
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
                <li>
                  <Link to="/issues" onClick={() => setShowMenu(false)}>Issues</Link>
                </li>
                <li>
                  <Link to="/auth/login" onClick={() => setShowMenu(false)}>Login</Link>
                </li>
                <li>
                  <Link to="/auth/register" onClick={() => setShowMenu(false)}>Register</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>

      {/* Desktop + Medium Devices Menu + Avatar */}
      <div className="navbar-end hidden md:flex items-center gap-4">
        <ul className="menu menu-horizontal px-1 font-semibold text-green-700 flex flex-row gap-3 md:gap-4 lg:gap-6 text-sm md:text-sm lg:text-base">
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
              <li><Link to="/issues">Issues</Link></li>
              <li><Link to="/auth/login">Login</Link></li>
              <li><Link to="/auth/register">Register</Link></li>
            </>
          )}
        </ul>

        {/* Avatar + Logout */}
        {user && (
          <div className="relative ml-3">
            <img
              id="user-avatar"
              src={user.photoURL || userIcon}
              alt="User"
              className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            <Tooltip
              anchorId="user-avatar"
              place="top"
              content={user.displayName || user.email}
            />
            {showLogout && (
              <button
                onClick={handleLogOut}
                className="btn bg-green-700 px-4 sm:px-6 md:px-6 text-white absolute right-0 mt-2"
              >
                Log Out
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
