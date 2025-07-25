
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Atlas = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [modality, setModality] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/atlas/`)
      .then((res) => res.json())
      .then(setSeriesList)
      .catch(console.error);
  }, []);

  useEffect(() => {
    let filtered = seriesList;
    if (modality !== "All") {
      filtered = filtered.filter((s) => s.modality === modality);
    }
    setFilteredImages(filtered);
  }, [modality, seriesList]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Anatomy Atlas Viewer</h2>

      <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
        {["All", "CT", "MRI", "X-ray"].map((m) => (
          <button
            key={m}
            className={`px-4 py-2 rounded-full ${
              modality === m ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setModality(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredImages.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No images found.</p>
        ) : (
          filteredImages.map((series) => (
            <div
              key={series.id}
              onClick={() => navigate(`/atlas/series/${series.id}`)}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              {series?.legend_image_url && (
                <img
                  src={series.legend_image_url}
                  alt={series.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-3">
                <h4 className="text-md font-semibold">{series.name}</h4>
                <p className="text-sm text-gray-500">{series.modality}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Atlas;
