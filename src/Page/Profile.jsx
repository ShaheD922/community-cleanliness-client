import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10 text-red-500">You are not logged in!</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ displayName: name, photoURL });
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <img
        src={user.photoURL || "https://i.ibb.co/2qX9Q0L/user.png"}
        alt="User"
        className="w-24 h-24 rounded-full border-2 border-green-600 shadow-md"
      />
      <h2 className="text-2xl font-semibold text-green-700 mt-4">
        {user.displayName || "Anonymous User"}
      </h2>
      <p className="text-gray-600 mt-2">{user.email}</p>

      {!editing && (
        <button
          onClick={() => setEditing(true)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Profile
        </button>
      )}

      {editing && (
        <form onSubmit={handleUpdate} className="flex flex-col items-center mt-4 space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded w-64"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="border px-2 py-1 rounded w-64"
            required
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;