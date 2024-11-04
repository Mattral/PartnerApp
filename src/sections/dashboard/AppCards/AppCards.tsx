// components/DashboardDomain.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function DashboardDomain() {
  const [sites, setSites] = useState([
    { title: "Site XYZ" },
    { title: "Site Example" },
    { title: "Site ABC" },
    { title: "Demo" },
  ]);

  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyLogo: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSites((prev) => [...prev, { title: formData.companyName }]);
    setFormData({
      companyName: "",
      companyAddress: "",
      companyLogo: "",
    });
    setShowModal(false);
  };

  return (
    <>
      <section className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-semibold">Sites</h2>
          <p className="text-gray-600">Manage all your sites in one place</p>
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
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create New Site</h3>
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="companyAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Company Address
              </label>
              <input
                type="text"
                id="companyAddress"
                name="companyAddress"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                value={formData.companyAddress}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="companyLogo"
                className="block text-sm font-medium text-gray-700"
              >
                Company Logo
              </label>
              <input
                type="file"
                id="companyLogo"
                name="companyLogo"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
      onClick={() => router.push("/sites/" + title)}
      className="cursor-pointer bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
    >
      <div className="bg-blue-500 h-32"></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};
