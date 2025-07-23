import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CaseViewer = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/cases/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setCaseData(data);
        setIndex(0); // Reset index when new case loads
      })
      .catch(console.error);
  }, [id]);

  const next = () =>
    setIndex((i) => Math.min(i + 1, (caseData?.images?.length || 1) - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const handleScroll = (e) => {
    if (e.deltaY > 0) next();
    else prev();
  };

  if (!caseData) {
    return <p className="p-4 text-gray-500">Loading case...</p>;
  }

  const images = caseData.images || [];
  const image = images[index];

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Link to="/cases" className="text-blue-600 underline text-sm">
        ← Back to Cases
      </Link>

      <h2 className="text-2xl font-bold text-center my-4">
        {caseData.title} {caseData.category ? `(${caseData.category})` : ""}
      </h2>

      <div className="max-w-4xl mx-auto bg-white shadow rounded p-4">
        {image ? (
          <div
            onWheel={handleScroll}
            className="max-h-[80vh] overflow-hidden flex justify-center"
          >
            <img
              src={image.image_url}
              alt={`Slice ${index + 1}`}
              className="max-h-[80vh] object-contain border rounded"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No images available.</p>
        )}

        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              disabled={index === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>
            <span className="text-gray-700">
              Slice {index + 1} of {images.length}
            </span>
            <button
              onClick={next}
              disabled={index === images.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        )}

        {caseData.description && (
          <div className="bg-blue-700 p-4 mt-5 rounded">
            <p className="text-white font-semibold whitespace-pre-line">
              {caseData.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseViewer;
