import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Contributions - BD Clean";
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:5000/mycontribution?email=${user.email}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
      .then(data => setContributions(data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch contributions");
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading)
    return <p className="text-center mt-8 text-xl">Loading contributions...</p>;

  if (!contributions.length)
    return <p className="text-center mt-8 text-xl">No contributions found!</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Contributions</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Issue Title</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Paid Amount</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Additional Info</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{c.title}</td>
                <td className="border px-4 py-2">{c.category || "N/A"}</td>
                <td className="border px-4 py-2">💰 {c.amount}</td>
                <td className="border px-4 py-2">{new Date(c.date).toLocaleString()}</td>
                <td className="border px-4 py-2">{c.additionalInfo || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContribution;
