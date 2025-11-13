import { Link, useNavigate } from "react-router";
import notFound from "../assets/error-404.png";

const ErrorPage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <img src={notFound} alt="404 Error" className="w-64 md:w-96 mb-8" />

      <h1 className="text-5xl font-bold mb-4">Oops, page not found!</h1>
      <p className="text-xl text-gray-600 mb-6">
        This page isn’t available right now.
      </p>

      <button
        onClick={() => navigate(-1)} 
        className="bg-violet-700 hover:bg-violet-600 text-white font-bold py-2.5 px-6 rounded shadow-lg transition duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;