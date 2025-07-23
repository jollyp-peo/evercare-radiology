import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaYoutube, FaVimeoV, FaVideo, FaLink, FaGoogle } from "react-icons/fa";


dayjs.extend(relativeTime);

export default function CourseCard({ course }) {
	const videoRef = useRef(null);
	const { ref, inView } = useInView({ triggerOnce: true });

	const getPlatformIcon = (url) => {
		if (!url) return <FaLink className="inline mr-1" />;

		const lowerUrl = url.toLowerCase();
		if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
			return <FaYoutube className="inline mr-1 text-red-600" />;
		}
		if (lowerUrl.includes("vimeo.com")) {
			return <FaVimeoV className="inline mr-1 text-blue-500" />;
		}
		if (lowerUrl.includes("zoom.us")) {
			return <FaVideo className="inline mr-1 text-blue-600" />;
		}
		if (lowerUrl.includes("meet.google.com")) {
			return <FaGoogle className="inline mr-1 text-green-600" />;
		}
		if (lowerUrl.includes("drive.google.com")) {
			return <FaGoogle className="inline mr-1 text-green-600" />;
		}
		if (lowerUrl.includes("dropbox.com")) {
			return <FaLink className="inline mr-1 text-blue-700" />;
		}
		if (lowerUrl.includes("onedrive.live.com")) {
			return <FaLink className="inline mr-1 text-blue-600" />;
		}

		return <FaLink className="inline mr-1 text-gray-600" />;
	};

	return (
		<div ref={ref} className="bg-white shadow p-4 rounded hover:shadow-lg">
			{/* Video Preview */}
			{course.video_url && inView && (
				<video
					ref={videoRef}
					src={course.video_url}
					controls
					className="w-full mt-3 rounded"
					preload="none"
				/>
			)}

			<h3 className="text-lg font-semibold mt-2">{course.title}</h3>
			<p className="text-sm text-gray-500">
				{dayjs(course.created_at).fromNow()}
			</p>

			{/* Links */}
			{course.recorded_link && (
				<a
					href={course.recorded_link}
					target="_blank"
					rel="noopener noreferrer"
					className="block mt-3 text-purple-600 underline"
				>
					{getPlatformIcon(course.recorded_link)} Watch Recorded Lecture
				</a>
			)}

			{(course.material_url?.endsWith(".ppt") ||
				course.material_url?.endsWith(".pptx")) && (
				<a
					href={course.material_url}
					target="_blank"
					rel="noopener noreferrer"
					className="block mt-3 text-green-600 underline"
				>
					{getPlatformIcon(course.material_url)} View Presentation
				</a>
			)}
		</div>
	);
}
