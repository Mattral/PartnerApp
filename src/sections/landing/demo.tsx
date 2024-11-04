"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardDomain2() {
  const [sites, setSites] = useState([
    { title: "Alpha" },
    { title: "Beta" },
    { title: "Theta" },
    { title: "Gamma" },
  ]);

  // Updated formData to match the required fields
  const [formData, setFormData] = useState({
    mc_name: "",
    mc_email: "",
    mc_phone: "",
    mc_logo: null, // for file upload
    fc_data: "",
    s_code: "",
    dom_codes: [],
    s_codes: [],
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mc_logo") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // handling file input
    } else if (name === "dom_codes" || name === "s_codes") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((code) => code.trim()), // convert comma-separated strings to arrays
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    // Validations for required fields
    if (!formData.mc_name.trim() || !formData.mc_email.trim() || !formData.mc_phone.trim() || !formData.fc_data.trim() || !formData.s_code.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    // Example: saving formData or submitting it
    console.log(formData);
    
    setSites((prev) => [...prev, { title: formData.mc_name }]);
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
          <p className="text-gray-600">Manage all your sites in one place (NO-API)</p>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-bold mb-4">Create New Site</h3>

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
                type="text"
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
              <label htmlFor="s_code" className="block text-sm font-medium text-gray-700">State of Origin</label>
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
              <label htmlFor="dom_codes" className="block text-sm font-medium text-gray-700">Domains of Activity (comma separated)</label>
              <input
                type="text"
                id="dom_codes"
                name="dom_codes"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                value={formData.dom_codes.join(", ")}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="s_codes" className="block text-sm font-medium text-gray-700">States of Activity (comma separated)</label>
              <input
                type="text"
                id="s_codes"
                name="s_codes"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                value={formData.s_codes.join(", ")}
                onChange={handleChange}
              />
            </div>

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

const SiteCard = ({ title }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/sites/" + encodeURIComponent(title))}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
    >
      <div className="bg-blue-500 h-32"></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};
