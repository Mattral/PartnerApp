"use client";
// components/DashboardDomain.js
import { useState } from "react";
import axios from "axios"; // Import axios for API integration
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
    mc_logo: null,
    fc_data: "",
    s_code: "",
    dom_codes: [] as string[],
    s_codes: [] as string[],
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state

  const handleChange = (e) => {
    // @ts-ignore
    const { name, value, files, type, multiple } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const {
      mc_name,
      mc_email,
      mc_phone,
      // @ts-ignore
      mc_logo,
      fc_data,
      s_code,
      dom_codes,
      s_codes,
    } = formData;

    if (!mc_name.trim() || !mc_email.trim() || !mc_phone.trim() || !fc_data.trim() || !s_code.trim()) {
      alert("Please fill out all required fields");
      return;
    }

    const formDataForApi = new FormData();
    formDataForApi.append("mc_name", mc_name);
    formDataForApi.append("mc_email", mc_email);
    formDataForApi.append("mc_phone", mc_phone);
    //formDataForApi.append("mc_logo", mc_logo);
    formDataForApi.append("fc_data", fc_data);
    formDataForApi.append("s_code", s_code);
    formDataForApi.append("dom_codes", JSON.stringify(dom_codes));
    formDataForApi.append("s_codes", JSON.stringify(s_codes));

    try {
      setLoading(true);

      // Example axios call
      await axios.post(
        "https://lawonearth.co.uk/api/back-office/core/apps/create", // Replace with actual API URL
        formDataForApi,
        {
          headers: {
            "Authorization": "Bearer your-token", // Replace with actual token
            "COMPANY-CODE": "MC-H3HBRZU6ZK5744S", 
            "FRONTEND-KEY": "XXX", 
            "X-Requested-With": "XMLHttpRequest", // Required to identify Ajax requests
            "Content-Type": "multipart/form-data", // Required to send files properly
          },
        }
      );

      // On success, add the new site
      setSites((prev) => [...prev, { title: mc_name }]);
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
    } catch (error) {
      console.error("Error saving the site:", error);
      alert("Failed to save the site.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-between items-center py-4">
        <div>
          <h2 className="text-2xl font-semibold">Sites</h2>
          <p className="text-gray-600">Manage all your sites in one place (API)</p>
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
            <form>
              <div className="mb-4">
                <label
                  htmlFor="mc_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
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
                <label
                  htmlFor="mc_email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Email
                </label>
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
                <label
                  htmlFor="mc_phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Phone
                </label>
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
                <label
                  htmlFor="mc_logo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Logo
                </label>
                <input
                  type="file"
                  id="mc_logo"
                  name="mc_logo"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fc_data"
                  className="block text-sm font-medium text-gray-700"
                >
                  Default Design Content
                </label>
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
                <label
                  htmlFor="s_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  State of Origin
                </label>
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
                <label
                  htmlFor="dom_codes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Domains of Activity (comma separated)
                </label>
                <input
                  type="text"
                  id="dom_codes"
                  name="dom_codes"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.dom_codes.join(", ")}
                  onChange={(e) => handleChange({ target: { name: "dom_codes", value: e.target.value.split(", ").map(v => v.trim()) } })}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="s_codes"
                  className="block text-sm font-medium text-gray-700"
                >
                  States of Activity (comma separated)
                </label>
                <input
                  type="text"
                  id="s_codes"
                  name="s_codes"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.s_codes.join(", ")}
                  onChange={(e) => handleChange({ target: { name: "s_codes", value: e.target.value.split(", ").map(v => v.trim()) } })}
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
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
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


/*

"use client";
import { useState } from "react";
import axios from "axios"; // Import axios for API integration
import { useRouter } from "next/navigation";

// Dummy state for company design and states of origin
const designOptions = ["Design 1", "Design 2"];
const stateOfOriginOptions = ["New South Wales (NSW)", "Sydney", "Melbourne", "Brisbane"];
const domainOptions = ["Legal", "Finance", "Logistics"];
const statesOfActivityOptions = ["New South Wales (NSW)", "Sydney", "Melbourne", "Brisbane"];

export default function DashboardDomain2() {
  const [sites, setSites] = useState([
    { title: "Alpha" },
    { title: "Beta" },
    { title: "Theta" },
    { title: "Gamma" },
  ]);

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
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target; // can add multiple
  
    if (type === "file") {
      // Narrow down the type to HTMLInputElement and ensure files is defined
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else if (type === "select-multiple") {
      const options = Array.from((e.target as HTMLSelectElement).selectedOptions, (option: HTMLOptionElement) => option.value);
      setFormData((prev) => ({ ...prev, [name]: options }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };  
  

  const handleSave = async () => {
    const {
      mc_name,
      mc_email,
      mc_phone,
      mc_logo,
      fc_data,
      s_code,
      dom_codes,
      s_codes,
    } = formData;

    if (!mc_name.trim() || !mc_email.trim() || !mc_phone.trim() || !fc_data.trim() || !s_code.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formDataForApi = new FormData();
    formDataForApi.append("mc_name", mc_name);
    formDataForApi.append("mc_email", mc_email);
    formDataForApi.append("mc_phone", mc_phone);
    if (mc_logo) {
      formDataForApi.append("mc_logo", mc_logo); // Upload logo file if present
    }
    formDataForApi.append("fc_data", fc_data);
    formDataForApi.append("s_code", s_code);
    formDataForApi.append("dom_codes", JSON.stringify(dom_codes));
    formDataForApi.append("s_codes", JSON.stringify(s_codes));

    try {
      setLoading(true);

      // API call using axios
      await axios.post(
        "https://lawonearth.co.uk/api/back-office/core/apps/create", // Replace with actual API URL
        formDataForApi,
        {
          headers: {
            "Authorization": "", // Bearer 218|YpiLMIZ7Zb8EoCkVLmEq5mQkGmHRZ3w0BvzwaWIbf7dc62f1
            "COMPANY-CODE": "def-mc-admin",

            "FRONTEND-KEY": "XXX",
            "X-Requested-With": "XMLHttpRequest", // Identify Ajax request
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      // On success, add new site to the list and reset form
      setSites((prev) => [...prev, { title: mc_name }]);
      resetForm();
    } catch (error) {
      console.error("Error saving the site:", error);
      alert("Failed to save the site.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
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
          <p className="text-gray-600">Manage all your sites in one place (API)</p>
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
              <div className="mb-4">
                <label htmlFor="mc_name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
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
                <label htmlFor="mc_email" className="block text-sm font-medium text-gray-700">
                  Company Email
                </label>
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
                <label htmlFor="mc_phone" className="block text-sm font-medium text-gray-700">
                  Company Phone
                </label>
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
                <label htmlFor="mc_logo" className="block text-sm font-medium text-gray-700">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="mc_logo"
                  name="mc_logo"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fc_data" className="block text-sm font-medium text-gray-700">
                  Default Design Content
                </label>
                <select
                  id="fc_data"
                  name="fc_data"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.fc_data}
                  onChange={handleChange}
                >
                  {designOptions.map((design) => (
                    <option key={design} value={design}>
                      {design}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="s_code" className="block text-sm font-medium text-gray-700">
                  State of Origin
                </label>
                <select
                  id="s_code"
                  name="s_code"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.s_code}
                  onChange={handleChange}
                >
                  {stateOfOriginOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="dom_codes" className="block text-sm font-medium text-gray-700">
                  Domains of Activity
                </label>
                <select
                  id="dom_codes"
                  name="dom_codes"
                  multiple
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.dom_codes}
                  onChange={handleChange}
                >
                  {domainOptions.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="s_codes" className="block text-sm font-medium text-gray-700">
                  States of Activity
                </label>
                <select
                  id="s_codes"
                  name="s_codes"
                  multiple
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={formData.s_codes}
                  onChange={handleChange}
                >
                  {statesOfActivityOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
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
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
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


*/