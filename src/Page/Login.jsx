import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaGoogle, FaRegEye } from "react-icons/fa";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.code);
        toast.error("Login failed!");
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success(`Logged in as ${result.user.displayName}`);
        navigate(from, { replace: true });
      })
      .catch(() => toast.error("Google login failed!"));
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-center bg-gradient-to-br from-green-300 to-green-800 p-4 w-full min-h-screen">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate__animated animate__zoomIn">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6 animate__animated animate__fadeInDown">
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label font-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="label font-semibold">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
                required
              />
              <span
                className="absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer text-gray-600 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaRegEye className="text-lg" />
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn w-full bg-green-700 text-white mt-4 hover:bg-green-800">
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn w-full mt-4 border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-green-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
