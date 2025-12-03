import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import "animate.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

import IssueCard from "../Components/IssueCard";
import Modal from "../Components/Modal";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    status: "ongoing",
  });

  useEffect(() => {
    document.body.style.overflow = modalType ? "hidden" : "auto";
  }, [modalType]);

  const fetchIssues = async () => {
    if (!user?.email) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://server-one-dusky-97.vercel.app/myissues?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setIssues(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch issues");
    }
  };

  useEffect(() => {
    fetchIssues();
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
      const token = await user.getIdToken();
      const res = await fetch(
        `https://server-one-dusky-97.vercel.app/models/${selectedIssue._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Update failed");
      await res.json();
      setIssues((prev) =>
        prev.map((i) =>
          i._id === selectedIssue._id ? { ...i, ...formData } : i
        )
      );
      toast.success("Issue updated successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update issue");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `https://server-one-dusky-97.vercel.app/models/${selectedIssue._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Delete failed");
      await res.json();
      setIssues((prev) => prev.filter((i) => i._id !== selectedIssue._id));
      toast.success("Issue deleted successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete issue");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <ToastContainer position="top-right" autoClose={3000} />

      <Zoom>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
          <Typewriter
            words={["My Issues"]}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={100}
          />
        </h2>
      </Zoom>

      {issues.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No issues found.
        </p>
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
