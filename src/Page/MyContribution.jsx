import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../Components/LoadingPage"; 
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Contributions - BD Clean";
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const fetchContributions = async () => {
      try {
        setLoading(true);
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();

        const res = await fetch(
          `https://server-one-dusky-97.vercel.app/mycontribution?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch contributions");

        const data = await res.json();
        const safeData = data.map((c) => ({
          ...c,
          name: c.contributorName || c.name || "Anonymous",
          image: c.image || user.photoURL || "https://via.placeholder.com/100",
        }));
        setContributions(safeData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch contributions");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [user]);

  const downloadReport = () => {
    if (!contributions.length) {
      toast.info("No contributions to download!");
      return;
    }

    const doc = new jsPDF();
    const columns = ["Contributor Name", "Amount", "Date", "Additional Info"];
    const rows = contributions.map((c) => [
      c.name,
      c.amount,
      new Date(c.date).toLocaleString(),
      c.additionalInfo || "-",
    ]);

    doc.autoTable({ head: [columns], body: rows });
    doc.text("My Contributions Report", 14, 15);
    doc.save(`my_contributions_${user.email}.pdf`);
    toast.success("PDF report downloaded successfully!");
  };

  if (loading) return <LoadingPage />;

  if (!contributions.length)
    return (
      <p className="text-center mt-8 text-xl dark:text-gray-300">
        No contributions found!
      </p>
    );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-green-600">
        My Contributions
      </h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={downloadReport}
          className="bg-green-500 dark:bg-green-600 text-white px-5 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition"
        >
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributions.map((c) => (
          <motion.div
            key={c._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-5 transform transition hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={c.image || "https://via.placeholder.com/100"}
              alt={c.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />

            <p className="font-bold text-xl mb-1 text-gray-800 dark:text-gray-100">
              Name: {c.name}
            </p>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Amount: {c.amount} $
            </p>
            <p className="font-bold text-gray-700 dark:text-gray-300">
              Date: {new Date(c.date).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {c.additionalInfo || "-"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyContribution;
