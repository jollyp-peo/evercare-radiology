import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

const API_URL = import.meta.env.VITE_API_URL;

const CaseUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !files.length) {
      setToast({ type: "error", message: "Fill all required fields." });
      return;
    }

    setLoading(true);
    setToast({ type: "info", message: "Uploading..." });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    files.forEach((f) => formData.append("files", f));

    try {
      const res = await authFetch(`${API_URL}/api/cases/upload/`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ type: "success", message: "✅ Case uploaded!" });
        setTimeout(() => {
          setLoading(false);
          navigate("/cases");
        }, 1500);
      } else {
        setToast({ type: "error", message: `❌ ${data.detail || "Upload failed"}` });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "❌ Network error" });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-6 rounded space-y-6">
      <h2 className="text-2xl font-bold text-center">Upload Clinical Case</h2>

      {toast && (
        <div
          className={`text-center p-2 rounded ${
            toast.type === "success"
              ? "bg-green-100 text-green-700"
              : toast.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Case Title *"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          rows={4}
          placeholder="Case Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Head">Head</option>
          <option value="Chest">Chest</option>
          <option value="Abdomen">Abdomen</option>
          <option value="Spine">Spine</option>
        </select>

        <input
          type="file"
          accept=".dcm,image/*"
          multiple
          webkitdirectory=""
          directory=""
          onChange={(e) => setFiles([...e.target.files])}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Case"}
        </button>
      </form>
    </div>
  );
};

export default CaseUpload;
