import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import LoadingPage from "../Components/LoadingPage";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [issue, setIssue] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issueRes = await fetch(`http://localhost:5000/models/${id}`);
        const issueData = await issueRes.json();
        setIssue(issueData);

        const contribRes = await fetch(
          `http://localhost:5000/mycontribution/${id}`
        );
        const contribData = await contribRes.json();
        setContributors(contribData);
      } catch (err) {
        console.error(err);
        setIssue({ error: "Issue not found" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleContribution = async (e) => {
    e.preventDefault();
    if (!user?.email) return alert("Login required!");

    const contribution = {
      issueId: id,
      title: issue.title,
      amount: issue.amount,
      contributorName: name,
      email: user.email,
      phone,
      address,
      date: new Date(),
      additionalInfo,
      image: user.photoURL || "",
    };

    try {
      const res = await fetch("http://localhost:5000/mycontribution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contribution),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Contribution added!");
        setModalOpen(false);
        setName("");
        setPhone("");
        setAddress("");
        setAdditionalInfo("");
        setContributors((prev) => [...prev, contribution]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add contribution");
    }
  };

  if (loading) return <LoadingPage />;
  if (!issue)
    return (
      <p className="text-center mt-8 text-xl dark:text-gray-300">
        Loading issue...
      </p>
    );
  if (issue.error)
    return (
      <p className="text-center mt-8 text-xl dark:text-gray-300">
        {issue.error}
      </p>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Issue Details */}

      <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
        {issue.title}
      </h1>
      <img
        src={issue.image || "https://via.placeholder.com/600x400"}
        alt={issue.title}
        className="w-full h-64 object-cover rounded mb-4 shadow dark:shadow-gray-900"
      />
      <div className="mb-1 dark:text-gray-300">
        <strong>Category:</strong> {issue.category}
      </div>
      <div className="mb-1 dark:text-gray-300">
        <strong>Location:</strong> {issue.location}
      </div>
      <div className="mb-1 dark:text-gray-300">
        <strong>Description:</strong> {issue.description}
      </div>
      <div className="mb-1 dark:text-gray-300">
        <strong>Budget:</strong> {issue.amount}
      </div>
      <div className="mb-4 dark:text-gray-300">
        <strong>Date:</strong> {new Date(issue.date).toLocaleString()}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Pay Clean-Up Contribution
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-md shadow-lg">
            <form onSubmit={handleContribution} className="flex flex-col gap-2">
              <input
                type="text"
                value={issue.title}
                readOnly
                className="border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="text"
                value={issue.amount}
                readOnly
                className="border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="border p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              />
              <textarea
                placeholder="Additional Info"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-100"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="mt-2 text-gray-700 dark:text-gray-300 underline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {contributors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Contributors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributors.map((c, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md dark:shadow-gray-900 hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-4"
              >
                <img
                  src={c.image || "https://via.placeholder.com/50"}
                  alt={c.contributorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold dark:text-gray-100">
                    {" "}
                    Name : {c.contributorName || "Anonymous"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300">
                    Amount : {c.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
