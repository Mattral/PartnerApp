"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the type for a Site object
interface Site {
  title: string;
  logo: string;
  onlineStatus: boolean;
}

export default function DashboardDomain3() {
  const [sites, setSites] = useState<Site[]>([]);
  const [formData, setFormData] = useState({
    mc_name: "",
    mc_email: "",
    mc_phone: "",
    mc_logo: null,
    fc_data: "",
    s_code: "",
    dom_codes: [] as string[],
    s_codes: [] as string[],
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedSites = localStorage.getItem('sites');
    if (storedSites) {
      setSites(JSON.parse(storedSites));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mc_logo") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!formData.mc_name.trim()) {
      alert("Please enter a company name");
      return;
    }

    const newSite = { 
      title: formData.mc_name, 
      logo: formData.mc_logo ? URL.createObjectURL(formData.mc_logo) : '/default.png', 
      onlineStatus: false 
    };
    const updatedSites = [...sites, newSite];

    // Save to local storage
    localStorage.setItem('sites', JSON.stringify(updatedSites));

    // Update state
    setSites(updatedSites);

    setFormData({
      mc_name: "",
      mc_email: "",
      mc_phone: "",
      mc_logo: null,
      fc_data: "",
      s_code: "",
      dom_codes: [],
      s_codes: [],
    });

    setShowModal(false);
  };

  return (
    <>
      <section className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-semibold">Sites</h2>
          <p className="text-gray-600">Manage all your sites in one place (idealVer)</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Site
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {sites.map((item, index) => (
          <SiteCard key={index} {...item} />
        ))}
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-bold mb-4">Create New Site</h3>
            <form>
              {/* Input fields for company data */}
              <div className="mb-4">
                <label htmlFor="mc_name" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  id="mc_name"
                  name="mc_name"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.mc_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mc_email" className="block text-sm font-medium text-gray-700">Company Email</label>
                <input
                  type="email"
                  id="mc_email"
                  name="mc_email"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.mc_email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mc_phone" className="block text-sm font-medium text-gray-700">Company Phone</label>
                <input
                  type="tel"
                  id="mc_phone"
                  name="mc_phone"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.mc_phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mc_logo" className="block text-sm font-medium text-gray-700">Company Logo</label>
                <input
                  type="file"
                  id="mc_logo"
                  name="mc_logo"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fc_data" className="block text-sm font-medium text-gray-700">Company Default Design Content</label>
                <input
                  type="text"
                  id="fc_data"
                  name="fc_data"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.fc_data}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="s_code" className="block text-sm font-medium text-gray-700">Company State of Origin</label>
                <input
                  type="text"
                  id="s_code"
                  name="s_code"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.s_code}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dom_codes" className="block text-sm font-medium text-gray-700">Company Domains of Activity</label>
                <input
                  type="text"
                  id="dom_codes"
                  name="dom_codes"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.dom_codes.join(", ")}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    dom_codes: e.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter((code) => code.length > 0), // Prevent empty values
                  }))}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="s_codes" className="block text-sm font-medium text-gray-700">Company States of Activity</label>
                <input
                  type="text"
                  id="s_codes"
                  name="s_codes"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.s_codes.join(", ")}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    s_codes: e.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter((code) => code.length > 0), // Prevent empty values
                  }))}
                />
              </div>
              </form>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const SiteCard = ({ title, logo, onlineStatus }) => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(onlineStatus);

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform">
      {/* Display logo */}
      <div className="h-32 flex items-center justify-center bg-gray-200">
        <img src={logo || "/default.png"} alt={title} className="h-full object-contain" />
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Bottom buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-gray-100">
        <button
          onClick={() => router.push("/sites/edit/" + title)}
          className="text-blue-600 font-semibold hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={handleToggle}
          className={`font-semibold ${isOnline ? "text-green-600" : "text-gray-400"} hover:text-gray-800`}
        >
          {isOnline ? "Online" : "Offline"}
        </button>
      </div>
    </div>
  );
};