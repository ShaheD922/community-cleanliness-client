import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then(() => updateUser({ displayName: name, photoURL }))
      .then(() => {
        toast.success("Account created successfully!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.code);
        toast.error("Registration failed!");
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center justify-center bg-gradient-to-br from-green-300 to-green-800 p-4 w-full min-h-screen">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate__animated animate__zoomIn">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6 animate__animated animate__fadeInDown">
            Register Your Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label font-semibold">Full Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                className="input input-bordered w-full"
                placeholder="Photo URL"
              />
            </div>

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
              <div
                className="absolute right-3 top-[60%] transform -translate-y-1/2 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaRegEye className="text-lg" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn w-full bg-green-700 text-white mt-4 hover:bg-green-800">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
