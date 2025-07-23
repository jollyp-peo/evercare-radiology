const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 pt-10 px-6 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Explore */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b border-gray-700 pb-1">
            Explore
          </h4>
          <ul className="space-y-2">
            <li><a href="/atlas" className="hover:underline">Anatomy Atlas</a></li>
            <li><a href="/cases" className="hover:underline">Clinical Cases</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="/ebooks" className="hover:underline">eBooks</a></li>
            <li><a href="#" className="hover:underline">DICOM Viewer</a></li>
          </ul>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b border-gray-700 pb-1">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b border-gray-700 pb-1">
            About EverCare Radiology 
          </h4>
          <p className="text-sm leading-relaxed">
            RadiologyEdu is a free educational platform offering anatomy atlases,
            clinical cases, lecture videos, and DICOM viewing tools for medical students,
            radiologists, and healthcare professionals.
          </p>
        </div>
      </div>

      <div className="text-center text-sm mt-8 text-gray-500">
        &copy; {new Date().getFullYear()} Evercare Radiology | Built for medical learning and growth.
      </div>
    </footer>
  );
};

export default Footer;
