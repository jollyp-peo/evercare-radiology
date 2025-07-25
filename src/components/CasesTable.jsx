import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { authFetch } from "../utils/authFetch";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const CasesTable = ({ cases: casesData, setCases }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const perPage = 50;

  const filtered = useMemo(() => {
    return casesData.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, casesData]);

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleDelete = async () => {
    const item = toDelete;
    setToDelete(null);

    try {
      const res = await authFetch(
        `${API_URL}/api/cases/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success(`Deleted "${item.title}"`);
        setCases((prev) => prev.filter((c) => c.id !== item.id));
      } else {
        toast.error("Failed to delete case");
      }
    } catch (err) {
      toast.error("Error while deleting");
      console.error(err);
    }
  };

  return (
    <div>
      {/* Search & Total */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">Total Cases: {filtered.length}</p>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-200 text-gray-800 font-medium border-b">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">View</th>
              <th className="p-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No matching cases found.
                </td>
              </tr>
            ) : (
              paginated.map((c, i) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">
                    {(currentPage - 1) * perPage + i + 1}
                  </td>
                  <td className="p-2 border">{c.title}</td>
                  <td className="p-2 border">
                    <Link
                      to={`/cases/${c.id}`}
                      className="text-blue-600 underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="p-2 border text-center text-red-600">
                    <button onClick={() => setToDelete(c)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 rounded ${
              i + 1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {toDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Delete case titled "<strong>{toDelete.title}</strong>"?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesTable;
