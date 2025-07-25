import { useEffect, useState } from "react";
// import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

const API_URL = import.meta.env.VITE_API_URL;

const Ebooks = () => {
  const [ebooks, setEbooks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/ebooks/`)
      .then((res) => res.json())
      .then(setEbooks)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available eBooks</h2>

      {ebooks.length === 0 ? (
        <p className="text-center text-gray-500">No eBooks available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{ebook.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Uploaded:{" "}
                {ebook.created_at
                  ? new Date(ebook.created_at).toLocaleDateString()
                  : "Unknown"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {ebook.description || "No description provided."}
              </p>
              <a
                href={ebook.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ebooks;
