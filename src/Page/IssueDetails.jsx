import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [issue, setIssue] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contributors, setContributors] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/models/${id}`)
      .then(res => res.json())
      .then(data => setIssue(data))
      .catch(err => setIssue({ error: "Issue not found" }));

    fetch(`http://localhost:5000/mycontribution/${id}`)
      .then(res => res.json())
      .then(data => setContributors(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!issue) return <p className="text-center mt-8 text-xl">Loading issue...</p>;
  if (issue.error) return <p className="text-center mt-8 text-xl">{issue.error}</p>;

  const handleContribution = (e) => {
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
    };

    fetch("http://localhost:5000/mycontribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contribution),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success("Contribution added!");
          setModalOpen(false);
          setName(""); setPhone(""); setAddress(""); setAdditionalInfo("");
          setContributors(prev => [...prev, contribution]);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
      <img src={issue.image || "https://via.placeholder.com/600x400"} alt={issue.title} className="w-full h-64 object-cover rounded mb-4"/>
      <div className="mb-1">Category: {issue.category}</div>
      <div className="mb-1">Location: {issue.location}</div>
      <div className="mb-1">Description: {issue.description}</div>
      <div className="mb-1">Budget: {issue.amount}</div>
      <div className="mb-4">Date: {new Date(issue.date).toLocaleString()}</div>

      <button onClick={() => setModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Pay Clean-Up Contribution
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <form onSubmit={handleContribution} className="flex flex-col gap-2">
              <input type="text" value={issue.title} readOnly className="border p-2 rounded bg-gray-100"/>
              <input type="text" value={issue.amount} readOnly className="border p-2 rounded bg-gray-100"/>
              <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} required className="border p-2 rounded"/>
              <input type="email" value={user.email} readOnly className="border p-2 rounded bg-gray-100"/>
              <input type="text" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required className="border p-2 rounded"/>
              <input type="text" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} required className="border p-2 rounded"/>
              <textarea placeholder="Additional Info" value={additionalInfo} onChange={e=>setAdditionalInfo(e.target.value)} className="border p-2 rounded"/>
              <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Submit</button>
              <button type="button" onClick={()=>setModalOpen(false)} className="mt-2 text-gray-700 underline">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {contributors.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Contributors</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((c, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{c.contributorName}</td>
                  <td className="border px-2 py-1">{c.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
