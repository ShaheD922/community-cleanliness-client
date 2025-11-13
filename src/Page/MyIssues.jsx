// MyIssues.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import "animate.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IssueCard from "../components/IssueCard";
import Modal from "../components/Modal";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalType, setModalType] = useState(""); // "update" or "delete"
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    status: "ongoing",
  });

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalType ? "hidden" : "auto";
  }, [modalType]);

  // Fetch user issues
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/myissues?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error(err));
  }, [user]);

  const openUpdateModal = (issue) => {
    setSelectedIssue(issue);
    setFormData({
      title: issue.title || "",
      description: issue.description || "",
      amount: issue.amount || "",
      status: issue.status || "ongoing",
    });
    setModalType("update");
  };

  const openDeleteModal = (issue) => {
    setSelectedIssue(issue);
    setModalType("delete");
  };

  const closeModal = () => setModalType("");

  const handleUpdateSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/models/${selectedIssue._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIssues((prev) =>
          prev.map((i) => (i._id === selectedIssue._id ? { ...i, ...formData } : i))
        );
        toast.success("Issue updated successfully!");
        closeModal();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update issue");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`http://localhost:5000/models/${selectedIssue._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIssues((prev) => prev.filter((i) => i._id !== selectedIssue._id));
        toast.success("Issue deleted successfully!");
        closeModal();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete issue");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Issues</h2>
      {issues.length === 0 ? (
        <p className="text-gray-500">No issues found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onUpdate={() => openUpdateModal(issue)}
              onDelete={() => openDeleteModal(issue)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalType && (
        <Modal
          type={modalType}
          issue={selectedIssue}
          formData={formData}
          setFormData={setFormData}
          onClose={closeModal}
          onUpdate={handleUpdateSubmit}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default MyIssues;
