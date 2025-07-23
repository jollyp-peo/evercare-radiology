import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

const API_URL = import.meta.env.VITE_API_URL;

const CourseUpload = () => {
	const [type, setType] = useState("Video");
	const [title, setTitle] = useState("");
	const [video, setVideo] = useState(null);
	const [presentation, setPresentation] = useState(null);
	const [recordedLink, setRecordedLink] = useState("");
	const [loading, setLoading] = useState(false);
	const [toast, setToast] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title) {
			setToast({ type: "error", message: "Title is required." });
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("type", type);

		if (type === "Video") {
			if (!video) {
				setToast({ type: "error", message: "Video file is required." });
				return;
			}
			formData.append("video", video);
		} else if (type === "Lecture") {
			if (!recordedLink) {
				setToast({ type: "error", message: "Recorded link is required." });
				return;
			}
			formData.append("recorded_link", recordedLink);
		} else if (type === "Presentation") {
			if (!presentation) {
				setToast({ type: "error", message: "Presentation file is required." });
				return;
			}
			formData.append("material", presentation);
		}

		try {
			setLoading(true);
			setToast({ type: "info", message: "Uploading..." });

			const res = await authFetch(`${API_URL}/api/courses/upload/`, {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			if (res.ok) {
				setToast({ type: "success", message: "✅ Course uploaded!" });
				setTimeout(() => {
					setLoading(false);
					navigate(`/courses?type=${type}`);
				}, 1500);
			} else {
				setToast({
					type: "error",
					message: `❌ ${data.detail || "Upload failed"}`,
				});
				setLoading(false);
			}
		} catch (err) {
			console.error(err);
			setToast({ type: "error", message: "❌ Upload error" });
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white shadow mt-6 rounded space-y-6">
			<h2 className="text-2xl font-bold text-center">Upload Course Material</h2>

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
				{/* Course Type */}
				<div>
					<label className="block mb-1 font-medium">Type *</label>
					<select
						value={type}
						onChange={(e) => {
							setType(e.target.value);
							setVideo(null);
							setPresentation(null);
							setRecordedLink("");
						}}
						className="w-full p-2 border rounded"
					>
						<option value="Video">Video</option>
						<option value="Lecture">Lecture</option>
						<option value="Presentation">Presentation</option>
					</select>
				</div>

				{/* Title */}
				<input
					type="text"
					placeholder="Course Title *"
					className="w-full p-2 border rounded"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				{/* Inputs Based on Type */}
				{type === "Video" && (
					<div>
						<label className="block text-sm font-medium mb-1">
							Video File *
						</label>
						<p className="text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded mb-2">
							⚠️ Max upload size is <strong>50MB</strong>. For larger files,
							please use the "Lecture" type with a recorded video link.
						</p>
						<label
							htmlFor="video"
							className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
						>
							Choose Video
						</label>
						<input
							id="video"
							type="file"
							accept="video/*"
							onChange={(e) => setVideo(e.target.files[0])}
							className="hidden"
							required
						/>
						{video && (
							<p className="mt-2 text-sm text-gray-600">
								Selected: {video.name}
							</p>
						)}
					</div>
				)}

				{type === "Lecture" && (
					<input
						type="url"
						placeholder="Recorded Video Link *"
						className="w-full p-2 border rounded"
						value={recordedLink}
						onChange={(e) => setRecordedLink(e.target.value)}
					/>
				)}

				{type === "Presentation" && (
					<div>
						<label className="block text-sm font-medium mb-1">
							Upload .ppt or .pptx *
						</label>
						<label
							htmlFor="presentation"
							className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
						>
							Choose File
						</label>
						<input
							id="presentation"
							type="file"
							accept=".ppt,.pptx"
							onChange={(e) => setPresentation(e.target.files[0])}
							required
							className="hidden"
						/>
						{presentation && (
							<p className="mt-2 text-sm text-gray-600">
								Selected: {presentation.name}
							</p>
						)}
					</div>
				)}

				{/* Submit */}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50"
				>
					{loading ? "Uploading..." : "Upload Course"}
				</button>
			</form>
		</div>
	);
};

export default CourseUpload;
